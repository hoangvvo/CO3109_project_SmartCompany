import fastifyCookie from "@fastify/cookie";
import { fastify } from "fastify";
import { PORT } from "./constants/environments.js";
import { authentication } from "./plugins/auth.js";
import { swaggerGen } from "./plugins/swagger.js";
import { deviceActivityRouter } from "./routes/device-activity/route.js";
import { deviceRouter } from "./routes/device/route.js";
import { userRouter } from "./routes/user/route.js";

const app = fastify();

app.register(fastifyCookie);

await app.register(authentication);

await app.register(swaggerGen);

await app.register(userRouter, {
  prefix: "/user",
});

await app.register(deviceRouter, {
  prefix: "/devices",
});

await app.register(deviceActivityRouter, {
  prefix: "/device-activities",
});

await app.listen({ port: PORT, host: "0.0.0.0" });

console.log(`Server listening on http://localhost:${PORT}
Swagger documentation on http://localhost:${PORT}/documentation`);
