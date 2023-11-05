import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import fp from "fastify-plugin";

export const swaggerGen = fp(async (fastify) => {
  await fastify.register(swagger, {
    mode: "dynamic",
    openapi: {},
  });
  await fastify.register(swaggerUi, {
    routePrefix: "/documentation",
    staticCSP: true,
    transformSpecificationClone: true,
  });
});
