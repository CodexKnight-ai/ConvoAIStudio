import { Logger } from "pino";
import { RoomManager } from "../rooms/room.manager.js";
import { ClientWebSocket } from "../types/websocket.types.js";

interface Dependencies {
    roomManager: RoomManager;
    logger: Logger;
    handleMessage: (socket: ClientWebSocket, rawData: Buffer) => void;
}

export function createConnectionHandler({
    roomManager,
    logger,
    handleMessage,
}: Dependencies) {
    return function handleConnection(socket: ClientWebSocket): void {
        logger.info("New WebSocket connection established");
        socket.on("message", (rawData: Buffer) => {
            handleMessage(socket, rawData);
        });
        socket.on("close", () => {
            logger.info(
                {
                    podcastId: socket.podcastId,
                },
                "WebSocket disconnected"
            );
            roomManager.leaveRoom(socket);
        });
        socket.on("error", (error) => {
            logger.error(error, "WebSocket error");
        });
    };
}