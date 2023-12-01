import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";
import { TypeStringDate } from "../../utils/typebox.js";

export const aggregatedAnalyticsSchema = Type.Object({
  on_duration: Type.Number(),
  on_duration_compare: Type.Number(),
  count: Type.Number(),
  count_compare: Type.Number(),
  watt_seconds: Type.Number(), // in watts
  watt_seconds_compare: Type.Number(), // in watts
});

export const aggregatedAnalyticsGetSchema = {
  operationId: "getAggregatedAnalytics",
  querystring: Type.Object({
    filter_device_ids: Type.Optional(Type.Array(Type.Number())),
    filter_device_categories: Type.Optional(Type.Array(Type.String())),
    start_date: TypeStringDate(),
    end_date: TypeStringDate(),
  }),
  response: {
    200: Type.Object({
      aggregated_analytics: aggregatedAnalyticsSchema,
    }),
  },
} satisfies FastifySchema;
