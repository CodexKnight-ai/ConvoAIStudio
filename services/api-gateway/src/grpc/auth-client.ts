import { credentials } from '@grpc/grpc-js';
import { AuthServiceClient } from '../../../../packages/shared/src/proto/auth.js';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_GRPC_URL || 'localhost:50051';

const client = new AuthServiceClient(
    AUTH_SERVICE_URL,
    credentials.createInsecure()  
);

export const authGrpcClient = {
    validateToken: (token: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            client.validateToken({ token }, (err: any, response: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    },
    register: (data: {
        firstName: string;
        lastName?: string|undefined;
        email: string;
        username: string;
        password: string;
    }): Promise<any> => {
        return new Promise((resolve, reject) => {
            client.register({
                firstName: data.firstName,
                lastName: data.lastName || '',
                email: data.email,
                username: data.username,
                password: data.password
            }, (err: any, response: any) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    },
    login: (data: {
        email: string;
        password: string;
    }): Promise<any> => {
        return new Promise((resolve, reject) => {
            client.login(data, (err: any, response: any) => {
                console.log("Trying login using grpc", response);
                if (err) reject(err);
                else{
                    console.log("grpc response", response);
                    resolve(response);
                }
            });
        });
    },
    refresh: (data: {
        refresh_token: string;
        session_id: string;
    }): Promise<any> => {
        return new Promise((resolve, reject) => {
            client.refresh({
                refreshToken: data.refresh_token,
                sessionId: data.session_id
            }, (err: any, response: any) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    },
    logout: (session_id: string, refresh_token: string): Promise<any> => {
        console.log("calling grpc logout with:", session_id, refresh_token);
        return new Promise((resolve, reject) => {
            client.logout({ sessionId: session_id, refreshToken: refresh_token }, (err: any, response: any) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    },
    getMe: (user_id: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            client.getMe({ userId: user_id }, (err: any, response: any) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    },
};