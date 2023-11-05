import {
  deviceActivityRepository,
  deviceRepository,
} from "../database/device.js";
import type { DeviceStateDbType } from "../database/types.js";

export const handleStateMessage = async (topic: string, message: string) => {
  if (topic !== "device_state_changed") {
    return;
  }

  const { path, state, value, extra_data } = JSON.parse(message) as {
    path: string;
    state: DeviceStateDbType;
    value: number;
    extra_data: any;
  };

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
      duration_seconds: Math.floor(
        (Date.now() - lastActivity.created_at.getTime()) / 1000,
      ),
    });
  }

  const createdActivity = await deviceActivityRepository.createDeviceActivity({
    device_id: device.id,
    current_state: state,
    current_value: value,
    current_extra_data: extra_data,
    duration_seconds: null,
  });

  console.log("mqtt: created activity", createdActivity);

  await deviceRepository.updateDevice({
    ...device,
    current_state: state,
    current_value: value,
    current_extra_data: extra_data,
  });
};
