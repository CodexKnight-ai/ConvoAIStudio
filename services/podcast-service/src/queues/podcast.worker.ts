import { Worker, Job, Queue } from "bullmq"; // 1. Import Queue
import { PodcastJobs, type PodcastJobData } from "./job-types.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { podcastQueue } from "../queues/podcast.queue.js"; // 2. Import your actual queue instance

export function createPodcastWorker(prisma: PrismaClient) {
    return new Worker<PodcastJobData>(
        "podcast-jobs",
        async (job: Job<PodcastJobData>) => {
            const { podcastId } = job.data;
            switch (job.name) {
                case PodcastJobs.START_PODCAST: {
                    console.log(`[WORKER] Starting podcast ${podcastId} !!`);
                    const podcast = await prisma.podcast.findUnique({
                        where: { id: podcastId },
                    });
                    if (!podcast) {
                        throw new Error(`Podcast ${podcastId} not found`);
                    }
                    if (podcast.status !== "SCHEDULED") {
                        console.warn(
                            `[WORKER] Cannot start podcast ${podcastId}. Current status: ${podcast.status}`
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

                    console.log(`[WORKER] Podcast ${podcastId} is now LIVE. Ready to stream turns.`);

                    // Downstream gRPC trigger to services/ai-engine goes here once proto contracts are generated

                    if (podcast.duration !== null && podcast.duration !== undefined && podcast.duration > 0) {
                        const endDelay = podcast.duration * 1000;
                        console.log(`[WORKER] Scheduling automatic end for podcast ${podcastId} in ${podcast.duration}s`);

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
                            `[WORKER] Cannot end podcast ${podcastId}. Current status: ${podcast.status}`
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
                    console.log(`[WORKER] Podcast ${podcastId} is now gracefully ENDED`);
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
                    console.log(`[WORKER] Podcast ${podcastId} has been CANCELLED`);
                    break;
                }

                default:
                    console.warn(`[WORKER] Unknown job type received: ${job.name}`);
            }
        },
        {
            connection: {
                host: process.env.REDIS_HOST || "localhost",
                port: Number(process.env.REDIS_PORT || 6379),
                db: 1, // Secure sandbox isolation intact
            },
            concurrency: 100,
        }
    );
}