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

    const { filter_device_ids } = request.query;

    const start_date = request.query?.start_date
      ? new Date(request.query.start_date)
      : undefined;
    const end_date = request.query?.end_date
      ? new Date(request.query?.end_date)
      : undefined;

    const deviceActivities =
      await deviceActivityRepository.getAllDeviceActivities({
        start_date,
        end_date,
        filter_device_ids,
      });

    return { deviceActivities };
  });
};
