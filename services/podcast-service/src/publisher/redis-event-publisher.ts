import type { Redis } from "ioredis";

import type { PodcastEvent } from "../events/podcast-event.js";
import type { EventPublisher } from "./event-publisher.js";

export class RedisEventPublisher implements EventPublisher {
    constructor(private readonly redis: Redis) { }
    async publish<T>(
        channel: string,
        event: PodcastEvent<T>
    ): Promise<void> {
        console.log("[Redis PubSub] Publishing event:", event);
        await this.redis.publish(
            channel,
            JSON.stringify(event)
        );
    }
}