import { FastifyInstance } from 'fastify';
import { PodcastRepository, CreatePodcastInput } from './podcast.repository.js';
import * as podcastController from './podcast.controllers.js';

export async function podcastRoutes(fastify: FastifyInstance) {
    const repo = new PodcastRepository(fastify);

    fastify.post<{ Body: CreatePodcastInput }>(
        '/podcast',
        { preHandler: [fastify.authenticate, fastify.channelowner] },
        async (request, reply) => {
            return podcastController.handleCreatePodcast(request, reply, repo);
        }
    );

    fastify.get<{ Params: { id: string } }>(
        '/podcast/:id',
        async (request, reply) => {
            return podcastController.handleGetPodcastById(request, reply, repo);
        }
    );

    fastify.get<{ Params: { channelId: string } }>(
        '/podcast/channel/:channelId',
        async (request, reply) => {
            return podcastController.handleGetChannelPodcasts(request, reply, repo);
        }
    );
}