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
        refreshController(fastify)
    );

    fastify.post(
        "/logout",
        logoutController(fastify)
    );

    fastify.get(
        "/me",
        getUserByIdController(fastify)
    );
}