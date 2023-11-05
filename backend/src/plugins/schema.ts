import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import fp from "fastify-plugin";
import { deviceActivitySchema } from "../routes/device-activity/schema.js";
import { deviceSchema } from "../routes/device/schema.js";
import { userSchema } from "../routes/user/schema.js";

export const schemaSetup = fp(async (fastify) => {
  await fastify.register(swagger, {
    mode: "dynamic",
    openapi: {},
    refResolver: {
      buildLocalReference(json) {
        return json.$id as string;
      },
    },
  });
  await fastify.register(swaggerUi, {
    routePrefix: "/documentation",
    staticCSP: true,
    transformSpecificationClone: true,
  });
  fastify.addSchema(userSchema);
  fastify.addSchema(deviceSchema);
  fastify.addSchema(deviceActivitySchema);
});
