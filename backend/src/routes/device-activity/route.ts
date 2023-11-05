import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { UnauthorizedError } from "../../constants/errors.js";
import { deviceActivityRepository } from "../../database/device.js";
import { deviceActivitiesGetSchema } from "./schema.js";

export const deviceActivityRouter: FastifyPluginAsyncTypebox = async (
  fastify,
) => {
  fastify.addHook("onRequest", fastify.auth);

  fastify.get("/", { schema: deviceActivitiesGetSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const deviceActivities =
      await deviceActivityRepository.getAllDeviceActivities();

    return { deviceActivities };
  });
};
