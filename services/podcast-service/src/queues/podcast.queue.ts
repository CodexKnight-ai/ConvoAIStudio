import { Queue } from "bullmq";

export const podcastQueue = new Queue(
    "podcast-jobs",
    {
        connection: {
            host: process.env.REDIS_HOST || "localhost",
            port: Number(process.env.REDIS_PORT || 6379),
        },
        defaultJobOptions: {
            removeOnComplete: 100,
            removeOnFail: 1000,
            attempts: 3,
        },
    }
);