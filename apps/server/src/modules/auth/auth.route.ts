import type { FastifyInstance } from "fastify";
import {
    registerController,
    loginController,
    refreshController,
    logoutController,
    getUserByIdController,
} from "./auth.controllers.js";

export async function authRoutes(
    fastify: FastifyInstance
) {
    fastify.post(
        "/register",
        registerController(fastify)
    );

    fastify.post(
        "/login",
        loginController(fastify)
    );

    fastify.post(
        "/refresh",
        {
            preHandler:[fastify.authenticate]
        },
        refreshController(fastify)
    );

    fastify.post(
        "/logout",
        {
            preHandler:[fastify.authenticate]
        },
        logoutController(fastify)
    );

    fastify.get(
        "/me",
        {
            preHandler:[fastify.authenticate]
        },
        getUserByIdController(fastify)
    );
}