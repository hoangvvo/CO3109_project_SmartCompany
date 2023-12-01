import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";
import {
  DeviceCategoryDbType,
  DeviceStateDbType,
} from "../../database/types.js";
import {
  TypeNullable,
  TypeStringDate,
  TypeStringEnum,
} from "../../utils/typebox.js";
import { deviceActivitySchema } from "../device-activity/schema.js";

export const deviceSchema = Type.Object(
  {
    id: Type.Number(),
    user_id: Type.Number(),
    name: Type.String(),
    path: Type.String(),
    description: TypeNullable(Type.String()),
    description_location: TypeNullable(Type.String()),
    device_category: TypeStringEnum(DeviceCategoryDbType),
    created_at: TypeStringDate(),
    current_state: TypeNullable(TypeStringEnum(DeviceStateDbType)),
    current_value: TypeNullable(Type.Number()),
    current_extra_data: TypeNullable(
      Type.Object(
        {},
        {
          additionalProperties: true,
        },
      ),
    ),
  },
  {
    $id: "Device",
    title: "Device",
  },
);

export const devicesGetSchema = {
  operationId: "getDevices",
  response: {
    200: Type.Object({
      devices: Type.Array(Type.Ref<typeof deviceSchema>(deviceSchema)),
    }),
  },
} satisfies FastifySchema;

export const devicesPostSchema = {
  operationId: "createDevice",
  body: Type.Object({
    name: Type.String(),
    path: Type.String(),
    description: Type.Optional(TypeNullable(Type.String())),
    description_location: Type.Optional(TypeNullable(Type.String())),
    device_category: TypeStringEnum(DeviceCategoryDbType),
    current_value: TypeNullable(Type.Number()),
    wattage: TypeNullable(Type.Number()),
  }),
  response: {
    200: Type.Object({
      device: Type.Ref<typeof deviceSchema>(deviceSchema),
    }),
  },
} satisfies FastifySchema;

export const deviceGetSchema = {
  operationId: "getDevice",
  params: Type.Object({
    deviceId: Type.Number(),
  }),
  response: {
    200: Type.Object({
      device: Type.Ref<typeof deviceSchema>(deviceSchema),
    }),
  },
} satisfies FastifySchema;

export const devicePutSchema = {
  operationId: "updateDevice",
  params: Type.Object({
    deviceId: Type.Number(),
  }),
  body: Type.Object({
    name: Type.Optional(Type.String()),
    path: Type.Optional(Type.String()),
    description: Type.Optional(TypeNullable(Type.String())),
    description_location: Type.Optional(TypeNullable(Type.String())),
    device_category: Type.Optional(TypeStringEnum(DeviceCategoryDbType)),
    current_value: TypeNullable(Type.Number()),
    wattage: TypeNullable(Type.Number()),
  }),
  response: {
    200: Type.Object({
      device: Type.Ref<typeof deviceSchema>(deviceSchema),
    }),
  },
} satisfies FastifySchema;

export const deviceDeleteSchema = {
  operationId: "deleteDevice",
  params: Type.Object({
    deviceId: Type.Number(),
  }),
  response: {
    204: Type.Null(),
  },
} satisfies FastifySchema;

export const deviceActivitiesGetSchema = {
  operationId: "getDeviceActivities",
  params: Type.Object({
    deviceId: Type.Number(),
  }),
  response: {
    200: Type.Object({
      deviceActivities: Type.Array(
        Type.Ref<typeof deviceActivitySchema>(deviceActivitySchema),
      ),
    }),
  },
} satisfies FastifySchema;

export const deviceStatePostSchema = {
  operationId: "setDeviceState",
  params: Type.Object({
    deviceId: Type.Number(),
  }),
  body: Type.Object({
    state: TypeStringEnum(DeviceStateDbType),
    value: TypeNullable(Type.Number()),
  }),
  response: {
    204: Type.Null(),
  },
} satisfies FastifySchema;
