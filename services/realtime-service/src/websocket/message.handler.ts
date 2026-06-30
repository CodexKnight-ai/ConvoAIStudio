import { RoomManager } from "../rooms/room.manager.js";
import {
    ClientMessage,
    ClientWebSocket,
} from "../types/websocket.types.js";

interface Dependencies {
    roomManager: RoomManager;
}

export function createMessageHandler({
    roomManager,
}: Dependencies) {
    return function handleMessage(
        socket: ClientWebSocket,
        rawData: Buffer
    ): void {
        let message: ClientMessage;
        try {
            message = JSON.parse(rawData.toString());
        } catch {
            socket.send(
                JSON.stringify({
                    error: "Invalid JSON",
                })
            );
            return;
        }
        switch (message.type) {
            case "SUBSCRIBE": {
                if (!message.podcastId) {
                    socket.send(
                        JSON.stringify({
                            error: "podcastId is required",
                        })
                    );
                    return;
                }
                roomManager.joinRoom(message.podcastId, socket);
                socket.send(
                    JSON.stringify({
                        type: "SUBSCRIBED",
                        podcastId: message.podcastId,
                    })
                );
                break;
            }
            default:
                socket.send(
                    JSON.stringify({
                        error: "Unknown message type",
                    })
                );
        }
    };
}