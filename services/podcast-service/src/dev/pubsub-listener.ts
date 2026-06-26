import {Redis} from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT || 6379),
});

const podcastId = process.argv[2];

if (!podcastId) {
    console.error("Usage: tsx src/dev/pubsub-listener.ts <podcastId>");
    process.exit(1);
}

const channel = `podcast:${podcastId}:events`;

async function main() {
    await redis.subscribe(channel);

    console.log(`Listening on ${channel}\n`);

    redis.on("message", (channel, message) => {
        console.log("=================================");
        console.log(`Channel : ${channel}`);
        console.log(JSON.stringify(JSON.parse(message), null, 2));
        console.log("=================================\n");
    });
}

main().catch(console.error);