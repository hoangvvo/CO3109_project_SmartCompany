import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { NotFoundError, UnauthorizedError } from "../../constants/errors.js";
import {
  deviceActivityRepository,
  deviceRepository,
} from "../../database/device.js";
import { DeviceStateDbType } from "../../database/types.js";
import { mqttClient } from "../../mqtt/client.js";
import {
  deviceActivitiesGetSchema,
  deviceDeleteSchema,
  deviceGetSchema,
  devicePutSchema,
  deviceStatePostSchema,
  devicesGetSchema,
  devicesPostSchema,
} from "./schema.js";

export const deviceRouter: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.auth);

  fastify.get("/", { schema: devicesGetSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const devices = await deviceRepository.getAllDevices();

    return { devices };
  });

  fastify.post("/", { schema: devicesPostSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const { name, path, description, description_location, device_category } =
      request.body;

    const createdDevice = await deviceRepository.createDevice({
      user_id: request.user.id,
      name,
      path,
      description: description ?? null,
      description_location: description_location ?? null,
      device_category,
      current_state: DeviceStateDbType.OFF,
      current_value: null,
      current_extra_data: null,
    });

    return { device: createdDevice };
  });

  fastify.get("/:deviceId", { schema: deviceGetSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const device = await deviceRepository.getDeviceById(
      request.params.deviceId,
    );

    if (!device) {
      throw new NotFoundError();
    }

    return { device };
  });

  fastify.put("/:deviceId", { schema: devicePutSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const { name, path, description, description_location, device_category } =
      request.body;

    const device = await deviceRepository.getDeviceById(
      request.params.deviceId,
    );

    if (!device) {
      throw new NotFoundError();
    }

    const updatedDevice = await deviceRepository.updateDevice({
      ...device,
      ...(name !== undefined && { name }),
      ...(path !== undefined && { path }),
      ...(description !== undefined && { description }),
      ...(description_location !== undefined && { description_location }),
      ...(device_category !== undefined && { device_category }),
    });

    return { device: updatedDevice };
  });

  fastify.delete(
    "/:deviceId",
    { schema: deviceDeleteSchema },
    async (request) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const device = await deviceRepository.getDeviceById(
        request.params.deviceId,
      );

      if (!device) {
        throw new NotFoundError();
      }

      await deviceRepository.deleteDeviceById(request.params.deviceId);

      return null;
    },
  );

  fastify.get(
    "/:deviceId/activities",
    { schema: deviceActivitiesGetSchema },
    async (request) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const device = await deviceRepository.getDeviceById(
        request.params.deviceId,
      );

      if (!device) {
        throw new NotFoundError();
      }

      const deviceActivities =
        await deviceActivityRepository.getAllDeviceActivitiesByDeviceId(
          device.id,
        );

      return { deviceActivities: deviceActivities };
    },
  );

  fastify.post(
    "/:deviceId/state",
    { schema: deviceStatePostSchema },
    async (request) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const device = await deviceRepository.getDeviceById(
        request.params.deviceId,
      );

      if (!device) {
        throw new NotFoundError();
      }

      const { state, value } = request.body;

      mqttClient.publish(
        "device_state_set",
        JSON.stringify({
          path: device.path,
          state,
          value,
        }),
      );

      return null;
    },
  );
};
