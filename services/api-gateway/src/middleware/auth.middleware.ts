import { FastifyRequest, FastifyReply } from "fastify";
import { authGrpcClient } from "../grpc/auth-client.js";

export async function Authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        const token =
            request.cookies?.accessToken ??
            request.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            return reply.status(401).send({
                error: "Unauthorized: No token provided"
            });
        }
        const result = await authGrpcClient.validateToken(token);
        if (!result.valid) {
            return reply.status(401).send({
                error: result.error || "Unauthorized: Invalid or expired token"
            });
        }
        request.user = {
            id: result.userId,
            role: result.roles?.[0] || "user",
            sessionId: result.sessionId,
        };

    } catch (err: any) {
        console.error("[Auth Middleware] gRPC Error:", err);
        return reply.status(401).send({
            error: "Unauthorized: Authentication service unavailable"
        });
    }
}