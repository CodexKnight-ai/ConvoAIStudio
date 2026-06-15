import { PrismaClient } from "../../generated/prisma/client.js";

export type CreateChannelData = {
    name: string;
    slug: string;
    description: string;
    ownerId: string;
};

export type UpdateChannelData = {
    name?: string;
    description?: string;
    bannerUrl?: string;
    profilePictureUrl?: string;
};

export const createChannelRepository = (
    prisma: PrismaClient
) => ({
    create(data: CreateChannelData) {
        return prisma.$transaction(async (tx) => {
            const channel =
                await tx.channel.create({
                    data: {
                        ...data,
                        subscriberCount: 1,
                    },
                });

            await tx.channelSubscription.create({
                data: {
                    userId: data.ownerId,
                    channelId: channel.id,
                },
            });

            return channel;
        });
    },
    findById(id: string) {
        return prisma.channel.findUnique({
            where: { id },
        });
    },

    findBySlug(slug: string) {
        return prisma.channel.findUnique({
            where: { slug },
        });
    },

    findByOwnerId(ownerId: string) {
        return prisma.channel.findMany({
            where: { ownerId },
        });
    },

    update(
        channelId: string,
        data: UpdateChannelData
    ) {
        return prisma.channel.update({
            where: {
                id: channelId,
            },
            data,
        });
    },

    delete(channelId: string) {
        return prisma.channel.delete({
            where: {
                id: channelId,
            },

        });
    },

    findOwnerId(channelId: string) {
        return prisma.channel.findUnique({
            where: {
                id: channelId,
            },
            select: {
                ownerId: true,
            },
        });
    },
    subscribe(
        userId: string,
        channelId: string
    ) {
        return prisma.$transaction(async (tx) => {
            await tx.channelSubscription.create({
                data: {
                    userId,
                    channelId,
                },
            });

            await tx.channel.update({
                where: {
                    id: channelId,
                },
                data: {
                    subscriberCount: {
                        increment: 1,
                    },
                },
            });
        });
    },
    unsubscribe(
        userId: string,
        channelId: string
    ) {
        return prisma.$transaction(async (tx) => {
            await tx.channelSubscription.delete({
                where: {
                    userId_channelId: {
                        userId,
                        channelId,
                    },
                },
            });

            await tx.channel.update({
                where: {
                    id: channelId,
                },
                data: {
                    subscriberCount: {
                        decrement: 1,
                    },
                },
            });
        });
    },
    findSubscription(
        userId: string,
        channelId: string
    ) {
        return prisma.channelSubscription.findUnique({
            where: {
                userId_channelId: {
                    userId,
                    channelId,
                },
            },
        });
    },

    findSubscriptionsByUserId(userId: string) {
        return prisma.channelSubscription.findMany({
            where: {
                userId,
            },
        });
    },
});