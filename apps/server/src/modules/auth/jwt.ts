import { FastifyInstance } from "fastify";
import { randomBytes, createHash } from "crypto";

const ACCESS_TOKEN_TTL = 60 * 15; // 15 minutes
const REFRESH_TOKEN_TTL = 60 * 60 * 24 * 7; // 7 days

interface JWTPayload {
    userId: string;
    sessionId: string;
    role: string;
    iat: number;
    exp: number;
}
function generateRandomToken() {
    return randomBytes(32).toString("hex");
}
export function generateAccessToken(fastify: FastifyInstance, payload: Omit<JWTPayload, "iat" | "exp">) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + ACCESS_TOKEN_TTL;

    const token = fastify.jwt.sign(
        {
            ...payload,
            iat,
            exp,
        },
        {
            expiresIn: `${ACCESS_TOKEN_TTL}s`,
        }
    );

    return { token, expiresAt: new Date(exp * 1000) };
}

export function generateRefreshToken(fastify: FastifyInstance) {
    const refreshToken = generateRandomToken();
    const refreshTokenHash = createHash("sha256").update(refreshToken).digest("hex");
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL * 1000);

    return {
        refreshToken,
        refreshTokenHash,
        expiresAt,
    };
}

export async function verifyAccessToken(fastify: FastifyInstance, token: string) {
    const decoded = await fastify.jwt.verify<JWTPayload>(token);
    return decoded;
}

export function verifyRefreshToken(fastify: FastifyInstance, refreshToken: string, expectedHash: string) {
    const actualHash = createHash("sha256").update(refreshToken).digest("hex");
    return actualHash === expectedHash;
}
    
