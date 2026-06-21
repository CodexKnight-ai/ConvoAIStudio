import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

export default fp(async (fastify) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    await fastify.register(fastifyJwt, {
        secret: process.env.JWT_SECRET,
    });
});
