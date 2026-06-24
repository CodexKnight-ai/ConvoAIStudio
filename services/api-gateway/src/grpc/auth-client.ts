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
        first_name: string;
        last_name?: string|undefined;
        email: string;
        username: string;
        password: string;
    }): Promise<any> => {
        return new Promise((resolve, reject) => {
            client.register({
                firstName: data.first_name,
                lastName: data.last_name || '',
                email: data.email,
                username: data.username,
                password: data.password
            }, (err: any, response: any) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    },

    /**
     * Login user
     */
    login: (data: {
        email: string;
        password: string;
    }): Promise<any> => {
        return new Promise((resolve, reject) => {
            client.login(data, (err: any, response: any) => {
                console.log("Trying login using grpc", response);
                if (err) reject(err);
                else resolve(response);
            });
        });
    },

    /**
     * Refresh tokens
     */
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

    /**
     * Logout user
     */
    logout: (session_id: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            client.logout({ sessionId: session_id }, (err: any, response: any) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    },

    /**
     * Get current user profile
     */
    getMe: (user_id: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            client.getMe({ userId: user_id }, (err: any, response: any) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    },
};