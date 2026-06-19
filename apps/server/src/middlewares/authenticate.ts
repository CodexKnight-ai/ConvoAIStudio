import { FastifyRequest, FastifyReply } from "fastify";
import { verifyAccessToken } from "../modules/auth/jwt.js";
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
        const payload = await verifyAccessToken(request.server, token)
        request.user = payload
    } catch (err) {
        console.error(err);
        return reply.status(401).send({ error: "Unauthorized" });
    }
}