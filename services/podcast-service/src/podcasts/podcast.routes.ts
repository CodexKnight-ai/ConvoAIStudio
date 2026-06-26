import type { FastifyInstance } from 'fastify';
import { PodcastRepository } from './podcast.repository.js';
import * as podcastController from './podcast.controllers.js';

export async function podcastRoutes(fastify: FastifyInstance) {
    const repo = new PodcastRepository(fastify.prisma);

    fastify.post<{
        Params: { channelId: string };
        Body: {
            title: string;
            description?: string;
            thumbnailUrl?: string;
            visibility?: 'PUBLIC' | 'PRIVATE' | 'UNLISTED';
        };
    }>(
        '/channel/:channelId/podcast',
        { preHandler: [fastify.authenticate, fastify.channelowner] },
        async (request, reply) => {
            return podcastController.handleCreatePodcast(request, reply, repo);
        }
    );

    fastify.get<{ Params: { channelId: string } }>(
        '/channel/:channelId',
        async (request, reply) => {
            return podcastController.handleGetChannelPodcasts(request, reply, repo);
        }
    );

    fastify.get<{ Params: { podcastId: string } }>(
        '/:podcastId',
        async (request, reply) => {
            return podcastController.handleGetPodcastById(request, reply, repo);
        }
    );

    fastify.post<{
        Params: { channelId: string; podcastId: string };
        Body: { scheduledAt: string };
    }>(
        '/channel/:channelId/podcast/:podcastId/schedule',
        { preHandler: [fastify.authenticate, fastify.channelowner] },
        async (request, reply) => {
            return podcastController.handleSchedulePodcast(request, reply, repo);
        }
    );

    fastify.post<{
        Params: { channelId: string; podcastId: string };
    }>(
        '/channel/:channelId/podcast/:podcastId/cancel',
        { preHandler: [fastify.authenticate, fastify.channelowner] },
        async (request, reply) => {
            return podcastController.handleCancelPodcast(request, reply, repo);
        }
    );
}
