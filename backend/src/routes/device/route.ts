import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { NotFoundError, UnauthorizedError } from "../../constants/errors.js";
import {
  deviceActivityRepository,
  deviceRepository,
} from "../../database/device.js";
import { DeviceStateDbType } from "../../database/types.js";
import { mqttClient } from "../../mqtt/client.js";
import { MQTTTopic } from "../../mqtt/constants.js";
import type { DeviceStateSetPayload } from "../../mqtt/types.js";
import { StateSetTimeoutError } from "./error.js";
import {
  deviceActivitiesGetSchema,
  deviceDeleteSchema,
  deviceGetSchema,
  devicePutSchema,
  deviceStatePostSchema,
  devicesGetSchema,
  devicesPostSchema,
} from "./schema.js";

const DEVICE_CHANGE_TIMEOUT = 7000;

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

    const {
      name,
      path,
      description,
      description_location,
      device_category,
      current_value,
      wattage,
    } = request.body;

    const createdDevice = await deviceRepository.createDevice({
      user_id: request.user.id,
      name,
      path,
      description: description ?? null,
      description_location: description_location ?? null,
      device_category,
      current_state: DeviceStateDbType.OFF,
      current_value,
      current_extra_data: null,
      wattage: wattage ?? null,
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

    const {
      name,
      path,
      description,
      description_location,
      device_category,
      current_value,
      wattage,
    } = request.body;

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
      ...(current_value !== undefined && { current_value }),
      ...(wattage !== undefined && { wattage }),
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

      let removeListener: (() => void) | undefined;

      const promise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new StateSetTimeoutError());
        }, DEVICE_CHANGE_TIMEOUT);

        const listener = (topic: string, message: Buffer) => {
          if (topic !== MQTTTopic.DeviceStateChanged) {
            return;
          }
          const {
            path,
            state: newState,
            value: newValue,
          } = JSON.parse(message.toString()) as DeviceStateSetPayload;

          if (path !== device.path) {
            return;
          }

          clearTimeout(timeout);

          resolve({ newState, newValue });
        };
        mqttClient.on("message", listener);

        removeListener = () => mqttClient.off("message", listener);
      });

      const setPayload: DeviceStateSetPayload = {
        path: device.path,
        state,
        value,
      };

      mqttClient.publish(MQTTTopic.DeviceStateSet, JSON.stringify(setPayload));

      return promise.then(() => null).finally(removeListener);
    },
  );
};
