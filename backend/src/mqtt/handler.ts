import {
  deviceActivityRepository,
  deviceRepository,
} from "../database/device.js";
import { mqttClient } from "./client.js";
import { MQTTTopic } from "./constants.js";
import type { DeviceStateChangedPayload } from "./types.js";

export const handleStateMessage = async (topic: string, message: string) => {
  if (topic !== "device_state_changed") {
    return;
  }

  const { path, state, value, extra_data } = JSON.parse(
    message,
  ) as DeviceStateChangedPayload;

  const device = await deviceRepository.getDeviceByPath(path);

  if (!device) {
    console.error(`mqtt: Device with path ${path} not found`);
    return;
  }

  const lastActivity = await deviceActivityRepository.getLastDeviceActivityById(
    device.id,
  );

  if (lastActivity) {
    // update last activity with duration
    await deviceActivityRepository.updateDeviceActivity({
      ...lastActivity,
      ended_at: new Date(),
    });
  }

  const createdActivity = await deviceActivityRepository.createDeviceActivity({
    device_id: device.id,
    current_state: state,
    current_value: value,
    current_extra_data: extra_data,
    started_at: new Date(),
    ended_at: null,
  });

  console.log("mqtt: created activity", createdActivity);

  await deviceRepository.updateDevice({
    ...device,
    current_state: state,
    current_value: value,
    current_extra_data: extra_data,
  });
};

export function registerMQTTHandler() {
  console.log("mqtt: registering handler");
  mqttClient.on("message", (topic, message) => {
    console.log(`MQTT client message: ${topic}`, message.toString());
    handleStateMessage(topic, message.toString());
  });

  mqttClient.subscribe(MQTTTopic.DeviceStateSet);
  mqttClient.subscribe(MQTTTopic.DeviceStateChanged);
  console.log("mqtt: handler registered");
}
