import { PrismaClient } from "../../generated/prisma/client.js";

export async function findUserByEmail(
    prisma: PrismaClient,
    email: string
) {
    return prisma.user.findUnique({
        where: { email },
    });
}

export async function findUserById(
    prisma: PrismaClient,
    userId: string
) {
    return prisma.user.findUnique({
        where: { id: userId },
    });
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
    return prisma.user.create({
        data,
    });
}