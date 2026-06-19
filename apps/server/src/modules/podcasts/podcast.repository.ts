import { FastifyInstance } from 'fastify';

export interface CreatePodcastInput {
    title: string;
    description?: string;
    channelId: string;
    visibility?: 'PUBLIC' | 'PRIVATE' | 'UNLISTED';
}

export class PodcastRepository {
    private prisma;

    constructor(fastify: FastifyInstance) {
        this.prisma = fastify.prisma;
    }

    async create(data: CreatePodcastInput) {
        return this.prisma.podcast.create({
            data: {
                title: data.title,
                description: data.description ?? '',
                channelId: data.channelId,
                visibility: data.visibility ?? 'PUBLIC',
                status: 'PROCESSING',
            },
        });
    }

    async findById(id: string) {
        return this.prisma.podcast.findUnique({
            where: { id },
        });
    }

    async updateStatus(id: string, status: 'PUBLISHED' | 'FAILED', audioUrl?: string) {
        return this.prisma.podcast.update({
            where: { id },
            data: { status, audioUrl },
        });
    }

    async findByChannel(channelId: string) {
        return this.prisma.podcast.findMany({
            where: { channelId },
            orderBy: { createdAt: 'desc' },
        });
    }
}