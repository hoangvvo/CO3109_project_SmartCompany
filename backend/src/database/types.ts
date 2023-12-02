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
  wattage: number | null;
}

export interface DeviceActivityDbObject {
  id: number;
  device_id: number;
  current_state: DeviceStateDbType;
  current_value: number | null;
  current_extra_data: any | null;
  started_at: Date;
  ended_at: Date | null;
}

export enum LogicalOperatorDbType {
  AND = "and",
  OR = "or",
}

export enum AutomationConditionTypeDbType {
  DEVICE = "device",
  CRON = "cron",
}

export interface AutomationDbObject {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  logical_operator: LogicalOperatorDbType;
}

export enum ConditionOperatorType {
  Eq = "eq",
  Neq = "neq",
  Gt = "gt",
  Gte = "gte",
  Lt = "lt",
  Lte = "lte",
}

export interface AutomationConditionDbObject {
  id: number;
  automation_id: number;
  condition_type: AutomationConditionTypeDbType;
  device_id: number | null;
  device_property: string | null;
  condition_operator: ConditionOperatorType | null;
  condition_value: number | null;
  cron_expression: string | null;
}

export interface AutomationActionDbObject {
  id: number;
  automation_id: number;
  device_id: number | null;
  device_state: DeviceStateDbType | null;
  device_value: number | null;
  device_extra_data: any | null;
}

export interface AutomationActivityDbObject {
  id: number;
  automation_id: number;
  created_at: Date;
}
