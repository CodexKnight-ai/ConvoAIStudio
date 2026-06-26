import { PodcastEventType } from "./events-types.js";

export interface PodcastEvent<T = unknown> {
    event: PodcastEventType;
    podcastId: string;
    sequence: number;
    timestamp: string;
    payload: T;
}