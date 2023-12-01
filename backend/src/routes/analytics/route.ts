import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { UnauthorizedError } from "../../constants/errors.js";
import { deviceActivityRepository } from "../../database/device.js";
import { aggregatedAnalyticsGetSchema } from "./schema.js";
import { computeAggregatedAnalytics } from "./utils.js";

export const analyticsRouter: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.auth);

  fastify.get(
    "/aggregate",
    { schema: aggregatedAnalyticsGetSchema },
    async (request) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const { filter_device_ids, filter_device_categories } = request.query;

      const start_date = new Date(request.query.start_date);
      const end_date = new Date(request.query.end_date);

      const dateRange = end_date.getTime() - start_date.getTime();

      const compareStartDate = new Date(start_date.getTime() - dateRange);
      const compareEndDate = new Date(end_date.getTime() - dateRange);

      const [deviceActivities, deviceActivitiesCompare] = await Promise.all([
        deviceActivityRepository.getAllDeviceActivities({
          filter_device_ids,
          filter_device_categories,
          start_date,
          end_date,
        }),
        deviceActivityRepository.getAllDeviceActivities({
          filter_device_ids,
          filter_device_categories,
          start_date: compareStartDate,
          end_date: compareEndDate,
        }),
      ]);

      const { count, on_duration, watt_seconds } = computeAggregatedAnalytics(
        deviceActivities,
        {
          start_date,
          end_date,
        },
      );

      const {
        count: count_compare,
        on_duration: on_duration_compare,
        watt_seconds: watt_seconds_compare,
      } = computeAggregatedAnalytics(deviceActivitiesCompare, {
        start_date: compareStartDate,
        end_date: compareEndDate,
      });

      return {
        aggregated_analytics: {
          count,
          on_duration,
          watt_seconds,
          count_compare,
          on_duration_compare,
          watt_seconds_compare,
        },
      };
    },
  );
};
