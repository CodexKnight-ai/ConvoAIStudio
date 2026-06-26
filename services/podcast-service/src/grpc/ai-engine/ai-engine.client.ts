import * as grpc from "@grpc/grpc-js";

import {
    AIEngineClient,
    PodcastRequest,
    PodcastResponse,
} from "@convoai/shared/proto/ai_engine.js";

export interface AIEngineConfig {
    host: string;
    port: number;
}

let client: AIEngineClient | null = null;

export function initAIEngineClient(config: AIEngineConfig): void {
    if (client) return;

    client = new AIEngineClient(
        `${config.host}:${config.port}`,
        grpc.credentials.createInsecure()
    );
}

export function startPodcast(
    podcastId: string,
    title: string
): AsyncIterable<PodcastResponse> {
    if (!client) {
        throw new Error(
            "AI Engine client not initialized. Call initAIEngineClient first."
        );
    }
    const request: PodcastRequest = {
        podcastId,
        title,
    };
    const stream = client.startPodcast();
    stream.write(request);
    stream.end();
    return stream as unknown as AsyncIterable<PodcastResponse>;
}

export function closeAIEngineClient(): void {
    client?.close();
    client = null;
}