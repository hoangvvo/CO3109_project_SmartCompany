import { deviceApi } from "@/apis/device";
import { parseResponseError } from "@/apis/error";
import { Device, DeviceCurrentStateEnum } from "@/apis/openapi";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DEVICE_CATEGORY_TO_ICON } from "./constants";

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
    onError(error) {
      parseResponseError(error).then((error) => {
        toast({
          title: "Device state change failed",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  const onStateToggle = (checked: boolean) => {
    mutation.mutate({
      id: device.id,
      state: checked ? DeviceCurrentStateEnum.On : DeviceCurrentStateEnum.Off,
      value: device.current_value,
    });
  };

  const [tempValue, setTempValue] = useState(device.current_value || 0);
  const commitTempValue = (opened: boolean) => {
    if (!opened) {
      mutation.mutate({
        id: device.id,
        state: device.current_state,
        value: tempValue,
      });
    }
  };

  return (
    <Card className="hover:border-primary transition overflow-hidden h-[fit-content]">
      <Link href={`/devices/${device.id}`}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>{device.name}</CardTitle>
            <CardDescription>{device.description_location}</CardDescription>
          </div>
          <DeviceIcon
            className={`w-8 h-8 ${
              device.current_state === DeviceCurrentStateEnum.On
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
      </Link>
      <CardFooter className="flex justify-around items-start border-t pt-4 bg-secondary relative">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-secondary-foreground text-lg opacity-75">Power</p>
          <Switch
            checked={device.current_state === DeviceCurrentStateEnum.On}
            disabled={mutation.isPending}
            className="w-10 h-6"
            onCheckedChange={onStateToggle}
          />
        </div>
        {typeof device.current_value !== "number" ? null : (
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-secondary-foreground text-lg opacity-75">
              Value
            </p>
            <Popover onOpenChange={commitTempValue}>
              <PopoverTrigger disabled={mutation.isPending}>
                <Badge className="text-lg font-semibold">
                  {device.current_value}
                </Badge>
              </PopoverTrigger>
              <PopoverContent className="w-28">
                <Input
                  id="width"
                  className="col-span-2 h-8"
                  type="number"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.currentTarget.valueAsNumber)}
                  disabled={mutation.isPending}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        {mutation.isPending && (
          <div className="absolute z-10 inset-0 w-full h-full flex justify-center items-center bg-white bg-opacity-25 backdrop-blur-sm">
            <span className="text-primary">Updating...</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
