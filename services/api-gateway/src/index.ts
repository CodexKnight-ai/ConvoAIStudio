import Fastify from "fastify";
import cors from "@fastify/cors";
import replyFrom from "@fastify/reply-from";
import rateLimit from "@fastify/rate-limit";
import helmet from "@fastify/helmet";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({
    logger: {
        level: process.env.LOG_LEVEL || "info",
        transport: process.env.NODE_ENV !== "production" ? { target: "pino-pretty" } : undefined,
    },
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:4001";
const PODCAST_SERVICE_URL = process.env.PODCAST_SERVICE_URL || "http://localhost:4002";
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || "http://localhost:3000").split(",").map((origin) => origin.trim());

async function bootstrap() {
    await app.register(helmet, {
        global: true,
        contentSecurityPolicy: false
    });
    await app.register(cors, {
        origin: CLIENT_ORIGINS,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    });
    await app.register(rateLimit, {
        max: 100,
        timeWindow: "1 minute",
        keyGenerator: (request) => {
            return (request.headers["x-forwarded-for"] as string) || request.ip;
        },
    });
    await app.register(replyFrom);
    app.addHook("onRequest", async (request, reply) => {
        request.log.info({ path: request.url, method: request.method }, "Intercepted gateway traffic");
    });

    // Auth Service Boundary
    app.all("/api/v1/auth/*", (request, reply) => {
        const targetUrl = `${AUTH_SERVICE_URL}${request.url}`;
        return reply.from(targetUrl);
    });

    // Podcast Service Boundary
    app.all("/api/v1/channels/*", (request, reply) => {
        const targetUrl = `${PODCAST_SERVICE_URL}${request.url}`;
        return reply.from(targetUrl);
    });

    app.all("/api/v1/podcasts/*", (request, reply) => {
        const targetUrl = `${PODCAST_SERVICE_URL}${request.url}`;
        return reply.from(targetUrl);
    });

    app.get("/health", async () => {
        return { status: "OK", service: "API Gateway" };
    });
    app.setErrorHandler((error: any, request, reply) => {
        request.log.error(error);

        if (error.statusCode === 429) {
            return reply.status(429).send({
                error: "Too Many Requests",
                message: "Rate limit exceeded at the gateway level. Please back off.",
            });
        }

        return reply.status(500).send({
            error: "Internal Server Error",
            message: error.message
        });
    });

    try {
        await app.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`API Gateway active on central entry port: ${PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

bootstrap();