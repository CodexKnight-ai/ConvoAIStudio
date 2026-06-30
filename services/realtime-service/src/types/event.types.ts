export enum PodcastEventType {
    TRANSCRIPT_CHUNK = "TRANSCRIPT_CHUNK",
    PODCAST_STARTED = "PODCAST_STARTED",
    PODCAST_ENDED = "PODCAST_ENDED",
    AUDIO_CHUNK = "AUDIO_CHUNK",
    AI_RESPONSE = "AI_RESPONSE",
}

export interface PodcastEvent<T = unknown> {
    event: PodcastEventType;
    podcastId: string;
    sequence: number;
    timestamp: string;
    payload: T;
}
