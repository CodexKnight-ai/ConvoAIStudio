import { config } from "./config/env.js";
import { logger } from "./logger/logger.js";

import { createRoomManager } from "./rooms/room.manager.js";

import { createMessageHandler } from "./websocket/message.handler.js";
import { createConnectionHandler } from "./websocket/connection.handler.js";
import { createWebSocketServer } from "./websocket/websockets.server.js";

import { createRedisMessageHandler } from "./redis/message.handler.js";
import { createRedisSubscriber } from "./redis/subscriber.js";

async function bootstrap() {
    const roomManager = createRoomManager();

    const handleWebSocketMessage = createMessageHandler({
        roomManager,
    });

    const handleConnection = createConnectionHandler({
        roomManager,
        logger,
        handleMessage: handleWebSocketMessage,
    });

    const websocketServer = createWebSocketServer({
        port: config.PORT,
        logger,
        handleConnection,
    });

    const handleRedisMessage = createRedisMessageHandler({
        roomManager,
        logger,
    });

    const redisSubscriber = await createRedisSubscriber({
        redisUrl: config.REDIS_URL,
        logger,
        handleMessage: handleRedisMessage,
    });

    logger.info("Realtime Service started");

    process.on("SIGINT", async () => {
        logger.info("Shutting down...");

        websocketServer.close();

        await redisSubscriber.quit();

        process.exit(0);
    });

    process.on("SIGTERM", async () => {
        logger.info("Shutting down...");

        websocketServer.close();

        await redisSubscriber.quit();

        process.exit(0);
    });
}

bootstrap().catch((error) => {
    logger.fatal(error, "Failed to start Realtime Service");
    process.exit(1);
});