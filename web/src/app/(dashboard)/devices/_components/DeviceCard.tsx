import { deviceApi } from "@/apis/device";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Device, DeviceCategoryType, DeviceStateType } from "@/types/device";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AirVent,
  DoorOpen,
  Fan,
  FileQuestion,
  Lightbulb,
  Thermometer,
} from "lucide-react";

const DEVICE_CATEGORY_TO_ICON = {
  [DeviceCategoryType.AIR_CONDITIONER]: AirVent,
  [DeviceCategoryType.DOOR]: DoorOpen,
  [DeviceCategoryType.FAN]: Fan,
  [DeviceCategoryType.LIGHT]: Lightbulb,
  [DeviceCategoryType.THERMOSTAT]: Thermometer,
};

export const DeviceCard: React.FC<{ device: Device }> = ({ device }) => {
  const DeviceIcon =
    DEVICE_CATEGORY_TO_ICON[device.device_category] || FileQuestion;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deviceApi.updateDeviceState,
    onSuccess(data, variables) {
      queryClient.invalidateQueries({
        queryKey: ["devices"],
      });
      queryClient.invalidateQueries({
        queryKey: ["device", variables.id],
      });
      toast({
        title: "Device state change requested",
      });
    },
  });

  const onStateToggle = () => {
    mutation.mutate({
      id: device.id,
      state:
        device.current_state === DeviceStateType.ON
          ? DeviceStateType.OFF
          : DeviceStateType.ON,
      value: device.current_value,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>{device.name}</CardTitle>
          <CardDescription>{device.description_location}</CardDescription>
        </div>
        <DeviceIcon
          className={`w-8 h-8 ${
            device.current_state === DeviceStateType.ON
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        />
      </CardHeader>
      <CardContent>
        <p>Path: {device.path}</p>
        <p>State: {device.current_state}</p>
        <p>Value: {device.current_value || "n/a"}</p>
        <p>Extra data: {JSON.stringify(device.current_extra_data)}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button disabled={mutation.isPending} onClick={onStateToggle}>
          Turn {device.current_state === DeviceStateType.ON ? "Off" : "On"}
        </Button>
        <Button variant="ghost">Change value</Button>
      </CardFooter>
    </Card>
  );
};
