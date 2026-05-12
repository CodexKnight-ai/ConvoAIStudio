import { buildApp } from "./app.js";
import "dotenv/config";

async function start() {
    try {
        const app = await buildApp();

        if (!process.env.PORT) {
            throw new Error("PORT environment variable is not set");
        }
        const PORT = Number(process.env.PORT)
        app.listen({
            port: PORT,
            host: "0.0.0.0",
        });

        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

start();