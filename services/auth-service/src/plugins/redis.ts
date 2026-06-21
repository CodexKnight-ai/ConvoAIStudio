import fp from "fastify-plugin";
import fastifyRedis from "@fastify/redis";
export default fp(async (fastify) => {
    await fastify.register(fastifyRedis, {
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
});