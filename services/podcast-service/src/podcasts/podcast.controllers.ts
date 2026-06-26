import type { FastifyReply, FastifyRequest } from 'fastify';
import { PodcastRepository, type CreatePodcastInput } from './podcast.repository.js';
import * as podcastService from './podcast.services.js';

export async function handleCreatePodcast(
    request: FastifyRequest<{
        Params: { channelId: string };
        Body: {
            title: string;
            description?: string;
            thumbnailUrl?: string;
            visibility?: 'PUBLIC' | 'PRIVATE' | 'UNLISTED';
        };
    }>,
    reply: FastifyReply,
    repo: PodcastRepository
) {
    try {
        const podcast =
            await podcastService.createPodcast(
                {
                    ...request.body,
                    channelId: request.params.channelId,
                },
                repo
            );

        return reply.code(201).send(podcast);
    } catch (error) {
        request.log.error(error);

        return reply.code(500).send({
            error: 'Failed to create podcast',
        });
    }
}
export async function handleGetPodcastById(
    request: FastifyRequest<{ Params: { podcastId: string } }>,
    reply: FastifyReply,
    repo: PodcastRepository
) {
    try {
        const podcast = await podcastService.getPodcastById(
            request.params.podcastId,
            repo
        );

        return reply.code(200).send(podcast);
    } catch (error: any) {
        request.log.error(error);

        if (error.message === 'Podcast not found') {
            return reply.code(404).send({
                error: error.message,
            });
        }

        return reply.code(500).send({
            error: 'Internal Server Error',
        });
    }
}

export async function handleGetChannelPodcasts(
    request: FastifyRequest<{
        Params: { channelId: string };
    }>,
    reply: FastifyReply,
    repo: PodcastRepository
) {
    try {
        const podcasts =
            await podcastService.getChannelPodcasts(
                request.params.channelId,
                repo
            );

        return reply.code(200).send(podcasts);
    } catch (error) {
        request.log.error(error);

        return reply.code(500).send({
            error: 'Failed to retrieve channel podcasts',
        });
    }
}

export async function handleSchedulePodcast(
    request: FastifyRequest<{
        Params: { channelId: string; podcastId: string };
        Body: { scheduledAt: string; duration: number };
    }>,
    reply: FastifyReply,
    repo: PodcastRepository
) {
    try {
        const podcast =
            await podcastService.schedulePodcast(
                request.params.podcastId,
                request.params.channelId,
                new Date(request.body.scheduledAt),
                request.body.duration,
                repo
            );

        return reply.code(200).send(podcast);
    } catch (error: any) {
        request.log.error(error);

        if (error.message === 'Podcast not found') {
            return reply.code(404).send({
                error: error.message,
            });
        }

        if (error.message === 'Podcast does not belong to this channel') {
            return reply.code(403).send({
                error: error.message,
            });
        }

        return reply.code(400).send({
            error: error.message,
        });
    }
}

export async function handleCancelPodcast(
    request: FastifyRequest<{
        Params: { channelId: string; podcastId: string };
    }>,
    reply: FastifyReply,
    repo: PodcastRepository
) {
    try {
        const podcast =
            await podcastService.cancelPodcast(
                request.params.podcastId,
                request.params.channelId,
                repo
            );

        return reply.code(200).send(podcast);
    } catch (error: any) {
        request.log.error(error);

        if (error.message === 'Podcast not found') {
            return reply.code(404).send({
                error: error.message,
            });
        }

        if (error.message === 'Podcast does not belong to this channel') {
            return reply.code(403).send({
                error: error.message,
            });
        }

        return reply.code(400).send({
            error: error.message,
        });
    }
}