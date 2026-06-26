import { Worker } from "bullmq";
import { PodcastJobs } from "./job-types.js";
import { PrismaClient } from "../generated/prisma/client.js";

export function createPodcastWorker(prisma: PrismaClient) {
    return new Worker(
        "podcast-jobs",
        async (job) => {
            switch (job.name) {
                case PodcastJobs.START_PODCAST: {
                    const { podcastId } = job.data;
                    console.log(
                        `[WORKER] Starting podcast ${podcastId}`
                    );
                    const podcast = await prisma.podcast.findUnique({
                        where: { id: podcastId },
                    });
                    if (!podcast) {
                        throw new Error("Podcast not found");
                    }
                    if (podcast.status !== "SCHEDULED") {
                        console.warn(
                            `[WORKER] Cannot start podcast ${podcastId}. Current status: ${podcast.status}`
                        );
                        return;
                    }
                    await prisma.podcast.update({
                        where: {
                            id: podcastId,
                        },
                        data: {
                            status: "LIVE",
                            startedAt: new Date(),
                        },
                    });
                    console.log(
                        `[WORKER] Podcast ${podcastId} is now LIVE`
                    );
                    break;
                }
                case PodcastJobs.END_PODCAST: {
                    const { podcastId } = job.data;
                    console.log(
                        `[WORKER] Ending podcast ${podcastId}`
                    );
                    const podcast = await prisma.podcast.findUnique({
                        where: { id: podcastId },
                    });
                    if (!podcast) {
                        throw new Error("Podcast not found");
                    }
                    if (podcast.status !== "LIVE") {
                        console.warn(
                            `[WORKER] Cannot end podcast ${podcastId}. Current status: ${podcast.status}`
                        );
                        return;
                    }
                    await prisma.podcast.update({
                        where: {
                            id: podcastId,
                        },
                        data: {
                            status: "ENDED",
                            endedAt: new Date(),
                        },
                    });
                    console.log(
                        `[WORKER] Podcast ${podcastId} is now ENDED`
                    );
                    break;
                }
                case PodcastJobs.CANCEL_PODCAST: {
                    const { podcastId } = job.data;
                    console.log(
                        `[WORKER] Cancelling podcast ${podcastId}`
                    );
                    await prisma.podcast.update({
                        where: {
                            id: podcastId,
                        },
                        data: {
                            status: "CANCELLED",
                        },
                    });
                    console.log(
                        `[WORKER] Podcast ${podcastId} is now CANCELLED`
                    );
                    break;
                }
                default:
                    console.warn(
                        `[WORKER] Unknown job ${job.name}`
                    );
            }
        },
        {
            connection: {
                host: process.env.REDIS_HOST || "localhost",
                port: Number(
                    process.env.REDIS_PORT || 6379
                ),
            },
        }
    );
}