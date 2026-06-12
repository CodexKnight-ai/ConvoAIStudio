import "@fastify/jwt";
import { AuthTokenPayload } from "./jwt";
import { PrismaClient } from "../generated/prisma/client.js";
declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: AuthTokenPayload;
        user: AuthTokenPayload;
    }
}
declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}