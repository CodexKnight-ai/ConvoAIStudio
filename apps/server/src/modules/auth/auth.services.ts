import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./jwt.js";
import { createRedisSession, deleteRedisSession, getRedisSession, updateRefreshTokenHash, extendSessionTTL } from "./session.js";
import { hashPassword, verifyPassword } from "./password.js";
import { createUser, findUserByEmail, findUserById } from "./auth.repository.js";
import { PrismaClient } from "../../generated/prisma/client.js";
import { randomUUID, createHash } from "crypto";

export async function refreshService(
    fastify: FastifyInstance,
    reply: FastifyReply,
    data: {
        refreshToken: string;
        sessionId: string;
    }
) {
    const session = await getRedisSession(
        fastify,
        data.sessionId
    );

    if (!session) {
        reply.clearCookie("accessToken");
        reply.clearCookie("refreshToken");
        reply.clearCookie("sessionId");
        throw new Error("Session expired");
    }
    const isValid = verifyRefreshToken(
        fastify,
        data.refreshToken,
        session.refreshTokenHash
    );

    if (!isValid) {
        await deleteRedisSession(
            fastify,
            session.sessionId
        );
        reply.clearCookie("accessToken");
        reply.clearCookie("refreshToken");
        reply.clearCookie("sessionId");
        throw new Error(
            "Refresh token reuse detected"
        );
    }

    // Generate new access token
    const {
        token: accessToken,
        expiresAt: accessTokenExpiresAt,
    } = generateAccessToken(fastify, {
        userId: session.userId,
        sessionId: session.sessionId,
        role: session.role,
    });

    // Generate new refresh token (rotation)
    const {
        refreshToken: newRefreshToken,
        refreshTokenHash: newRefreshTokenHash,
        expiresAt: refreshTokenExpiresAt,
    } = generateRefreshToken(fastify);

    // Store new refresh hash
    await updateRefreshTokenHash(
        fastify,
        session.sessionId,
        newRefreshTokenHash
    );

    // Sliding session
    await extendSessionTTL(
        fastify,
        session.sessionId
    );

    // Rotate access token cookie
    reply.setCookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60, // 15 min
    });

    // Rotate refresh token cookie
    reply.setCookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    });

    // Keep session cookie alive
    reply.setCookie("sessionId", session.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    });

    return {
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
    };
}
export async function registerService(fastify: FastifyInstance, reply: FastifyReply, prisma: PrismaClient, data: {
    firstName: string;
    lastName?: string;
    email: string;
    username: string;
    password: string;
}) {
    const existingUser = await findUserByEmail(prisma, data.email);
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(data.password)
    const user = await createUser(prisma, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        passwordHash: hashedPassword,
    });
    const sessionId = randomUUID();
    const { refreshToken, refreshTokenHash, expiresAt: refreshTokenExpiresAt } = generateRefreshToken(fastify);
    await createRedisSession(fastify, {
        userId: user.id,
        sessionId,
        role: user.role,
        refreshTokenHash,
    });
    reply.setCookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    const { token: accessToken, expiresAt: accessTokenExpiresAt } = generateAccessToken(fastify, {
        userId: user.id,
        sessionId,
        role: user.role,
    });
    reply.setCookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    });
    reply.setCookie("sessionId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    })
    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        accessToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
    };
}
export async function loginService(fastify: FastifyInstance, reply: FastifyReply, prisma: PrismaClient, data: {
    email: string;
    password: string;
}) {
    const existingUser = await findUserByEmail(prisma, data.email);
    if (!existingUser) {
        throw new Error("User not found");
    }
    const isPasswordValid = await verifyPassword(data.password, existingUser.passwordHash);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const sessionId = randomUUID();
    const { refreshToken, refreshTokenHash, expiresAt: refreshTokenExpiresAt } = generateRefreshToken(fastify);
    await createRedisSession(fastify, {
        userId: existingUser.id,
        sessionId,
        role: existingUser.role,
        refreshTokenHash,
    });
    reply.setCookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    const { token: accessToken, expiresAt: accessTokenExpiresAt } = generateAccessToken(fastify, {
        userId: existingUser.id,
        sessionId,
        role: existingUser.role,
    });
    reply.setCookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    });
    reply.setCookie("sessionId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    })
    return {
        user: {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
        },
        accessToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
    };
}

export async function logoutService(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
    const refreshToken = request.cookies["refreshToken"];
    if (!refreshToken) {
        throw new Error("No refresh token found");
    }
    const refreshTokenHash = createHash("sha256").update(refreshToken).digest("hex");
    const session = await getRedisSession(fastify, refreshTokenHash);
    if (!session) {
        throw new Error("No session found");
    }
    await deleteRedisSession(fastify, refreshTokenHash);
    reply.clearCookie("refreshToken");
    reply.clearCookie("accessToken");
    reply.clearCookie("sessionId");
    return {
        message: "Logout successful",
    };
}
export async function getUserById(fastify:FastifyInstance, reply:FastifyReply, prisma:PrismaClient, data:{
    userId:string
}){
    const user=await findUserById(prisma,data.userId);
    return user;
}