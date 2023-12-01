import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import envSchema from "env-schema";

const envSchemaSchema = Type.Object({
  DATABASE_URL: Type.String(),
  BROKER_URL: Type.String(),
  PORT: Type.Number(),
});

const { BROKER_URL, DATABASE_URL, PORT } = envSchema<
  Static<typeof envSchemaSchema>
>({
  schema: envSchemaSchema,
});

export { BROKER_URL, DATABASE_URL, PORT };
