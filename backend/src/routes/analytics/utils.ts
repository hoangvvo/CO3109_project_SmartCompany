import type {
  DeviceActivityDbObject,
  DeviceCategoryDbType,
} from "../../database/types.js";

export const computeAggregatedAnalytics = (
  deviceActivities: (DeviceActivityDbObject & {
    device: {
      id: number;
      name: string;
      wattage: number | null;
      description_location: string | null;
      device_category: DeviceCategoryDbType;
    };
  })[],
  {
    start_date,
    end_date,
  }: {
    start_date: Date;
    end_date: Date;
  },
) => {
  let on_duration = 0;
  let watt_seconds = 0;

  const devices = new Map<
    number,
    {
      device_id: number;
      device_name: string;
      device_description_location: string | null;
      device_category: string;
      on_duration: number;
      watt_seconds: number;
      activity_count: number;
    }
  >();

  for (const deviceActivity of deviceActivities) {
    let device = devices.get(deviceActivity.device.id);

    if (!device) {
      device = {
        device_id: deviceActivity.device.id,
        device_name: deviceActivity.device.name,
        device_description_location: deviceActivity.device.description_location,
        device_category: deviceActivity.device.device_category,
        on_duration: 0,
        watt_seconds: 0,
        activity_count: 1,
      };
      devices.set(deviceActivity.device.id, device);
    }

    device.activity_count += 1;

    if (deviceActivity.current_state === "on") {
      const started_at_ms = Math.max(
        start_date.getTime(),
        deviceActivity.started_at.getTime(),
      );
      const ended_at_ms = Math.min(
        end_date.getTime(),
        deviceActivity.ended_at?.getTime() ?? Date.now(),
      );
      const duration_sec = Math.round((ended_at_ms - started_at_ms) / 1000);

      const current_watt_seconds =
        duration_sec * (deviceActivity.device.wattage ?? 0);

      device.on_duration += duration_sec;
      on_duration += duration_sec;

      device.watt_seconds += current_watt_seconds;
      watt_seconds += current_watt_seconds;
    }
  }

  return {
    count: devices.size,
    on_duration,
    watt_seconds,
    devices: [...devices.values()],
  };
};

export const computeRawAnalytics = (
  deviceActivities: (DeviceActivityDbObject & {
    device: {
      id: number;
      name: string;
      wattage: number | null;
    };
  })[],
  {
    start_date,
    end_date,
    divisionMs,
  }: {
    start_date: Date;
    end_date: Date;
    divisionMs: number;
  },
) => {
  const data: {
    timestamp: number;
    on_duration: number;
    watt_seconds: number;
    activity_count: number;
  }[] = [];

  let current_timestamp = start_date.getTime();

  while (current_timestamp < end_date.getTime()) {
    let on_duration = 0;
    let watt_seconds = 0;
    let activity_count = 0;

    for (const deviceActivity of deviceActivities) {
      if (
        deviceActivity.started_at.getTime() <= current_timestamp &&
        (deviceActivity.ended_at?.getTime() ?? Date.now()) >=
          current_timestamp + divisionMs
      ) {
        activity_count += 1;

        if (deviceActivity.current_state === "on") {
          const started_at_ms = Math.max(
            current_timestamp,
            deviceActivity.started_at.getTime(),
          );
          const ended_at_ms = Math.min(
            current_timestamp + divisionMs,
            deviceActivity.ended_at?.getTime() ?? Date.now(),
          );
          const duration_sec = Math.round((ended_at_ms - started_at_ms) / 1000);

          const current_watt_seconds =
            duration_sec * (deviceActivity.device.wattage ?? 0);

          on_duration += duration_sec;
          watt_seconds += current_watt_seconds;
        }
      }
    }

    data.push({
      timestamp: current_timestamp,
      on_duration,
      watt_seconds,
      activity_count,
    });

    current_timestamp += divisionMs;
  }

  return data;
};
