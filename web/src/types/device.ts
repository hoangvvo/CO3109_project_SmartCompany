import {
  DeviceActivityDbObject,
  DeviceCategoryDbType,
  DeviceDbObject,
  DeviceStateDbType,
} from "@/backend/database/types";

export type Device = DeviceDbObject;
export type DeviceActivity = DeviceActivityDbObject;
export {
  DeviceCategoryDbType as DeviceCategoryType,
  DeviceStateDbType as DeviceStateType,
};
