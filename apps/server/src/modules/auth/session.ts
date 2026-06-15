// session.ts

import { FastifyInstance } from "fastify";

const SESSION_PREFIX = "session:";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export interface RedisSession {
    userId: string;
    sessionId: string;
    role: string;
    refreshTokenHash: string;
}

function getSessionKey(sessionId: string) {
    return `${SESSION_PREFIX}${sessionId}`;
}

export async function createRedisSession(
    fastify: FastifyInstance,
    session: RedisSession
) {
    const key = getSessionKey(session.sessionId);

    await fastify.redis.set(
        key,
        JSON.stringify(session),
        "EX",
        SESSION_TTL_SECONDS
    );
}

export async function getRedisSession(
    fastify: FastifyInstance,
    sessionId: string
): Promise<RedisSession | null> {
    const key = getSessionKey(sessionId);

    const data = await fastify.redis.get(key);
    console.log(data);
    if (!data) {
        return null;
    }

    return JSON.parse(data) as RedisSession;
}

export async function deleteRedisSession(
    fastify: FastifyInstance,
    sessionId: string
) {
    const key = getSessionKey(sessionId);

    await fastify.redis.del(key);
}

export async function extendSessionTTL(
    fastify: FastifyInstance,
    sessionId: string
) {
    const key = getSessionKey(sessionId);
    await fastify.redis.expire(key, SESSION_TTL_SECONDS);
}
export async function updateRefreshTokenHash(
    fastify: FastifyInstance,
    sessionId: string,
    refreshTokenHash: string
) {
    const session = await getRedisSession(fastify, sessionId);

    if (!session) {
        return;
    }

    session.refreshTokenHash = refreshTokenHash;

    await createRedisSession(fastify, session);
}
export async function sessionExists(
    fastify: FastifyInstance,
    sessionId: string
) {
    const key = getSessionKey(sessionId);
    const exists = await fastify.redis.exists(key);
    return exists === 1;
}