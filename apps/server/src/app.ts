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
        origin: "*",
    });

    app.register(redisPlugin);
    app.register(jwtPlugin);
    app.register(cookiePlugin);
    app.register(prismaPlugin)

    app.register(authRoutes, {
        prefix: "/auth",
    });

    app.get("/health", async () => {
        return {
            status: "ok",
        };
    });

    return app;
}