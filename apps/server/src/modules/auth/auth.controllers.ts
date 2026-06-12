import {
    refreshService,
    registerService,
    loginService,
    logoutService,
    getUserById,
} from "./auth.services.js";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function refreshController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const data = request.body as {
            refreshToken: string;
            sessionId: string;
        };
        const result = await refreshService(fastify, reply, data);
        return result;
    };
}

export function registerController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const data = request.body as {
            firstName: string;
            lastName?: string;
            email: string;
            username: string;
            password: string;
        };
        const result = await registerService(fastify, reply, fastify.prisma, data);
        return result;
    };
}

export function loginController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const data = request.body as {
            email: string;
            password: string;
        };
        const result = await loginService(fastify, reply, fastify.prisma, data);
        return result;
    };
}

export function logoutController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const result = await logoutService(fastify, request, reply);
        return result;
    };
}

export function getUserByIdController(fastify: FastifyInstance) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const data = request.body as {
            userId: string;
        };
        const result = await getUserById(fastify, reply, fastify.prisma, data);
        return result;
    };
}
