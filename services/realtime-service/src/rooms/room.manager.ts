import { ClientWebSocket } from "../types/websocket.types.js";

export interface RoomManager {
    joinRoom: (podcastId: string, socket: ClientWebSocket) => void;
    leaveRoom: (socket: ClientWebSocket) => void;
    getClients: (podcastId: string) => ReadonlySet<ClientWebSocket> | undefined;
}

export function createRoomManager(): RoomManager {
    const rooms = new Map<string, Set<ClientWebSocket>>();
    function joinRoom(
        podcastId: string,
        socket: ClientWebSocket
    ): void {
        if (socket.podcastId === podcastId) {
            return;
        }
        leaveRoom(socket);
        let clients = rooms.get(podcastId);
        if (!clients) {
            clients = new Set<ClientWebSocket>();
            rooms.set(podcastId, clients);
        }
        clients.add(socket);
        socket.podcastId = podcastId;
    }

    function leaveRoom(socket: ClientWebSocket): void {
        const podcastId = socket.podcastId;
        if (!podcastId) {
            return;
        }
        const clients = rooms.get(podcastId);
        if (!clients) {
            socket.podcastId = undefined;
            return;
        }
        clients.delete(socket);
        if (clients.size === 0) {
            rooms.delete(podcastId);
        }
        socket.podcastId = undefined;
    }
    function getClients(
        podcastId: string
    ): ReadonlySet<ClientWebSocket> | undefined {
        return rooms.get(podcastId);
    }

    return {
        joinRoom,
        leaveRoom,
        getClients,
    };
}