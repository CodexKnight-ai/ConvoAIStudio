import { createChannelRepository } from "./channel.repository.js";
import { FastifyInstance,FastifyRequest,FastifyReply } from "fastify";
import { PrismaClient, Visibility } from "../../generated/prisma/client.js";

export async function createChannelService(
    fastify:FastifyInstance,
    reply:FastifyReply,
    request:FastifyRequest,
    data:{
        name:string,
        description:string,
        imageUrl:string,
        visibility:Visibility,
        userId:string,
    }
){
    try{
        const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const existingChannel = await createChannelRepository(fastify.prisma).findBySlug(slug);
        if(existingChannel){
            throw new Error(`Channel already exists with slug ${slug}`);
        }
        const channel = await createChannelRepository(fastify.prisma).create({
            name: data.name,
            slug,
            description: data.description,
            ownerId: data.userId,
        });
        reply.code(201).send(channel);
    }catch(error){
        if(error instanceof Error){
            throw error;
        }
        throw new Error("Failed to create channel");
    }
}

export async function updateChannelService(
    fastify:FastifyInstance,
    reply:FastifyReply,
    request:FastifyRequest,
    data:{
        channelId:string,
        name?:string,
        description?:string,
        imageUrl?:string,
        visibility?:Visibility,
    }
){
    try{
        const channelExist = await createChannelRepository(fastify.prisma).findById(data.channelId);
        if(!channelExist){
            throw new Error(`Channel does not exist with id ${data.channelId}`);
        }
        if(channelExist.ownerId !== request.user.userId){
            throw new Error(`You are not authorized to update this channel`);
        }
        const channel = await createChannelRepository(fastify.prisma).update(data.channelId,data);
        reply.code(200).send(channel);
    }catch(error){
        if(error instanceof Error){
            throw error;
        }
        throw new Error("Failed to update channel");
    }
}

export async function deleteChannelService(
    fastify:FastifyInstance,
    reply:FastifyReply,
    request:FastifyRequest,
    data:{
        channelId:string,
        userId:string,
    }
){
    try{
        const channelExist = await createChannelRepository(fastify.prisma).findById(data.channelId);
        if(!channelExist){
            throw new Error(`Channel does not exist with id ${data.channelId}`);
        }
        if(channelExist.ownerId !== request.user.userId){
            throw new Error(`You are not authorized to delete this channel`);
        }
        const channel = await createChannelRepository(fastify.prisma).delete(data.channelId);
        reply.code(200).send(channel);
    }catch(error){
        if(error instanceof Error){
            throw error;
        }
        throw new Error("Failed to delete channel");
    }
}

export async function findChannelService(
    fastify:FastifyInstance,
    reply:FastifyReply,
    request:FastifyRequest,
    data:{
        channelId:string,
    }
){
    try{
        const channelExist = await createChannelRepository(fastify.prisma).findById(data.channelId);
        if(!channelExist){
            throw new Error(`Channel does not exist with id ${data.channelId}`);
        }
        const channel = await createChannelRepository(fastify.prisma).findById(data.channelId);
        reply.code(200).send(channel);
    }catch(error){
        if(error instanceof Error){
            throw error;
        }
        throw new Error("Failed to find channel");
    }
}

export async function getMyChannelsService(
    fastify:FastifyInstance,
    reply:FastifyReply,
    request:FastifyRequest,
    data:{
        userId:string,
    }
){
    try{
        const channels = await createChannelRepository(fastify.prisma).findByOwnerId(data.userId);
        reply.code(200).send(channels);
    }catch(error){
        if(error instanceof Error){
            throw error;
        }
        throw new Error("Failed to get channels");
    }
}

export async function subscribeToChannelService(
    fastify:FastifyInstance,
    reply:FastifyReply,
    request:FastifyRequest,
    data:{
        channelId:string,
        userId:string,
    }
){
    try{
        const channelExist = await createChannelRepository(fastify.prisma).findById(data.channelId);
        if(!channelExist){
            throw new Error(`Channel does not exist with id ${data.channelId}`);
        }
        const channel = await createChannelRepository(fastify.prisma).subscribe(data.userId,data.channelId);
        reply.code(200).send(channel);
    }catch(error){
        if(error instanceof Error){
            throw error;
        }
        throw new Error("Failed to subscribe to channel");
    }
}

export async function unsubscribeFromChannelService(
    fastify:FastifyInstance,
    reply:FastifyReply,
    request:FastifyRequest,
    data:{
        channelId:string,
        userId:string,
    }
){
    try{
        const channelExist = await createChannelRepository(fastify.prisma).findById(data.channelId);
        if(!channelExist){
            throw new Error(`Channel does not exist with id ${data.channelId}`);
        }
        const channel = await createChannelRepository(fastify.prisma).unsubscribe(data.userId,data.channelId);
        reply.code(200).send(channel);
    }catch(error){
        if(error instanceof Error){
            throw error;
        }
        throw new Error("Failed to unsubscribe from channel");
    }
}

export async function getMySubscriptionsService(
    fastify:FastifyInstance,
    reply:FastifyReply,
    request:FastifyRequest,
    data:{
        userId:string,
    }
){
    try{
        const channels = await createChannelRepository(fastify.prisma).findSubscriptionsByUserId(data.userId);
        reply.code(200).send(channels);
    }catch(error){
        if(error instanceof Error){
            throw error;
        }
        throw new Error("Failed to get subscriptions");
    }
}

export async function isSubscribedService(
    fastify:FastifyInstance,
    reply:FastifyReply,
    request:FastifyRequest,
    data:{
        channelId:string,
        userId:string,
    }
){
    try{
        const channelExist = await createChannelRepository(fastify.prisma).findById(data.channelId);
        if(!channelExist){
            throw new Error(`Channel does not exist with id ${data.channelId}`);
        }
        const channel = await createChannelRepository(fastify.prisma).findSubscription(data.userId,data.channelId);
        reply.code(200).send(channel);
    }catch(error){
        if(error instanceof Error){
            throw error;
        }
        throw new Error("Failed to check subscription");
    }
}
