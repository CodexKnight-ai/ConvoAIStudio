import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
import { createPodcastWorker } from "./queues/podcast.worker.js";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
    }),
});
const worker = createPodcastWorker(prisma);

console.log("Podcast Worker Started");
worker.on("failed", (job, err) => {
    console.error(`❌ Job ${job?.id} (${job?.name}) failed:`, err.message);
});
console.log("Podcast Worker Started");