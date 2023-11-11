import type { DeviceStateDbType } from "../database/types.js";

export interface DeviceStateChangedPayload {
  path: string;
  state: DeviceStateDbType;
  value: number | null;
  extra_data: any;
}

export interface DeviceStateSetPayload {
  path: string;
  state: DeviceStateDbType;
  value: number | null;
}
