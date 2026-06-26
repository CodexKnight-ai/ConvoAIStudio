export interface AIEngineConfig {
    host: string;
    port: number;
}

export interface IAIEngineClient {
    connect(): Promise<void>;

    startPodcast(
        podcastId: string,
        title: string,
    ): Promise<void>;

    close(): Promise<void>;
}