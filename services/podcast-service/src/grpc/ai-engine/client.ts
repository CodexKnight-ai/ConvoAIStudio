import dotenv from "dotenv";
dotenv.config();
const env = process.env;
import { initAIEngineClient } from "./ai-engine.client.js";
export const aiEngineClient = initAIEngineClient({
    host: env.AI_ENGINE_HOST || "localhost",
    port: Number(env.AI_ENGINE_PORT) || 50052,
});