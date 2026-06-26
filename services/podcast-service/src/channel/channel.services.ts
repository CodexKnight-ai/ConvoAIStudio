import { ChannelRepository } from './channel.repository.js';

export async function createChannel(
    repo: ChannelRepository,
    userId: string,
    data: { name: string; description: string }
) {
    if (!data) {
        throw new Error('Request body is missing', { cause: 400 });
    }

    // FIX: Destructure explicitly or fallback to safe lookup to bypass 
    // Fastify's hidden internal property descriptors
    const rawData = data as Record<string, any>;
    const name = typeof rawData.name === 'string' ? rawData.name.trim() : undefined;
    const description = typeof rawData.description === 'string' ? rawData.description.trim() : '';

    if (!name) {
        throw new Error('Channel name is required', { cause: 400 });
    }

    const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const existing = await repo.findBySlug(slug);
    if (existing) {
        throw new Error(`Channel already exists with slug ${slug}`, { cause: 409 });
    }

    // Return a clean object literal to the repo layer
    return repo.create({
        name,
        slug,
        description,
        ownerId: userId
    });
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

    // FIX: Normalize the incoming object data for clean updates
    const cleanUpdate: Record<string, any> = {};
    const rawData = data as Record<string, any>;

    if ('name' in rawData) cleanUpdate.name = rawData.name;
    if ('description' in rawData) cleanUpdate.description = rawData.description;
    if ('bannerUrl' in rawData) cleanUpdate.bannerUrl = rawData.bannerUrl;
    if ('profilePictureUrl' in rawData) cleanUpdate.profilePictureUrl = rawData.profilePictureUrl;

    return repo.update(channelId, cleanUpdate);
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