import { Worker, Job } from "bullmq";
import { PodcastJobs, type PodcastJobData } from "./job-types.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { podcastQueue } from "../queues/podcast.queue.js";
import {
    initAIEngineClient,
    startPodcast,
} from "../grpc/ai-engine/ai-engine.client.js";

/**
 * ✅ INIT ONCE (GLOBAL SCOPE - NOT INSIDE FUNCTION)
 */
initAIEngineClient({
    host: process.env.AI_ENGINE_HOST || "localhost",
    port: Number(process.env.AI_ENGINE_PORT) || 50052,
});

export function createPodcastWorker(prisma: PrismaClient) {
    console.log("[WORKER] Creating podcast worker...");

    const worker = new Worker<PodcastJobData>(
        "podcast-jobs",
        async (job: Job<PodcastJobData>) => {
            const { podcastId } = job.data;

            console.log(`[WORKER] Received job: ${job.name} (${podcastId})`);

            switch (job.name) {
                case PodcastJobs.START_PODCAST: {
                    console.log(`[WORKER] Starting podcast ${podcastId}`);

                    const podcast = await prisma.podcast.findUnique({
                        where: { id: podcastId },
                    });

                    if (!podcast) {
                        throw new Error(`Podcast ${podcastId} not found`);
                    }

                    if (podcast.status !== "SCHEDULED") {
                        console.warn(
                            `[WORKER] Invalid status for ${podcastId}: ${podcast.status}`
                        );
                        return;
                    }

                    await prisma.podcast.update({
                        where: { id: podcastId },
                        data: {
                            status: "LIVE",
                            startedAt: new Date(),
                        },
                    });

                    console.log(
                        `[WORKER] Podcast ${podcastId} is now LIVE`
                    );

                    /**
                     * ✅ gRPC STREAM START
                     */
                    try {
                        await startPodcast(podcastId, podcast.title);
                    } catch (error) {
                        console.error(
                            `[WORKER] gRPC stream failed for ${podcastId}`,
                            error
                        );

                        await prisma.podcast.update({
                            where: { id: podcastId },
                            data: {
                                status: "FAILED",
                            },
                        });

                        throw error;
                    }

                    /**
                     * ✅ schedule end job
                     */
                    if (podcast.duration && podcast.duration > 0) {
                        const endDelay = podcast.duration * 1000;

                        console.log(
                            `[WORKER] Scheduling END in ${podcast.duration}s`
                        );

                        await podcastQueue.add(
                            PodcastJobs.END_PODCAST,
                            { podcastId },
                            {
                                delay: endDelay,
                                removeOnComplete: true,
                            }
                        );
                    }

                    break;
                }

                case PodcastJobs.END_PODCAST: {
                    console.log(`[WORKER] Ending podcast ${podcastId}`);

                    const podcast = await prisma.podcast.findUnique({
                        where: { id: podcastId },
                    });

                    if (!podcast) {
                        throw new Error(`Podcast ${podcastId} not found`);
                    }

                    if (podcast.status !== "LIVE") {
                        console.warn(
                            `[WORKER] Cannot end podcast ${podcastId}, status: ${podcast.status}`
                        );
                        return;
                    }

                    await prisma.podcast.update({
                        where: { id: podcastId },
                        data: {
                            status: "ENDED",
                            endedAt: new Date(),
                        },
                    });

                    console.log(
                        `[WORKER] Podcast ${podcastId} ENDED gracefully`
                    );
                    break;
                }

                case PodcastJobs.CANCEL_PODCAST: {
                    console.log(`[WORKER] Cancelling podcast ${podcastId}`);

                    await prisma.podcast.update({
                        where: { id: podcastId },
                        data: {
                            status: "CANCELLED",
                        },
                    });

                    console.log(
                        `[WORKER] Podcast ${podcastId} CANCELLED`
                    );
                    break;
                }

                default:
                    console.warn(`[WORKER] Unknown job: ${job.name}`);
            }
        },
        {
            connection: {
                host: process.env.REDIS_HOST || "localhost",
                port: Number(process.env.REDIS_PORT || 6379),
                db: 1,
            },
            concurrency: 100,
        }
    );
    console.log("[WORKER] Podcast worker initialized");
    return worker;
}