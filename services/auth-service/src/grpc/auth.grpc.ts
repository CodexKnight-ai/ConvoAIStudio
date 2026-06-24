import { ServerUnaryCall, sendUnaryData, status } from '@grpc/grpc-js';
import * as authService from '../auth/auth.services.js';
import { AuthRepository } from '../auth/auth.repository.js';
import { verifyAccessToken } from '../auth/jwt.js';
import { FastifyInstance } from 'fastify';

function createStubReply() {
    return {
        setCookie: () => {},
        clearCookie: () => {},
        code: () => {},
    } as any;
}

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
                const stubReply = createStubReply();
                const result = await authService.register(fastify, stubReply, repo, {
                    firstName: call.request.firstName,
                    lastName: call.request.lastName,
                    email: call.request.email,
                    username: call.request.username,
                    password: call.request.password,
                });

                callback(null, {
                    userId: result.user.id,
                    username: result.user.username,
                    email: result.user.email,
                    role: result.user.role,
                    accessTokenExpiresAt: result.accessTokenExpiresAt,
                    refreshTokenExpiresAt: result.refreshTokenExpiresAt,
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
            console.log("Login gRPC handler called", call.request);
            try {
                const stubReply = createStubReply();
                const result = await authService.login(fastify, stubReply, repo, {
                    email: call.request.email,
                    password: call.request.password,
                });

                callback(null, {
                    userId: result.user.id,
                    username: result.user.username,
                    email: result.user.email,
                    role: result.user.role,
                    accessTokenExpiresAt: result.accessTokenExpiresAt,
                    refreshTokenExpiresAt: result.refreshTokenExpiresAt,
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
                const stubReply = createStubReply();
                const result = await authService.refresh(fastify, stubReply, {
                    refreshToken: call.request.refreshToken,
                    sessionId: call.request.sessionId,
                });

                callback(null, {
                    accessTokenExpiresAt: result.accessTokenExpiresAt,
                    refreshTokenExpiresAt: result.refreshTokenExpiresAt,
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
                const stubReply = createStubReply();
                const fakeRequest = {
                    cookies: {
                        refreshToken: '',
                        sessionId: call.request.sessionId,
                    },
                } as any;

                await authService.logout(fastify, fakeRequest, stubReply);

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
                const stubReply = createStubReply();
                const user = await authService.getMe(stubReply, repo, call.request.userId);
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