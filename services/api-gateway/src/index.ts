import Fastify from "fastify";
import cors from "@fastify/cors";
import replyFrom from "@fastify/reply-from";
import rateLimit from "@fastify/rate-limit";
import helmet from "@fastify/helmet";
import cookie from "@fastify/cookie";
import * as dotenv from "dotenv";
import { Authenticate } from "./middleware/auth.middleware.js";
import { authRoutes } from "./routes/auth.routes.js";

dotenv.config();

const app = Fastify({
    logger: {
        level: process.env.LOG_LEVEL || "info",
        transport: { target: "pino-pretty" }
    },
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:4001";
const PODCAST_SERVICE_URL = process.env.PODCAST_SERVICE_URL || "http://localhost:4002";
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || "http://localhost:3000").split(",").map((origin) => origin.trim());

/** Standard cookie options for auth tokens */
const COOKIE_OPTS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
};

async function bootstrap() {
    // Add default JSON content type parser
    app.addContentTypeParser('application/json', { parseAs: 'string' }, function (request, body, done) {
        try {
            const bodyStr = typeof body === 'string' ? body : body.toString();
            const parsed = JSON.parse(bodyStr);
            done(null, parsed);
        } catch (err: any) {
            err.statusCode = 400;
            done(err, undefined);
        }
    });

    // Add text/plain content type parser
    app.addContentTypeParser('text/plain', { parseAs: 'string' }, function (request, body, done) {
        const bodyStr = typeof body === 'string' ? body : body.toString();
        done(null, bodyStr);
    });

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
    await app.register(cookie);
    await app.register(replyFrom);

    app.addHook("onRequest", async (request, reply) => {
        request.log.info({ path: request.url, method: request.method }, "Intercepted gateway traffic");
    });

    // ──────────────────────────────────────────────
    // Auth Routes — gRPC to auth-service
    // ──────────────────────────────────────────────

    await app.register(authRoutes, { prefix: "/api/v1/auth" });

    // ──────────────────────────────────────────────
    // Protected Routes — Podcast/Channel via Authenticate middleware
    // ──────────────────────────────────────────────
    app.all("/api/v1/channels/*", { preHandler: Authenticate }, (request, reply) => {
        const targetUrl = `${PODCAST_SERVICE_URL}${request.url}`;
        return reply.from(targetUrl);
    });

    app.all("/api/v1/podcasts/*", { preHandler: Authenticate }, (request, reply) => {
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