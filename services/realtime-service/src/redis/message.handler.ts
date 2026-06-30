import { Logger } from "pino";
import { RoomManager } from "../rooms/room.manager.js";
import { PodcastEvent } from "../types/event.types.js";

interface Dependencies {
    roomManager: RoomManager;
    logger: Logger;
}

export function createRedisMessageHandler({
    roomManager,
    logger,
}: Dependencies) {
    return function handleRedisMessage(
        _channel: string,
        rawMessage: string
    ): void {
        let event: PodcastEvent<unknown>;

        try {
            event = JSON.parse(rawMessage);
        } catch {
            logger.warn("Received invalid JSON from Redis");
            return;
        }
        const clients = roomManager.getClients(event.podcastId);
        if (!clients || clients.size === 0) {
            return;
        }
        for (const socket of clients) {
            if (socket.readyState === socket.OPEN) {
                socket.send(rawMessage);
            }
        }

        logger.debug(
            {
                podcastId: event.podcastId,
                viewers: clients.size,
            },
            "Broadcasted Redis event"
        );
    };
}