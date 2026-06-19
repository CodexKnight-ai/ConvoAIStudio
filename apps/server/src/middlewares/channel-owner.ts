import { FastifyReply, FastifyRequest } from 'fastify';
import { ChannelRepository } from '../modules/channel/channel.repository.js';

export const channelOwnerMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    const { channelId } = request.params as { channelId: string };
    if (!channelId) return;

    const repo = new ChannelRepository(request.server);
    const channel = await repo.findById(channelId);

    if (!channel) {
        return reply.code(404).send({ error: `Channel not found` });
    }
    if (channel.ownerId !== request.user.userId) {
        return reply.code(403).send({ error: 'Forbidden' });
    }
};