import { ChannelRepository } from './channel.repository.js';

export async function createChannel(
    repo: ChannelRepository,
    userId: string,
    data: { name: string; description: string }
) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const existing = await repo.findBySlug(slug);
    if (existing) {
        throw new Error(`Channel already exists with slug ${slug}`, { cause: 409 });
    }

    return repo.create({ name: data.name, slug, description: data.description, ownerId: userId });
}

export async function updateChannel(
    repo: ChannelRepository,
    userId: string,
    channelId: string,
    data: { name?: string; description?: string; bannerUrl?: string; profilePictureUrl?: string }
) {
    const channel = await repo.findById(channelId);
    if (!channel) {
        throw new Error(`Channel not found`, { cause: 404 });
    }
    if (channel.ownerId !== userId) {
        throw new Error('Forbidden', { cause: 403 });
    }

    return repo.update(channelId, data);
}

export async function deleteChannel(repo: ChannelRepository, userId: string, channelId: string) {
    const channel = await repo.findById(channelId);
    if (!channel) {
        throw new Error('Channel not found', { cause: 404 });
    }
    if (channel.ownerId !== userId) {
        throw new Error('Forbidden', { cause: 403 });
    }

    return repo.delete(channelId);
}

export async function findChannel(repo: ChannelRepository, channelId: string) {
    const channel = await repo.findById(channelId);
    if (!channel) {
        throw new Error('Channel not found', { cause: 404 });
    }
    return channel;
}

export async function getMyChannels(repo: ChannelRepository, userId: string) {
    return repo.findByOwnerId(userId);
}

export async function subscribeToChannel(repo: ChannelRepository, userId: string, channelId: string) {
    const channel = await repo.findById(channelId);
    if (!channel) {
        throw new Error('Channel not found', { cause: 404 });
    }
    return repo.subscribe(userId, channelId);
}

export async function unsubscribeFromChannel(repo: ChannelRepository, userId: string, channelId: string) {
    const channel = await repo.findById(channelId);
    if (!channel) {
        throw new Error('Channel not found', { cause: 404 });
    }
    return repo.unsubscribe(userId, channelId);
}

export async function getMySubscriptions(repo: ChannelRepository, userId: string) {
    return repo.findSubscriptionsByUserId(userId);
}

export async function isSubscribed(repo: ChannelRepository, userId: string, channelId: string) {
    const channel = await repo.findById(channelId);
    if (!channel) {
        throw new Error('Channel not found', { cause: 404 });
    }
    return repo.findSubscription(userId, channelId);
}
