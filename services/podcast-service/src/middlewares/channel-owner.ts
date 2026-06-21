import type { FastifyRequest, FastifyReply } from "fastify";
import { ChannelRepository } from "../channel/channel.repository.js";

export async function ChannelOwner(request: FastifyRequest, reply: FastifyReply) {
    const channelId = (request.params as any)?.channelId || (request.body as any)?.channelId;
    if (!channelId) {
        return reply.status(400).send({ error: "channelId is required" });
    }

    const repo = new ChannelRepository(request.server.prisma);
    const channel = await repo.findById(channelId);

    if (!channel) {
        return reply.status(404).send({ error: "Channel not found" });
    }

    if (channel.ownerId !== request.user?.userId) {
        return reply.status(403).send({ error: "Forbidden" });
    }
}
