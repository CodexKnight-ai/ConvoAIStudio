import { PrismaClient } from "../../generated/prisma/client.js";
export async function findUserByEmail(
    prisma: PrismaClient,
    email: string
) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new Error("User not found");
    }
    return user

 }

export async function findUserById(
    prisma: PrismaClient,
    userId: string
) { 
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
        throw new Error("User not found");
    }
    return user
}

export async function createUser(
    prisma: PrismaClient,
    data: {
        firstName: string;
        lastName?: string;
        email: string;
        username: string;
        passwordHash: string;
    }
) { 
    const user = await prisma.user.create({ data })
    return user   
}

export async function createSession(
    prisma: PrismaClient,
    data: {
        userId: string;
        refreshTokenHash: string;
        expiresAt: Date;
    }
) { 
    const session = await prisma.session.create({ data })
    return session   
}

export async function findSessionById(
    prisma: PrismaClient,
    sessionId: string
) { 
    const session = await prisma.session.findUnique({ where: { sessionId: sessionId } })
    if (!session) {
        throw new Error("Session not found");
    }
    return session
}

export async function updateSessionRefreshToken(
    prisma: PrismaClient,
    sessionId: string,
    refreshTokenHash: string
) { 
    const session = await prisma.session.update({ where: { sessionId }, data: { 
        refreshTokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
     } })
    return session   
}

export async function revokeSession(
    prisma: PrismaClient,
    sessionId: string
) { 
    const session = await prisma.session.delete({ where: { sessionId } })
    return session   
}

export async function revokeAllUserSessions(
    prisma: PrismaClient,
    userId: string
) {
    const sessions = await prisma.session.deleteMany({ where: { userId } })
    return sessions   
 }  