import type { FastifyRequest, FastifyReply } from "fastify";

interface JWTPayload {
    userId: string;
    sessionId: string;
    role: string;
    iat: number;
    exp: number;
}

export async function Authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        const token =
            request.cookies?.accessToken ??
            request.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            return reply.status(401).send({ error: "Unauthorized" });
        }

        const payload = await request.server.jwt.verify<JWTPayload>(token);

        request.user = {
            id: payload.userId,
            userId: payload.userId,
            role: payload.role,
        };
    } catch (err) {
        console.error(err);
        return reply.status(401).send({ error: "Unauthorized" });
    }
}
