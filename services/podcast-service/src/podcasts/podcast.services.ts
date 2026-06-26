import { PodcastRepository, type CreatePodcastInput } from './podcast.repository.js';
import { podcastQueue } from "../queues/podcast.queue.js";
import { PodcastJobs } from "../queues/job-types.js";

async function getPodcastForChannel(
    podcastId: string,
    channelId: string,
    repo: PodcastRepository
) {
    const podcast = await repo.findById(podcastId);

    if (!podcast) {
        throw new Error('Podcast not found');
    }

    if (podcast.channelId !== channelId) {
        throw new Error('Podcast does not belong to this channel');
    }

    return podcast;
}

export async function createPodcast(
    data: CreatePodcastInput,
    repo: PodcastRepository
) {
    return repo.create(data);
}

export async function getPodcastById(
    id: string,
    repo: PodcastRepository
) {
    const podcast = await repo.findById(id);

    if (!podcast) {
        throw new Error('Podcast not found');
    }

    return podcast;
}

export async function getChannelPodcasts(
    channelId: string,
    repo: PodcastRepository
) {
    return repo.findByChannel(channelId);
}

export async function schedulePodcast(
    podcastId: string,
    channelId: string,
    scheduledAt: Date,
    repo: PodcastRepository
) {
    const podcast = await getPodcastForChannel(podcastId, channelId, repo);

    if (podcast.status !== 'DRAFT') {
        throw new Error(
            'Only draft podcasts can be scheduled'
        );
    }
    if (scheduledAt <= new Date()) {
        throw new Error(
            'Scheduled time must be in the future'
        );
    }
    const updatedPodcast = await repo.update(
        podcastId,
        {
            status: 'SCHEDULED',
            scheduledAt,
        }
    );
    const delay = scheduledAt.getTime() - Date.now();
    try {
        const job = await podcastQueue.add(
            PodcastJobs.START_PODCAST,
            { podcastId },
            { delay }
        );
        await repo.update(podcastId, {
            schedulerJobId: job.id?.toString() ?? null,
        });
        return updatedPodcast;
    }
    catch (error) {
        await repo.update(
            podcastId,
            {
                status: 'DRAFT',
                scheduledAt: null,
            }
        );

        throw error;
    }
}

export async function cancelPodcast(
    podcastId: string,
    channelId: string,
    repo: PodcastRepository
) {
    const podcast = await getPodcastForChannel(podcastId, channelId, repo);

    if (
        podcast.status !== 'DRAFT' &&
        podcast.status !== 'SCHEDULED'
    ) {
        throw new Error(
            'Only draft or scheduled podcasts can be cancelled'
        );
    }

    return repo.update(podcastId, {
        status: 'CANCELLED',
    });
}