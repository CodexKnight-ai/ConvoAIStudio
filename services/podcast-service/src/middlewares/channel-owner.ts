import type { FastifyRequest, FastifyReply } from "fastify";
import { ChannelRepository } from "../channel/channel.repository.js";

export async function ChannelOwner(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { channelId?: string; podcastId?: string; id?: string };
    const body = request.body as { channelId?: string } | undefined;

    let channelId = params.channelId ?? body?.channelId;

    if (!channelId) {
        const podcastId = params.podcastId ?? params.id;

        if (podcastId) {
            const podcast = await request.server.prisma.podcast.findFirst({
                where: { id: podcastId, deletedAt: null },
                select: { channelId: true },
            });

            if (!podcast) {
                return reply.status(404).send({ error: "Podcast not found" });
            }

            channelId = podcast.channelId;
        }
    }

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
