import type { DeviceActivityDbObject } from "../../database/types.js";

export const computeAggregatedAnalytics = (
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
  }: {
    start_date: Date;
    end_date: Date;
  },
): {
  count: number;
  on_duration: number;
  watt_seconds: number;
} => {
  let count = 0;
  let on_duration = 0;
  let watt_seconds = 0;

  const counted_device = new Set<number>();

  for (const deviceActivity of deviceActivities) {
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

      if (!counted_device.has(deviceActivity.device.id)) {
        count += 1;
        counted_device.add(deviceActivity.device.id);
      }
      on_duration += duration_sec;
      watt_seconds += duration_sec * (deviceActivity.device.wattage ?? 0);
    }
  }

  return {
    count,
    on_duration,
    watt_seconds,
  };
};
