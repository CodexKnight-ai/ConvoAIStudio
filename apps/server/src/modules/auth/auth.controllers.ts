import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthRepository } from './auth.repository.js';
import * as authService from './auth.services.js';

export async function handleRegister(
    request: FastifyRequest<{ Body: { firstName: string; lastName?: string; email: string; username: string; password: string } }>,
    reply: FastifyReply,
    repo: AuthRepository
) {
    try {
        return await authService.register(request.server, reply, repo, request.body);
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}

export async function handleLogin(
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply,
    repo: AuthRepository
) {
    try {
        return await authService.login(request.server, reply, repo, request.body);
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}

export async function handleRefresh(
    request: FastifyRequest<{ Body: { refreshToken: string; sessionId: string } }>,
    reply: FastifyReply
) {
    try {
        return await authService.refresh(request.server, reply, request.body);
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}

export async function handleLogout(request: FastifyRequest, reply: FastifyReply) {
    try {
        return await authService.logout(request.server, request, reply);
    } catch (error: any) {
        const status = typeof error.cause === 'number' ? error.cause : 500;
        return reply.code(status).send({ error: error.message });
    }
}

export async function handleGetMe(request: FastifyRequest, reply: FastifyReply, repo: AuthRepository) {
    try {
        return await authService.getMe(reply, repo, request.user.userId);
    } catch (error: any) {
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
}
