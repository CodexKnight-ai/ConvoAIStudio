import { FastifyInstance } from 'fastify';
import { AuthRepository } from './auth.repository.js';
import * as authController from './auth.controllers.js';

export async function authRoutes(fastify: FastifyInstance) {
    const repo = new AuthRepository(fastify);

    fastify.post<{ Body: { firstName: string; lastName?: string; email: string; username: string; password: string } }>(
        '/register',
        async (request, reply) => {
            return authController.handleRegister(request, reply, repo);
        }
    );

    fastify.post<{ Body: { email: string; password: string } }>(
        '/login',
        async (request, reply) => {
            return authController.handleLogin(request, reply, repo);
        }
    );

    fastify.post<{ Body: { refreshToken: string; sessionId: string } }>(
        '/refresh',
        { preHandler: [fastify.authenticate] },
        async (request, reply) => {
            return authController.handleRefresh(request, reply);
        }
    );

    fastify.post(
        '/logout',
        { preHandler: [fastify.authenticate] },
        async (request, reply) => {
            return authController.handleLogout(request, reply);
        }
    );

    fastify.get(
        '/me',
        { preHandler: [fastify.authenticate] },
        async (request, reply) => {
            return authController.handleGetMe(request, reply, repo);
        }
    );
}