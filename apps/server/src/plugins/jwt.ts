import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}

export default fp(async (fastify) => {
    await fastify.register(fastifyJwt, {
        secret: jwtSecret,
    });
});