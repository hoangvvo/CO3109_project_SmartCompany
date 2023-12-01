import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { UnauthorizedError } from "../../constants/errors.js";
import { deviceActivityRepository } from "../../database/device.js";
import {
  aggregatedAnalyticsGetSchema,
  rawAnalyticsGetSchema,
} from "./schema.js";
import { computeAggregatedAnalytics, computeRawAnalytics } from "./utils.js";

export const analyticsRouter: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.auth);

  fastify.get(
    "/aggregate",
    { schema: aggregatedAnalyticsGetSchema },
    async (request) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const { filter_device_ids } = request.query;

      const start_date = new Date(request.query.start_date);
      const end_date = new Date(request.query.end_date);

      const dateRange = end_date.getTime() - start_date.getTime();

      const compareStartDate = new Date(start_date.getTime() - dateRange);
      const compareEndDate = new Date(end_date.getTime() - dateRange);

      const [deviceActivities, deviceActivitiesCompare] = await Promise.all([
        deviceActivityRepository.getAllDeviceActivities({
          filter_device_ids,
          start_date,
          end_date,
        }),
        deviceActivityRepository.getAllDeviceActivities({
          filter_device_ids,
          start_date: compareStartDate,
          end_date: compareEndDate,
        }),
      ]);

      const { count, on_duration, watt_seconds, devices } =
        computeAggregatedAnalytics(deviceActivities, {
          start_date,
          end_date,
        });

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
          activity_count: deviceActivities.length,
          activity_count_compare: deviceActivitiesCompare.length,
          devices,
        },
      };
    },
  );

  fastify.get("/raw", { schema: rawAnalyticsGetSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const { filter_device_ids } = request.query;

    const start_date = new Date(request.query.start_date);
    const end_date = new Date(request.query.end_date);

    const dateRange = end_date.getTime() - start_date.getTime();

    const compareStartDate = new Date(start_date.getTime() - dateRange);
    const compareEndDate = new Date(end_date.getTime() - dateRange);

    const [deviceActivities, compareDeviceActivities] = await Promise.all([
      deviceActivityRepository.getAllDeviceActivities({
        filter_device_ids,
        start_date,
        end_date,
      }),
      deviceActivityRepository.getAllDeviceActivities({
        filter_device_ids,
        start_date: compareStartDate,
        end_date: compareEndDate,
      }),
    ]);

    const divisionMs = dateRange / 30;

    // division in milliseconds
    const data = computeRawAnalytics(deviceActivities, {
      start_date,
      end_date,
      divisionMs,
    });
    const data_compare = computeRawAnalytics(compareDeviceActivities, {
      start_date: compareStartDate,
      end_date: compareEndDate,
      divisionMs,
    });

    return {
      raw_analytics: {
        data: data.map((d, i) => ({
          ...d,
          on_duration_compare: data_compare[i].on_duration,
          watt_seconds_compare: data_compare[i].watt_seconds,
          activity_count_compare: data_compare[i].activity_count,
        })),
      },
    };
  });
};
