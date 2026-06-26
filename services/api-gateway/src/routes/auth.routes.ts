import { FastifyInstance } from "fastify";
import { authGrpcClient } from "../grpc/auth-client.js";
import { Authenticate } from "../middleware/auth.middleware.js";

// const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:4001";

const COOKIE_OPTS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
};

export async function authRoutes(app: FastifyInstance) {

    // ──────────────────────────────────────────────────────────────
    // 1. REGISTER
    // ──────────────────────────────────────────────────────────────
    app.post("/register", async (request, reply) => {
        try {
            // console.log("auth-route-body:", JSON.stringify(request.body, null, 2));
            console.log("Content-Type:", request.headers['content-type']);
            let body = request.body as any;
            if (typeof body === 'string') {
                try {
                    body = JSON.parse(body);
                } catch (err) {
                    // ignore and let validation catch it
                }
            }

            // Validate required fields
            console.log("body:", body);
            if (!body?.firstName || !body?.email || !body?.username || !body?.password) {
                return reply.status(400).send({ error: "[1]Missing required fields: firstName, email, username, and password are required" });
            }

            const result = await authGrpcClient.register(body);
            console.log("gateway register grpc result:", JSON.stringify(result, null, 2));

            if (result.error) {
                return reply.status(400).send({ error: result.error });
            }
            if (result.accessToken) {
                reply.setCookie("accessToken", result.accessToken, { ...COOKIE_OPTS, maxAge: 15 * 60 }); // 15 mins
            }
            if (result.refreshToken) {
                reply.setCookie("refreshToken", result.refreshToken, { ...COOKIE_OPTS, maxAge: 7 * 24 * 60 * 60 }); // 7 days
            }
            if (result.sessionId) {
                reply.setCookie("sessionId", result.sessionId, COOKIE_OPTS);
            }
            return reply.status(201).send({
                userId: result.userId,
                username: result.username,
                email: result.email,
                role: result.role,
                firstName: result.firstName,
                lastName: result.lastName,
                accessTokenExpiresAt: result.accessTokenExpiresAt,
                refreshTokenExpiresAt: result.refreshTokenExpiresAt,
            });
        } catch (err: any) {
            request.log.error(err, "gRPC Registration Error");
            return reply.status(500).send({ error: err.details || err.message || "Registration failed" });
        }
    });

    // ──────────────────────────────────────────────────────────────
    // 2. LOGIN
    // ──────────────────────────────────────────────────────────────
    app.post("/login", async (request, reply) => {
        try {
            let body = request.body as any;
            if (typeof body === 'string') {
                try {
                    body = JSON.parse(body);
                } catch (err) {
                    // ignore
                }
            }
            const result = await authGrpcClient.login(body);
            console.log("auth-route-body:",result);
            if (result.error) {
                return reply.status(401).send({ error: result.error });
            }
            if (result.accessToken) {
                reply.setCookie("accessToken", result.accessToken, { ...COOKIE_OPTS, maxAge: 15 * 60 });
            }
            if (result.refreshToken) {
                reply.setCookie("refreshToken", result.refreshToken, { ...COOKIE_OPTS, maxAge: 7 * 24 * 60 * 60 });
            }
            if (result.sessionId) {
                reply.setCookie("sessionId", result.sessionId, COOKIE_OPTS);
            }

            return reply.status(200).send({
                userId: result.userId,
                username: result.username,
                email: result.email,
                role: result.role,
                firstName: result.firstName,
                lastName: result.lastName,
                accessTokenExpiresAt: result.accessTokenExpiresAt,
                refreshTokenExpiresAt: result.refreshTokenExpiresAt,
            });
        } catch (err: any) {
            request.log.error(err, "gRPC Login Error");
            return reply.status(401).send({ error: err.details || err.message || "Login failed" });
        }
    });

    // ──────────────────────────────────────────────────────────────
    // 3. REFRESH TOKEN
    // ──────────────────────────────────────────────────────────────
    app.post("/refresh", async (request, reply) => {
        try {
            const refreshToken = request.cookies.refreshToken;
            const sessionId = request.cookies.sessionId;

            if (!refreshToken || !sessionId) {
                return reply.status(401).send({ error: "Missing required session or refresh cookies" });
            }

            const result = await authGrpcClient.refresh({
                refresh_token: refreshToken,
                session_id: sessionId
            });

            if (result.error) {
                return reply.status(401).send({ error: result.error });
            }
            if (result.accessToken) {
                reply.setCookie("accessToken", result.accessToken, { ...COOKIE_OPTS, maxAge: 15 * 60 });
            }
            if (result.refreshToken) {
                reply.setCookie("refreshToken", result.refreshToken, { ...COOKIE_OPTS, maxAge: 7 * 24 * 60 * 60 });
            }
            return reply.status(200).send({
                accessTokenExpiresAt: result.accessTokenExpiresAt,
                refreshTokenExpiresAt: result.refreshTokenExpiresAt,
            });
        } catch (err: any) {
            request.log.error(err, "gRPC Token Refresh Error");
            return reply.status(401).send({ error: err.details || err.message || "Token refresh failed" });
        }
    });

    // ──────────────────────────────────────────────────────────────
    // 4. LOGOUT
    // ──────────────────────────────────────────────────────────────
    app.post("/logout", async (request, reply) => {
        try {
            const sessionId = request.cookies.sessionId;
            const refreshToken = request.cookies.refreshToken;
            console.log("logout cookies:", request.cookies);

            if (sessionId && refreshToken) {
                await authGrpcClient.logout(sessionId, refreshToken);
            }
            reply.clearCookie("accessToken", COOKIE_OPTS);
            reply.clearCookie("refreshToken", COOKIE_OPTS);
            reply.clearCookie("sessionId", COOKIE_OPTS);
            return reply.status(200).send({ message: "Successfully logged out" });
        } catch (err: any) {
            request.log.error(err, "gRPC Logout Error");
            return reply.status(500).send({ error: err.details || err.message || "Logout failed" });
        }
    });

    // ──────────────────────────────────────────────────────────────
    // 5. GET CURRENT USER PROFILE (Protected)
    // ──────────────────────────────────────────────────────────────
    app.get("/me", { preHandler: Authenticate }, async (request, reply) => {
        try {
            const user = (request as any).user;

            if (!user || !user.id) {
                return reply.status(401).send({ error: "Unauthorized access profile context missing" });
            }

            const result = await authGrpcClient.getMe(user.id);
            return reply.status(200).send(result);
        } catch (err: any) {
            request.log.error(err, "gRPC Get Profile Error");
            return reply.status(500).send({ error: err.details || err.message || "Failed to fetch profile data" });
        }
    });
}