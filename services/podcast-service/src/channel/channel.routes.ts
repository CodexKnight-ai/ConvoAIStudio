import type { FastifyInstance } from 'fastify';
import { ChannelRepository } from './channel.repository.js';
import * as channelController from './channel.controllers.js';

export async function channelRoutes(fastify: FastifyInstance) {
    const repo = new ChannelRepository(fastify.prisma);

    fastify.post<{ Body: { name: string; description: string } }>(
        '/',
        { preHandler: [fastify.authenticate] },
        async (request, reply) => {
            return channelController.handleCreateChannel(request, reply, repo);
        }
    );

    fastify.put<{ Params: { channelId: string }; Body: { name?: string; description?: string; bannerUrl?: string; profilePictureUrl?: string } }>(
        '/:channelId',
        { preHandler: [fastify.authenticate, fastify.channelowner] },
        async (request, reply) => {
            return channelController.handleUpdateChannel(request, reply, repo);
        }
    );

    fastify.delete<{ Params: { channelId: string } }>(
        '/:channelId',
        { preHandler: [fastify.authenticate, fastify.channelowner] },
        async (request, reply) => {
            return channelController.handleDeleteChannel(request, reply, repo);
        }
    );

    fastify.get<{ Params: { channelId: string } }>(
        '/:channelId',
        { preHandler: [fastify.authenticate] },
        async (request, reply) => {
            return channelController.handleFindChannel(request, reply, repo);
        }
    );

    fastify.get(
        '/me',
        { preHandler: [fastify.authenticate] },
        async (request, reply) => {
            return channelController.handleGetMyChannels(request, reply, repo);
        }
    );

    fastify.post<{ Params: { channelId: string } }>(
        '/subscribe/:channelId',
        { preHandler: [fastify.authenticate] },
        async (request, reply) => {
            return channelController.handleSubscribe(request, reply, repo);
        }
    );

    fastify.post<{ Params: { channelId: string } }>(
        '/unsubscribe/:channelId',
        { preHandler: [fastify.authenticate] },
        async (request, reply) => {
            return channelController.handleUnsubscribe(request, reply, repo);
        }
    );

    fastify.get(
        '/subscriptions',
        { preHandler: [fastify.authenticate] },
        async (request, reply) => {
            return channelController.handleGetMySubscriptions(request, reply, repo);
        }
    );

    fastify.get<{ Params: { channelId: string } }>(
        '/isSubscribed/:channelId',
        { preHandler: [fastify.authenticate] },
        async (request, reply) => {
            return channelController.handleIsSubscribed(request, reply, repo);
        }
    );
}