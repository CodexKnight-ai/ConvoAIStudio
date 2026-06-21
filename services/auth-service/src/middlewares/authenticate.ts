import { FastifyRequest, FastifyReply } from "fastify";
import { verifyAccessToken } from "../auth/jwt.js";

export async function Authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        const token =
            request.cookies.accessToken ??
            request.headers.authorization?.replace(
                "Bearer ",
                ""
            );
        if (!token) {
            return reply.status(401).send({ error: "Unauthorized" });
        }
        const payload = await verifyAccessToken(request.server, token);
        // Map the payload user fields to match our augmented FastifyJWT type
        request.user = {
            id: payload.userId,
            email: "", // Not present in the JWTPayload token, but initialized
            role: payload.role,
        };
    } catch (err) {
        console.error(err);
        return reply.status(401).send({ error: "Unauthorized" });
    }
}
