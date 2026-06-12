import Fastify from "fastify";
import redisPlugin from "./plugins/redis.js";
import jwtPlugin from "./plugins/jwt.js";
import cookiePlugin from "@fastify/cookie";
import prismaPlugin from "./plugins/prisma.js"
import corsPlugin from "@fastify/cors"

import { authRoutes } from "./modules/auth/auth.route.js";
export async function buildApp() {
    const app = Fastify({ logger: true });
    app.register(corsPlugin, {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });

    app.register(redisPlugin);
    app.register(jwtPlugin);
    app.register(cookiePlugin);
    app.register(prismaPlugin)

    app.register(authRoutes, {
        prefix: "/api/v1/auth",
    });

    app.get("/health", async () => {
        return {
            status: "ok",
        };
    });

    return app;
}