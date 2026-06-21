import "@fastify/jwt";
import { PrismaClient } from "../generated/prisma/client.js";

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            id: string;
            email: string;
            role: string;
        };
    }
}

declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient;
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}
