import { FastifyInstance } from 'fastify';

export interface CreateChannelInput {
    name: string;
    slug: string;
    description: string;
    ownerId: string;
}

export interface UpdateChannelInput {
    name?: string;
    description?: string;
    bannerUrl?: string;
    profilePictureUrl?: string;
}

export class ChannelRepository {
    private prisma;

    constructor(fastify: FastifyInstance) {
        this.prisma = fastify.prisma;
    }

    async create(data: CreateChannelInput) {
        return this.prisma.$transaction(async (tx) => {
            const channel = await tx.channel.create({
                data: { ...data, subscriberCount: 1 },
            });

            await tx.channelSubscription.create({
                data: { userId: data.ownerId, channelId: channel.id },
            });

            return channel;
        });
    }

    async findById(id: string) {
        return this.prisma.channel.findUnique({ where: { id } });
    }

    async findBySlug(slug: string) {
        return this.prisma.channel.findUnique({ where: { slug } });
    }

    async findByOwnerId(ownerId: string) {
        return this.prisma.channel.findMany({ where: { ownerId } });
    }

    async update(channelId: string, data: UpdateChannelInput) {
        return this.prisma.channel.update({ where: { id: channelId }, data });
    }

    async delete(channelId: string) {
        return this.prisma.channel.delete({ where: { id: channelId } });
    }

    async findOwnerId(channelId: string) {
        return this.prisma.channel.findUnique({
            where: { id: channelId },
            select: { ownerId: true },
        });
    }

    async subscribe(userId: string, channelId: string) {
        return this.prisma.$transaction(async (tx) => {
            await tx.channelSubscription.create({ data: { userId, channelId } });
            await tx.channel.update({
                where: { id: channelId },
                data: { subscriberCount: { increment: 1 } },
            });
        });
    }

    async unsubscribe(userId: string, channelId: string) {
        return this.prisma.$transaction(async (tx) => {
            await tx.channelSubscription.delete({
                where: { userId_channelId: { userId, channelId } },
            });
            await tx.channel.update({
                where: { id: channelId },
                data: { subscriberCount: { decrement: 1 } },
            });
        });
    }

    async findSubscription(userId: string, channelId: string) {
        return this.prisma.channelSubscription.findUnique({
            where: { userId_channelId: { userId, channelId } },
        });
    }

    async findSubscriptionsByUserId(userId: string) {
        return this.prisma.channelSubscription.findMany({ where: { userId } });
    }
}