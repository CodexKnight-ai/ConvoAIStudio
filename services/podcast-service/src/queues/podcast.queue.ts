import { Queue } from "bullmq";

export const podcastQueue = new Queue(
    "podcast-jobs",
    {
        connection: {
            host: process.env.REDIS_HOST || "localhost",
            port: Number(process.env.REDIS_PORT || 6379),
            db: 1
        },
        defaultJobOptions: {
            removeOnComplete: 50,
            removeOnFail: 50,
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000,
            },
        },
    }
);