import { ServerUnaryCall, sendUnaryData, status } from '@grpc/grpc-js';
import * as authService from '../auth/auth.services.js';
import { AuthRepository } from '../auth/auth.repository.js';
import { verifyAccessToken } from '../auth/jwt.js';
import { FastifyInstance } from 'fastify';


export function createAuthGrpcHandlers(fastify: FastifyInstance) {
    const repo = new AuthRepository(fastify);

    return {
        // ──────────────────────────────────────────────
        // ValidateToken
        // ──────────────────────────────────────────────
        validateToken: async (call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) => {
            try {
                const token = call.request.token;
                const payload = await verifyAccessToken(fastify, token);

                callback(null, {
                    valid: true,
                    userId: payload.userId,
                    sessionId: payload.sessionId || '',
                    roles: [payload.role],
                    expiresAt: payload.exp ? payload.exp * 1000 : Date.now() + 900000,
                });
            } catch (err: any) {
                callback(null, {
                    valid: false,
                    error: err.message || 'Invalid or expired token'
                });
            }
        },
        // ──────────────────────────────────────────────
        // Register
        // ──────────────────────────────────────────────
        register: async (call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) => {
            try {
                const result = await authService.register(fastify, repo, {
                    firstName: call.request.firstName,
                    lastName: call.request.lastName,
                    email: call.request.email,
                    username: call.request.username,
                    password: call.request.password,
                });

                console.log('grpc register result:', JSON.stringify(result, null, 2));
                callback(null, {
                    userId: result.user.id,
                    username: result.user.username,
                    email: result.user.email,
                    role: result.user.role,
                    firstName: result.user.firstName || '',
                    lastName: result.user.lastName || '',
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken,
                    sessionId: result.sessionId,
                    accessTokenExpiresAt: result.accessTokenExpiresAt.getTime(),
                    refreshTokenExpiresAt: result.refreshTokenExpiresAt.getTime(),
                });
            } catch (err: any) {
                callback({
                    code: status.INVALID_ARGUMENT,
                    details: err.message || 'Registration failed'
                });
            }
        },

        // ──────────────────────────────────────────────
        // Login
        // ──────────────────────────────────────────────
        login: async (call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) => {
            try {
                const result = await authService.login(fastify, repo, {
                    email: call.request.email,
                    password: call.request.password,
                });
                // console.log('USER: ', result.user);
                callback(null, {
                    userId: result.user.id,
                    username: result.user.username,
                    email: result.user.email,
                    role: result.user.role,
                    firstName: result.user.firstName || '',
                    lastName: result.user.lastName || '',
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken,
                    sessionId: result.sessionId,
                    accessTokenExpiresAt: result.accessTokenExpiresAt.getTime(),
                    refreshTokenExpiresAt: result.refreshTokenExpiresAt.getTime(),
                });

            } catch (err: any) {
                callback({
                    code: status.UNAUTHENTICATED,
                    details: err.message || 'Login failed'
                });
            }
        },

        // ──────────────────────────────────────────────
        // Refresh
        // ──────────────────────────────────────────────
        refresh: async (call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) => {
            try {
                const result = await authService.refresh(fastify, {
                    refreshToken: call.request.refreshToken,
                    sessionId: call.request.sessionId,
                });

                callback(null, {
                    accessTokenExpiresAt: result.accessTokenExpiresAt.getTime(),
                    refreshTokenExpiresAt: result.refreshTokenExpiresAt.getTime(),
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken,
                    sessionId: result.sessionId,
                });
            } catch (err: any) {
                callback({
                    code: status.UNAUTHENTICATED,
                    details: err.message || 'Refresh failed'
                });
            }
        },

        // ──────────────────────────────────────────────
        // Logout
        // ──────────────────────────────────────────────
        logout: async (call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) => {
            try {
                console.log('grpc logout request:', call.request);
                await authService.logout(fastify, {
                    refreshToken: call.request.refreshToken,
                    sessionId: call.request.sessionId,
                });

                callback(null, { success: true });
            } catch (err: any) {
                callback({
                    code: status.INTERNAL,
                    details: err.message || 'Logout failed'
                });
            }
        },

        // ──────────────────────────────────────────────
        // GetMe
        // ──────────────────────────────────────────────
        getMe: async (call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) => {
            try {
                const user = await authService.getMe(repo, call.request.userId);
                if (!user) {
                    callback({
                        code: status.NOT_FOUND,
                        details: 'User not found'
                    });
                    return;
                }

                callback(null, {
                    userId: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                });
            } catch (err: any) {
                callback({
                    code: status.INTERNAL,
                    details: err.message || 'Failed to fetch user'
                });
            }
        },
    };
}