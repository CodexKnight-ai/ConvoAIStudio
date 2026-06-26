import type { PodcastEvent } from "../events/podcast-event.js";

export interface EventPublisher {
    publish<T>(
        channel: string,
        event: PodcastEvent<T>
    ): Promise<void>;
}