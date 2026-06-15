import "@fastify/jwt";
import { AuthTokenPayload } from "./jwt";
import { PrismaClient } from "../generated/prisma/client.js";
import { FastifyRequest, FastifyReply } from "fastify";
declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: AuthTokenPayload;
        user: AuthTokenPayload;
    }
}
declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient;
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
        channelowner: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}