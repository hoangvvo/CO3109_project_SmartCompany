import { DeviceDeviceCategoryEnum } from "@/apis/openapi";
import { AirVent, DoorOpen, Fan, Lightbulb, Thermometer } from "lucide-react";

export const DEVICE_CATEGORY_TO_ICON = {
  [DeviceDeviceCategoryEnum.AirConditioner]: AirVent,
  [DeviceDeviceCategoryEnum.Door]: DoorOpen,
  [DeviceDeviceCategoryEnum.Fan]: Fan,
  [DeviceDeviceCategoryEnum.Light]: Lightbulb,
  [DeviceDeviceCategoryEnum.Thermostat]: Thermometer,
};
