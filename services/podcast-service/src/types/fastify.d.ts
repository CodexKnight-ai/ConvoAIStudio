import "@fastify/jwt";
import "@fastify/cookie";
import type { PrismaClient } from "../generated/prisma/client.js";
import type { FastifyRequest, FastifyReply } from "fastify";

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            id: string;
            userId: string;
            role: string;
        };
    }
}

declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient;
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
        channelowner: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}
