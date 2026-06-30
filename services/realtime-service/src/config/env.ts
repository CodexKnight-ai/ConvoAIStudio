import dotenv from "dotenv";
dotenv.config();
export const config = {
    PORT: Number(process.env.PORT || 4003),
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
};
