import Fastify from "fastify";

export async function buildApp() {
    const app = Fastify();

    app.get("/health", async () => {
        return {
            status: "ok",
        };
    });

    return app;
}