import { Type } from "@sinclair/typebox";
import { DeviceStateDbType } from "../../database/types.js";
import {
  TypeNullable,
  TypeStringDate,
  TypeStringEnum,
} from "../../utils/typebox.js";

export const deviceActivitySchema = Type.Object(
  {
    id: Type.Number(),
    device_id: Type.Number(),
    current_state: TypeStringEnum(DeviceStateDbType),
    current_value: TypeNullable(Type.Number()),
    current_extra_data: TypeNullable(Type.Any()),
    duration_seconds: TypeNullable(Type.Number()),
    created_at: TypeStringDate(),
    device: Type.Object({
      name: Type.String(),
    }),
  },
  {
    $id: "DeviceActivity",
    title: "DeviceActivity",
  },
);

export const deviceActivitiesGetSchema = {
  operationId: "getAllDeviceActivities",
  response: {
    200: Type.Object({
      deviceActivities: Type.Array(
        Type.Ref<typeof deviceActivitySchema>(deviceActivitySchema),
      ),
    }),
  },
} as const;
