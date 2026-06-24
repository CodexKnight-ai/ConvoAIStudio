import '@fastify/cookie';

declare module 'fastify' {
  interface FastifyRequest {
    cookies: Record<string, string>;
    user?: {
      id: string;
      role: string;
      sessionId: string;
    };
  }
}
