import { Redis } from "ioredis";
import { Logger } from "pino";

interface Dependencies {
    redisUrl: string;
    logger: Logger;
    handleMessage: (channel: string, message: string) => void;
}
const PODCAST_EVENTS_PATTERN = "podcast:*:events";
export async function createRedisSubscriber({
    redisUrl,
    logger,
    handleMessage,
}: Dependencies): Promise<Redis> {
    const subscriber = new Redis(redisUrl);
    subscriber.on("connect", () => {
        logger.info("Connected to Redis");
    });
    subscriber.on("error", (error) => {
        logger.error(error, "Redis subscriber error");
    });
    subscriber.on("pmessage", (_pattern: string, channel: string, message: string) => {
        handleMessage(channel, message);
    });
    await subscriber.psubscribe(PODCAST_EVENTS_PATTERN);
    logger.info("Subscribed to pattern: podcast:*:events");
    return subscriber;
}