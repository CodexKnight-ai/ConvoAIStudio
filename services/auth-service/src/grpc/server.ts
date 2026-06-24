import { Server, ServerCredentials } from '@grpc/grpc-js';
import { AuthServiceService } from '../generated/auth.js';
import { createAuthGrpcHandlers } from './auth.grpc.js';
import { FastifyInstance } from 'fastify';

export async function startGrpcServer(fastify: FastifyInstance): Promise<void> {
    const grpcServer = new Server();
    const handlers = createAuthGrpcHandlers(fastify);

    grpcServer.addService(AuthServiceService, handlers);

    const GRPC_PORT = process.env.GRPC_PORT || '50051';

    return new Promise((resolve, reject) => {
        grpcServer.bindAsync(
            `0.0.0.0:${GRPC_PORT}`,
            ServerCredentials.createInsecure(),
            (err: any) => {
                if (err) {
                    console.error('gRPC bind failed:', err);
                    reject(err);
                    return;
                }

                console.log(`gRPC Server running on port ${GRPC_PORT}`);
                resolve();
            }
        );
    });
}