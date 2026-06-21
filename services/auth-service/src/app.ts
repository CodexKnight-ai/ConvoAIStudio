import Fastify from "fastify";
import corsPlugin from "@fastify/cors";
import cookiePlugin from "@fastify/cookie";

// Internal Plugin Decoupled Architecture
import redisPlugin from "./plugins/redis.js";
import jwtPlugin from "./plugins/jwt.js";
import prismaPlugin from "./plugins/prisma.js";

// Scoped Authentication Middleware Hook
import { Authenticate } from "./middlewares/authenticate.js";

// Microservice Route Modules
import { authRoutes } from "./auth/auth.route.js";

export async function buildApp() {
    const app = Fastify({ logger: true });

    // 1. Cross-Origin Resource Sharing Configuration
    app.register(corsPlugin, {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });

    // 2. Register Standalone Infrastructure Plugins
    app.register(redisPlugin);
    app.register(jwtPlugin);
    app.register(cookiePlugin);
    app.register(prismaPlugin);

    // 3. Decorate Server Instance with Authentication Handler
    app.decorate("authenticate", Authenticate);

    // 4. Register Scoped Authentication Routing Domain Only
    app.register(authRoutes, {
        prefix: "/api/v1/auth",
    });

    // 5. Gateway Health Endpoint Verification
    app.get("/health", async () => {
        return {
            status: "ok",
            service: "auth-service"
        };
    });

    return app;
}