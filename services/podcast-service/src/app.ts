import Fastify from "fastify";
import corsPlugin from "@fastify/cors";
import cookiePlugin from "@fastify/cookie";
import fastifyRedis from "@fastify/redis";

import jwtPlugin from "./plugins/jwt.js";
import prismaPlugin from "./plugins/prisma.js";

import { Authenticate } from "./middlewares/authenticate.js";
import { ChannelOwner } from "./middlewares/channel-owner.js";

import { channelRoutes } from "./channel/channel.routes.js";
import { podcastRoutes } from "./podcasts/podcast.routes.js";

export async function buildApp() {
    const app = Fastify({ logger: true });

    app.register(corsPlugin, {
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });

    await app.register(fastifyRedis, {
        url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || '6379'}/${process.env.REDIS_DB || '1'}`,
    });

    app.register(jwtPlugin);
    app.register(cookiePlugin);
    app.register(prismaPlugin);

    app.decorate("authenticate", Authenticate);
    app.decorate("channelowner", ChannelOwner);

    app.register(channelRoutes, {
        prefix: "/api/v1/channels",
    });

    app.register(podcastRoutes, {
        prefix: "/api/v1/podcasts",
    });

    app.get("/health", async () => {
        return {
            status: "ok",
            service: "podcast-service"
        };
    });

    return app;
}
