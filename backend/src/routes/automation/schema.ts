import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";
import {
  AutomationConditionTypeDbType,
  DeviceStateDbType,
  LogicalOperatorDbType,
} from "../../database/types.js";
import { TypeNullable, TypeStringEnum } from "../../utils/typebox.js";

export const automationConditionSchema = Type.Object(
  {
    id: Type.Number(),
    automation_id: Type.Number(),
    condition_type: TypeStringEnum(AutomationConditionTypeDbType),
    device_id: TypeNullable(Type.Number()),
    device_state: TypeNullable(TypeStringEnum(DeviceStateDbType)),
    device_value: TypeNullable(Type.Number()),
    device_extra_data: TypeNullable(
      Type.Object(
        {},
        {
          additionalProperties: true,
        },
      ),
    ),
    cron_expression: TypeNullable(Type.String()),
  },
  {
    $id: "AutomationCondition",
    title: "Automation Condition",
  },
);

export const automationSchema = Type.Object(
  {
    id: Type.Number(),
    user_id: Type.Number(),
    name: Type.String(),
    description: TypeNullable(Type.String()),
    logical_operator: TypeStringEnum(LogicalOperatorDbType),
    conditions: Type.Optional(
      Type.Array(
        Type.Ref<typeof automationConditionSchema>(automationConditionSchema),
      ),
    ),
  },
  {
    $id: "Automation",
    title: "Automation",
  },
);

export const automationsGetSchema = {
  operationId: "getAutomations",
  response: {
    200: Type.Object({
      automations: Type.Array(
        Type.Ref<typeof automationSchema>(automationSchema),
      ),
    }),
  },
} satisfies FastifySchema;

export const automationPostSchema = {
  operationId: "createAutomation",
  body: Type.Object({
    name: Type.String(),
    description: Type.Optional(TypeNullable(Type.String())),
    logical_operator: TypeStringEnum(LogicalOperatorDbType),
  }),
  response: {
    200: Type.Object({
      automation: Type.Ref<typeof automationSchema>(automationSchema),
    }),
  },
} satisfies FastifySchema;

export const automationGetSchema = {
  operationId: "getAutomation",
  params: Type.Object({
    automationId: Type.Number(),
  }),
  response: {
    200: Type.Object({
      automation: Type.Ref<typeof automationSchema>(automationSchema),
    }),
  },
} satisfies FastifySchema;

export const automationPutSchema = {
  operationId: "updateAutomation",
  params: Type.Object({
    automationId: Type.Number(),
  }),
  body: Type.Object({
    name: Type.String(),
    description: TypeNullable(Type.String()),
    logical_operator: TypeStringEnum(LogicalOperatorDbType),
  }),
  response: {
    200: Type.Object({
      automation: Type.Ref<typeof automationSchema>(automationSchema),
    }),
  },
} satisfies FastifySchema;

export const automationDeleteSchema = {
  operationId: "deleteAutomation",
  params: Type.Object({
    automationId: Type.Number(),
  }),
  response: {
    204: Type.Null(),
  },
} satisfies FastifySchema;

export const automationConditionsPutSchema = {
  operationId: "replaceAutomationConditions",
  params: Type.Object({
    automationId: Type.Number(),
  }),
  body: Type.Object({
    conditions: Type.Array(
      Type.Object({
        condition_type: TypeStringEnum(AutomationConditionTypeDbType),
        device_id: TypeNullable(Type.Number()),
        device_state: TypeNullable(TypeStringEnum(DeviceStateDbType)),
        device_value: TypeNullable(Type.Number()),
        device_extra_data: TypeNullable(
          Type.Object(
            {},
            {
              additionalProperties: true,
            },
          ),
        ),
        cron_expression: TypeNullable(Type.String()),
      }),
    ),
  }),
  response: {
    200: Type.Object({
      conditions: Type.Array(
        Type.Ref<typeof automationConditionSchema>(automationConditionSchema),
      ),
    }),
  },
} satisfies FastifySchema;
