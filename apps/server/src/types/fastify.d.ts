import "@fastify/jwt";
import { AuthTokenPayload } from "./jwt";
import { PrismaClient } from "@prisma/client";
declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: AuthTokenPayload;
        user: AuthTokenPayload;
    }
}
declare module "fastify-prisma" {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}