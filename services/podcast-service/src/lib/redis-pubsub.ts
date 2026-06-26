import { Redis } from "ioredis";

export const redisPublisher = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    db: Number(process.env.REDIS_DB || 1),
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    lazyConnect: true,
});
redisPublisher.on("connect", () => {
    console.log("[Redis PubSub] Connected");
});

redisPublisher.on("ready", () => {
    console.log("[Redis PubSub] Ready");
});

redisPublisher.on("reconnecting", () => {
    console.log("[Redis PubSub] Reconnecting...");
});

redisPublisher.on("close", () => {
    console.log("[Redis PubSub] Connection closed");
});

redisPublisher.on("error", (err) => {
    console.error("[Redis PubSub] Error:", err);
});
export async function connectRedisPublisher() {
    if (redisPublisher.status === "wait") {
        await redisPublisher.connect();
    }
}
export async function disconnectRedisPublisher() {
    try {
        await redisPublisher.quit();
    } catch {
        redisPublisher.disconnect();
    }
}