import { FastifyInstance} from 'fastify';
import { randomUUID, createHash } from 'crypto';
import { AuthRepository } from './auth.repository.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from './jwt.js';
import { createRedisSession, deleteRedisSession, getRedisSession, updateRefreshTokenHash, extendSessionTTL } from './session.js';
import { hashPassword, verifyPassword } from './password.js';

export interface AuthResult {
    user: {
        id: string;
        username: string;
        email: string;
        role: string;
        firstName?: string;
        lastName?: string;
    };

    accessToken: string;
    refreshToken: string;
    sessionId: string;

    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
}

export async function register(
    fastify: FastifyInstance,
    repo: AuthRepository,
    data: {
        firstName: string;
        lastName?: string;
        email: string;
        username: string;
        password: string;
    }
): Promise<AuthResult> {
    // Validate required fields
    if (!data.email || !data.username || !data.password || !data.firstName) {
        throw new Error('Missing required fields: email, username, password, and firstName are required', { cause: 400 });
    }

    // Trim whitespace
    const email = data.email.trim();
    const username = data.username.trim();
    const firstName = data.firstName.trim();
    const lastName = data.lastName?.trim();

    if (!email || !username || !firstName) {
        throw new Error('Required fields cannot be empty or whitespace', { cause: 400 });
    }

    const existingByEmail = await repo.findByEmail(email);
    if (existingByEmail) {
        throw new Error('User with this email already exists', { cause: 409 });
    }
    
    const existingByUsername = await repo.findByUsername(username);
    if (existingByUsername) {
        throw new Error('Username already taken', { cause: 409 });
    }
    
    const passwordHash = await hashPassword(data.password);
    const user = await repo.create({
        firstName,
        lastName,
        email,
        username,
        passwordHash,
    });
    console.log("user", user);
    const sessionId = randomUUID();
    const { refreshToken, refreshTokenHash, expiresAt: refreshTokenExpiresAt } = generateRefreshToken(fastify);

    await createRedisSession(fastify, { userId: user.id, sessionId, role: user.role, refreshTokenHash });

    const { token: accessToken, expiresAt: accessTokenExpiresAt } = generateAccessToken(fastify, {
        userId: user.id,
        sessionId,
        role: user.role,
    });
    // console.log("access", accessToken, "refresh", refreshToken, "session", sessionId);
    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName||'',    
        },

        accessToken,
        refreshToken,
        sessionId,

        accessTokenExpiresAt,
        refreshTokenExpiresAt,
    };
}

export async function login(
    fastify: FastifyInstance,
    repo: AuthRepository,
    data: {
        email: string;
        password: string;
    }
): Promise<AuthResult> {
    const user = await repo.findByEmail(data.email);

    if (!user) {
        throw new Error('User not found');
    }

    const isValid = await verifyPassword(
        data.password,
        user.passwordHash
    );

    if (!isValid) {
        throw new Error('Invalid password');
    }

    const sessionId = randomUUID();

    const {
        refreshToken,
        refreshTokenHash,
        expiresAt: refreshTokenExpiresAt,
    } = generateRefreshToken(fastify);

    await createRedisSession(
        fastify,
        {
            userId: user.id,
            sessionId,
            role: user.role,
            refreshTokenHash,
        }
    );

    const {
        token: accessToken,
        expiresAt: accessTokenExpiresAt,
    } = generateAccessToken(
        fastify,
        {
            userId: user.id,
            sessionId,
            role: user.role,
        }
    );
    // console.log("access", accessToken, "refresh", refreshToken, "session", sessionId);
    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName || undefined,
        },

        accessToken,
        refreshToken,
        sessionId,

        accessTokenExpiresAt,
        refreshTokenExpiresAt,
    };
}
export interface RefreshResult {
    accessToken: string;
    refreshToken: string;
    sessionId: string;

    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
}
export async function refresh(
    fastify: FastifyInstance,
    data: { refreshToken: string; sessionId: string }
): Promise<RefreshResult> {
    const session = await getRedisSession(fastify, data.sessionId);

    if (!session) {
        throw new Error('Session expired', { cause: 401 });
    }

    const isValid = verifyRefreshToken(fastify, data.refreshToken, session.refreshTokenHash);

    if (!isValid) {
        await deleteRedisSession(fastify, session.sessionId);
        throw new Error('Refresh token reuse detected', { cause: 401 });
    }
    const { token: accessToken, expiresAt: accessTokenExpiresAt } = generateAccessToken(fastify, {
        userId: session.userId,
        sessionId: session.sessionId,
        role: session.role,
    });
    const { refreshToken: newRefreshToken, refreshTokenHash: newRefreshTokenHash, expiresAt: refreshTokenExpiresAt } = generateRefreshToken(fastify);
    await updateRefreshTokenHash(fastify, session.sessionId, newRefreshTokenHash);
    await extendSessionTTL(fastify, session.sessionId);

    return {
        accessToken,
        refreshToken: newRefreshToken,
        sessionId: session.sessionId,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
    };
}

export async function logout(fastify: FastifyInstance, data: { refreshToken: string; sessionId: string }) {
    const { refreshToken, sessionId } = data;
    if (!refreshToken) {
        throw new Error('No refresh token found', { cause: 401 });
    }
    if (!sessionId) {
        throw new Error('No session ID found in cookies', { cause: 401 });
    }

    const session = await getRedisSession(fastify, sessionId);
    if (!session) {
        throw new Error('No session found', { cause: 404 });
    }

    const refreshTokenHash = createHash('sha256').update(refreshToken).digest('hex');
    if (session.refreshTokenHash !== refreshTokenHash) {
        throw new Error('Invalid session refresh token', { cause: 401 });
    }

    await deleteRedisSession(fastify, sessionId);
    return { message: 'Logout successful' };
}

export async function getMe(
    repo: AuthRepository,
    userId: string
) {
    const user = await repo.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}