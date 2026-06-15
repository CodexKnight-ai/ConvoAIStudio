import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Visibility } from "../../generated/prisma/client.js";
import {
    createChannelService,
    updateChannelService,
    deleteChannelService,
    findChannelService,
    getMyChannelsService,
    subscribeToChannelService,
    unsubscribeFromChannelService,
    getMySubscriptionsService,
    isSubscribedService,
} from "./channel.services.js";

export function createChannelController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const body = request.body as {
            name: string;
            description: string;
            imageUrl: string;
            visibility: Visibility;
        };
        const result = await createChannelService(fastify, reply, request, {
            ...body,
            userId: request.user.userId,
        });
        return result;
    };
}

export function updateChannelController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const { channelId } = request.params as { channelId: string };
        const body = request.body as {
            name?: string;
            description?: string;
            imageUrl?: string;
            visibility?: Visibility;
        };
        const result = await updateChannelService(fastify, reply, request, {
            ...body,
            channelId,
        });
        return result;
    };
}

export function deleteChannelController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const { channelId } = request.params as { channelId: string };
        const result = await deleteChannelService(fastify, reply, request, {
            channelId,
            userId: request.user.userId,
        });
        return result;
    };
}

export function findChannelController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const { channelId } = request.params as { channelId: string };
        const result = await findChannelService(fastify, reply, request, {
            channelId,
        });
        return result;
    };
}

export function getMyChannelsController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const result = await getMyChannelsService(fastify, reply, request, {
            userId: request.user.userId,
        });
        return result;
    };
}

export function subscribeToChannelController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const { channelId } = request.params as { channelId: string };
        const result = await subscribeToChannelService(fastify, reply, request, {
            channelId,
            userId: request.user.userId,
        });
        return result;
    };
}

export function unsubscribeFromChannelController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const { channelId } = request.params as { channelId: string };
        const result = await unsubscribeFromChannelService(fastify, reply, request, {
            channelId,
            userId: request.user.userId,
        });
        return result;
    };
}

export function getMySubscriptionsController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const result = await getMySubscriptionsService(fastify, reply, request, {
            userId: request.user.userId,
        });
        return result;
    };
}

export function isSubscribedController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const { channelId } = request.params as { channelId: string };
        const result = await isSubscribedService(fastify, reply, request, {
            channelId,
            userId: request.user.userId,
        });
        return result;
    };
}
