import { PodcastRepository, CreatePodcastInput } from './podcast.repository.js';

async function triggerMockAIPipeline(podcastId: string, repo: PodcastRepository) {
    console.log(`[Monolith Engine] Initiating background AI multi-agent synthesis for podcast: ${podcastId}...`);
    await new Promise((resolve) => setTimeout(resolve, 15000));
    try {
        await repo.updateStatus(
            podcastId,
            'PUBLISHED',
            'https://cdn.convoai.studio/mock-generated-audio.mp3'
        );
        console.log(`[Monolith Engine] Podcast ${podcastId} AI compilation complete.`);
    } catch (error) {
        console.error(`[Monolith Engine] Background execution failed for ${podcastId}:`, error);
        await repo.updateStatus(podcastId, 'FAILED');
    }
}

export async function createPodcastWorkflow(data: CreatePodcastInput, repo: PodcastRepository) {
    const podcast = await repo.create(data);
    triggerMockAIPipeline(podcast.id, repo);
    return podcast;
}

export async function getPodcastById(id: string, repo: PodcastRepository) {
    const podcast = await repo.findById(id);
    if (!podcast) {
        throw new Error('Podcast not found');
    }
    return podcast;
}

export async function getChannelPodcasts(channelId: string, repo: PodcastRepository) {
    return repo.findByChannel(channelId);
}