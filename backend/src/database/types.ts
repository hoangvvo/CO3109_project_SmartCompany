export interface UserDbObject {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  image_url: string | null;
  created_at: Date;
}

export interface AppSessionDbObject {
  id: number;
  user_id: number;
  token: string;
  created_at: Date;
  expires_at: Date;
}

export enum DeviceCategoryDbType {
  LIGHT = "light",
  THERMOSTAT = "thermostat",
  DOOR = "door",
  AIR_CONDITIONER = "air_conditioner",
  FAN = "fan",
}

export enum DeviceStateDbType {
  ON = "on",
  OFF = "off",
}

export interface DeviceDbObject {
  id: number;
  user_id: number;
  name: string;
  /**
   * Logical path to the device, such as the port number.
   */
  path: string;
  description: string | null;
  description_location: string | null;
  device_category: DeviceCategoryDbType;
  created_at: Date;
  current_state: DeviceStateDbType;
  current_value: number | null;
  /**
   * JSON object for extra data. For example, the temperature and humidity for a thermostat.
   */
  current_extra_data: any | null;
}

export interface DeviceActivityDbObject {
  id: number;
  device_id: number;
  current_state: DeviceStateDbType;
  current_value: number | null;
  current_extra_data: any | null;
  duration_seconds: number | null;
  created_at: Date;
}