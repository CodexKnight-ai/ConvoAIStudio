import { PrismaClient, Prisma } from '../generated/prisma/client.js';

export interface CreatePodcastInput {
    title: string;
    description?: string;
    channelId: string;
    thumbnailUrl?: string;
    duration?: number;
    visibility?: 'PUBLIC' | 'PRIVATE' | 'UNLISTED';
}

export class PodcastRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(data: CreatePodcastInput) {
        return this.prisma.podcast.create({
            data: {
                title: data.title,
                description: data.description ?? '',
                thumbnailUrl: data.thumbnailUrl??'',
                channelId: data.channelId,
                duration: data.duration ?? 300,
                visibility: data.visibility ?? 'PUBLIC',
                status: 'DRAFT',
            },
        });
    }

    async findById(id: string) {
        return this.prisma.podcast.findFirst({
            where: {
                id,
                deletedAt: null,
            },
        });
    }

    async findByChannel(channelId: string) {
        return this.prisma.podcast.findMany({
            where: {
                channelId,
                deletedAt: null,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async update(
        id: string,
        data: Prisma.PodcastUpdateInput
    ) {
        return this.prisma.podcast.update({
            where: { id },
            data,
        });
    }

    async softDelete(id: string) {
        return this.prisma.podcast.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}