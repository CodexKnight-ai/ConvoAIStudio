import Fastify from "fastify";
import redisPlugin from "./plugins/redis.js";
import jwtPlugin from "./plugins/jwt.js";
import cookiePlugin from "@fastify/cookie";
import prismaPlugin from "./plugins/prisma.js"
import corsPlugin from "@fastify/cors"
import { Authenticate } from "./middlewares/authenticate.js";
import { channelOwnerMiddleware } from "./middlewares/channel-owner.js";

import { authRoutes } from "./modules/auth/auth.route.js";
import { channelRoutes } from "./modules/channel/channel.routes.js";
import { podcastRoutes } from "./modules/podcasts/podcast.routes.js";

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
    app.register(prismaPlugin);
    app.decorate("authenticate", Authenticate);
    app.decorate("channelowner", channelOwnerMiddleware);

    app.register(authRoutes, {
        prefix: "/api/v1/auth",
    });

    app.register(channelRoutes, {
        prefix: "/api/v1/channels",
    });

    app.register(podcastRoutes, {
        prefix: "/api/v1/podcasts",
    });

    app.get("/health", async () => {
        return {
            status: "ok",
        };
    });

    return app;
}