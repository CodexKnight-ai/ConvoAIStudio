import { FastifyInstance } from 'fastify';

export interface CreateUserInput {
    firstName: string;
    lastName?: string;
    email: string;
    username: string;
    passwordHash: string;
}

export class AuthRepository {
    private prisma;

    constructor(fastify: FastifyInstance) {
        this.prisma = fastify.prisma;
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }

    async create(data: CreateUserInput) {
        return this.prisma.user.create({ data });
    }
}