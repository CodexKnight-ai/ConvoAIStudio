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

export async function startPodcast(
    podcastId: string,
    title: string
): Promise<void> {
    if (!client) {
        throw new Error("AI Engine client not initialized. Call initAIEngineClient first.");
    }
    console.log("\nPodcast Started\n");
    const request: PodcastRequest = {
        podcastId,
        title,
    };
    // bidirectional stream — open the duplex channel, then write requests into it
    const stream = client.startPodcast();

    // Write the initial request and signal we have no more client messages
    stream.write(request);
    stream.end();

    let index = 1;

    try {
        for await (const chunk of stream as unknown as AsyncIterable<PodcastResponse>) {
            console.log(`Chunk ${index}`);
            console.log(chunk.transcript);
            console.log("");
            index++;
        }
    } catch (err) {
        console.error("gRPC stream error:", err);
    }

    console.log("Podcast Stream Ended");
}

export function closeAIEngineClient(): void {
    client = null;
}