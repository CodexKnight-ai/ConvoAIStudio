import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID, createHash } from 'crypto';
import { AuthRepository } from './auth.repository.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from './jwt.js';
import { createRedisSession, deleteRedisSession, getRedisSession, updateRefreshTokenHash, extendSessionTTL } from './session.js';
import { hashPassword, verifyPassword } from './password.js';

export async function register(
    fastify: FastifyInstance,
    reply: FastifyReply,
    repo: AuthRepository,
    data: {
        firstName: string;
        lastName?: string;
        email: string;
        username: string;
        password: string;
    }
) {
    const existing = await repo.findByEmail(data.email);
    if (existing) {
        throw new Error('User already exists', { cause: 409 });
    }

    const passwordHash = await hashPassword(data.password);
    const user = await repo.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        passwordHash,
    });

    const sessionId = randomUUID();
    const { refreshToken, refreshTokenHash, expiresAt: refreshTokenExpiresAt } = generateRefreshToken(fastify);

    await createRedisSession(fastify, { userId: user.id, sessionId, role: user.role, refreshTokenHash });

    const { token: accessToken, expiresAt: accessTokenExpiresAt } = generateAccessToken(fastify, {
        userId: user.id,
        sessionId,
        role: user.role,
    });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
    };

    reply.setCookie('refreshToken', refreshToken, cookieOptions);
    reply.setCookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 });
    reply.setCookie('sessionId', sessionId, cookieOptions);
    reply.code(201);

    return {
        user: { id: user.id, username: user.username, email: user.email, role: user.role },
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
    };
}

export async function login(
    fastify: FastifyInstance,
    reply: FastifyReply,
    repo: AuthRepository,
    data: { email: string; password: string }
) {
    const user = await repo.findByEmail(data.email);
    if (!user) {
        throw new Error('User not found', { cause: 404 });
    }

    const isValid = await verifyPassword(data.password, user.passwordHash);
    if (!isValid) {
        throw new Error('Invalid password', { cause: 401 });
    }

    const sessionId = randomUUID();
    const { refreshToken, refreshTokenHash, expiresAt: refreshTokenExpiresAt } = generateRefreshToken(fastify);

    await createRedisSession(fastify, { userId: user.id, sessionId, role: user.role, refreshTokenHash });

    const { token: accessToken, expiresAt: accessTokenExpiresAt } = generateAccessToken(fastify, {
        userId: user.id,
        sessionId,
        role: user.role,
    });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
    };

    reply.setCookie('refreshToken', refreshToken, cookieOptions);
    reply.setCookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 });
    reply.setCookie('sessionId', sessionId, cookieOptions);
    reply.code(200);

    return {
        user: { id: user.id, username: user.username, email: user.email, role: user.role },
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
    };
}

export async function refresh(
    fastify: FastifyInstance,
    reply: FastifyReply,
    data: { refreshToken: string; sessionId: string }
) {
    const session = await getRedisSession(fastify, data.sessionId);

    if (!session) {
        reply.clearCookie('accessToken');
        reply.clearCookie('refreshToken');
        reply.clearCookie('sessionId');
        throw new Error('Session expired', { cause: 401 });
    }

    const isValid = verifyRefreshToken(fastify, data.refreshToken, session.refreshTokenHash);

    if (!isValid) {
        await deleteRedisSession(fastify, session.sessionId);
        reply.clearCookie('accessToken');
        reply.clearCookie('refreshToken');
        reply.clearCookie('sessionId');
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

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
    };

    reply.setCookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 });
    reply.setCookie('refreshToken', newRefreshToken, cookieOptions);
    reply.setCookie('sessionId', session.sessionId, cookieOptions);
    reply.code(200);

    return { accessTokenExpiresAt, refreshTokenExpiresAt };
}

export async function logout(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
    const refreshToken = request.cookies['refreshToken'];
    const sessionId = request.cookies['sessionId'];

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
    reply.clearCookie('refreshToken');
    reply.clearCookie('accessToken');
    reply.clearCookie('sessionId');
    reply.code(200);

    return { message: 'Logout successful' };
}

export async function getMe(reply: FastifyReply, repo: AuthRepository, userId: string) {
    const user = await repo.findById(userId);
    reply.code(200);
    return user;
}