import fastifyCookie from "@fastify/cookie";
import { fastify } from "fastify";
import { PORT } from "./constants/environments.js";
import { registerMQTTHandler } from "./mqtt/handler.js";
import { authentication } from "./plugins/auth.js";
import { schemaSetup } from "./plugins/schema.js";
import { analyticsRouter } from "./routes/analytics/route.js";
import { automationRouter } from "./routes/automation/route.js";
import { deviceActivityRouter } from "./routes/device-activity/route.js";
import { deviceRouter } from "./routes/device/route.js";
import { userRouter } from "./routes/user/route.js";

const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
  disableRequestLogging: true,
});

app.register(fastifyCookie);

await app.register(authentication);

await app.register(schemaSetup);

await app.register(userRouter, {
  prefix: "/user",
});

await app.register(deviceRouter, {
  prefix: "/devices",
});

await app.register(deviceActivityRouter, {
  prefix: "/device-activities",
});

await app.register(automationRouter, {
  prefix: "/automations",
});

await app.register(analyticsRouter, {
  prefix: "/analytics",
});

app.setErrorHandler(function (error, request, reply) {
  this.log.error(error);
  reply.send(error);
});

registerMQTTHandler();

await app.listen({ port: PORT, host: "0.0.0.0" });

console.log(`Server listening on http://localhost:${PORT}
Swagger documentation on http://localhost:${PORT}/documentation`);
