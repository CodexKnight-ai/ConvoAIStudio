import { WebSocketServer } from "ws";
import { Logger } from "pino";
import { ClientWebSocket } from "../types/websocket.types.js";

interface Dependencies {
    port: number;
    logger: Logger;
    handleConnection: (socket: ClientWebSocket) => void;
}

export function createWebSocketServer({
    port,
    logger,
    handleConnection,
}: Dependencies): WebSocketServer {
    const wss = new WebSocketServer({
        port,
    });
    wss.on("listening", () => {
        logger.info(`WebSocket server listening on ws://localhost:${port}`);
    });
    wss.on("connection", (socket) => {
        handleConnection(socket as ClientWebSocket);
    });
    wss.on("error", (error) => {
        logger.error(error, "WebSocket server error");
    });
    return wss;
}