import { WebSocket } from "ws";

export interface ClientWebSocket extends WebSocket {
    podcastId?: string;
}

export interface SubscribeMessage {
    type: "SUBSCRIBE";
    podcastId: string;
}

export type ClientMessage = SubscribeMessage;