import type { FastifyReply, FastifyRequest } from 'fastify';
import { ChannelRepository } from './channel.repository.js';
import * as channelService from './channel.services.js';

export async function handleCreateChannel(
    request: FastifyRequest<{ Body: { name: string; description: string } }>,
    reply: FastifyReply,
    repo: ChannelRepository
) {
    try {
        const userId = request.user?.userId;
        if (!userId) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }

        const channel = await channelService.createChannel(repo, userId, request.body);
        return reply.code(201).send(channel);
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}
export async function handleUpdateChannel(
    request: FastifyRequest<{ Params: { channelId: string }; Body: { name?: string; description?: string; bannerUrl?: string; profilePictureUrl?: string } }>,
    reply: FastifyReply,
    repo: ChannelRepository
) {
    try {
        const userId = request.user?.userId;
        if (!userId) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        const channel = await channelService.updateChannel(repo, userId, request.params.channelId, request.body);
        return reply.code(200).send(channel);
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}

export async function handleDeleteChannel(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply,
    repo: ChannelRepository
) {
    try {
        const userId = request.user?.userId;
        if (!userId) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        const channel = await channelService.deleteChannel(repo, userId, request.params.channelId);
        return reply.code(200).send(channel);
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}

export async function handleFindChannel(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply,
    repo: ChannelRepository
) {
    try {
        const channel = await channelService.findChannel(repo, request.params.channelId);
        return reply.code(200).send(channel);
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}

export async function handleGetMyChannels(request: FastifyRequest, reply: FastifyReply, repo: ChannelRepository) {
    try {
        const userId = request.user?.userId;
        if (!userId) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        const channels = await channelService.getMyChannels(repo, userId);
        return reply.code(200).send(channels);
    } catch (error: any) {
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
}

export async function handleSubscribe(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply,
    repo: ChannelRepository
) {
    try {
        const userId = request.user?.userId;
        if (!userId) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        await channelService.subscribeToChannel(repo, userId, request.params.channelId);
        return reply.code(200).send({ message: 'Subscribed' });
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}

export async function handleUnsubscribe(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply,
    repo: ChannelRepository
) {
    try {
        const userId = request.user?.userId;
        if (!userId) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        await channelService.unsubscribeFromChannel(repo, userId, request.params.channelId);
        return reply.code(200).send({ message: 'Unsubscribed' });
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}

export async function handleGetMySubscriptions(request: FastifyRequest, reply: FastifyReply, repo: ChannelRepository) {
    try {
        const userId = request.user?.userId;
        if (!userId) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        const subscriptions = await channelService.getMySubscriptions(repo, userId);
        return reply.code(200).send(subscriptions);
    } catch (error: any) {
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
}

export async function handleIsSubscribed(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply,
    repo: ChannelRepository
) {
    try {
        const userId = request.user?.userId;
        if (!userId) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        const result = await channelService.isSubscribed(repo, userId, request.params.channelId);
        return reply.code(200).send({ isSubscribed: !!result });
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}
