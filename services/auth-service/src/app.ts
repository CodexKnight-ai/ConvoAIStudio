import Fastify from "fastify";
import corsPlugin from "@fastify/cors";
import cookiePlugin from "@fastify/cookie";
import fastifyRedis from "@fastify/redis";

import jwtPlugin from "./plugins/jwt.js";
import prismaPlugin from "./plugins/prisma.js";

import { Authenticate } from "./middlewares/authenticate.js";

import { authRoutes } from "./auth/auth.route.js";

export async function buildApp() {
    const app = Fastify({ logger: true });
    app.register(corsPlugin, {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });
    await app.register(fastifyRedis, {
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB || '0'}`,
    });
    app.register(jwtPlugin);
    app.register(cookiePlugin);
    app.register(prismaPlugin);
    app.decorate("authenticate", Authenticate);
    app.register(authRoutes, {
        prefix: "/api/v1/auth",
    });
    app.get("/health", async () => {
        return {
            status: "ok",
            service: "auth-service"
        };
    });

    return app;
}