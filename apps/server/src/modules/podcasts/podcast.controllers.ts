import { FastifyReply, FastifyRequest } from 'fastify';
import { PodcastRepository, CreatePodcastInput } from './podcast.repository.js';
import * as podcastService from './podcast.services.js';

export async function handleCreatePodcast(
    request: FastifyRequest<{ Body: CreatePodcastInput }>,
    reply: FastifyReply,
    repo: PodcastRepository
) {
    try {
        const podcast = await podcastService.createPodcastWorkflow(request.body, repo);

        return reply.code(202).send({
            message: 'AI Multi-agent conversation pipeline initiated successfully.',
            podcastId: podcast.id,
            status: podcast.status,
        });
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Failed to initiate podcast creation' });
    }
}

export async function handleGetPodcastById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    repo: PodcastRepository
) {
    try {
        const { id } = request.params;
        const podcast = await podcastService.getPodcastById(id, repo);
        return reply.code(200).send(podcast);
    } catch (error: any) {
        if (error.message === 'Podcast not found') {
            return reply.code(404).send({ error: error.message });
        }
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
}

export async function handleGetChannelPodcasts(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply,
    repo: PodcastRepository
) {
    try {
        const { channelId } = request.params;
        const podcasts = await podcastService.getChannelPodcasts(channelId, repo);
        return reply.code(200).send(podcasts);
    } catch (error) {
        return reply.code(500).send({ error: 'Failed to retrieve channel podcasts' });
    }
}