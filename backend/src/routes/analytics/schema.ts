import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";
import { DeviceCategoryDbType } from "../../database/types.js";
import {
  TypeNullable,
  TypeStringDate,
  TypeStringEnum,
} from "../../utils/typebox.js";

export const aggregatedAnalyticsSchema = Type.Object({
  on_duration: Type.Number(),
  on_duration_compare: Type.Number(),
  count: Type.Number(),
  count_compare: Type.Number(),
  watt_seconds: Type.Number(), // in watts
  watt_seconds_compare: Type.Number(), // in watts
  activity_count: Type.Number(),
  activity_count_compare: Type.Number(),
  devices: Type.Array(
    Type.Object({
      device_id: Type.Number(),
      device_name: Type.String(),
      device_description_location: TypeNullable(Type.String()),
      device_category: TypeStringEnum(DeviceCategoryDbType),
      on_duration: Type.Number(),
      watt_seconds: Type.Number(), // in watts
      activity_count: Type.Number(),
    }),
  ),
});

export const aggregatedAnalyticsGetSchema = {
  operationId: "getAggregatedAnalytics",
  querystring: Type.Object({
    filter_device_ids: Type.Optional(Type.Array(Type.Number())),
    start_date: TypeStringDate(),
    end_date: TypeStringDate(),
  }),
  response: {
    200: Type.Object({
      aggregated_analytics: aggregatedAnalyticsSchema,
    }),
  },
} satisfies FastifySchema;

export const rawAnalyticsSchema = Type.Object({
  data: Type.Array(
    Type.Object({
      timestamp: Type.Number(),
      on_duration: Type.Number(),
      on_duration_compare: Type.Number(),
      watt_seconds: Type.Number(),
      watt_seconds_compare: Type.Number(),
      activity_count: Type.Number(),
      activity_count_compare: Type.Number(),
    }),
  ),
});

export const rawAnalyticsGetSchema = {
  operationId: "getRawAnalytics",
  querystring: Type.Object({
    filter_device_ids: Type.Optional(Type.Array(Type.Number())),
    filter_device_categories: Type.Optional(Type.Array(Type.String())),
    start_date: TypeStringDate(),
    end_date: TypeStringDate(),
  }),
  response: {
    200: Type.Object({
      raw_analytics: rawAnalyticsSchema,
    }),
  },
} satisfies FastifySchema;
