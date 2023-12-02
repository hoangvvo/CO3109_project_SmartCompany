import { deviceApi } from "@/apis/device";
import { parseResponseError } from "@/apis/error";
import { Device } from "@/apis/openapi";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { FC, useState } from "react";
import { DeviceForm } from "../../_components/DeviceForm";

const EditDeviceForm: FC<{
  setOpen: (open: boolean) => void;
  device: Device;
}> = ({ setOpen, device }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deviceApi.updateDevice,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["devices"],
      });
      toast({
        title: "Device updated",
        description: "The device has been updated.",
      });
      setOpen(false);
    },
    onError(error) {
      parseResponseError(error).then((error) => {
        toast({
          title: "Device update failed",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  return (
    <DeviceForm
      onSubmit={(data) =>
        mutation.mutate({
          id: device.id,
          ...data,
        })
      }
      disabled={mutation.isPending}
      defaultValues={{
        ...device,
        description: device.description || "",
        description_location: device.description_location || "",
        wattage: device.wattage || 0,
      }}
      submitText="Update"
    />
  );
};

export const EditDevice: FC<{
  device: Device;
}> = ({ device }) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit automation</SheetTitle>
          <SheetDescription>
            Edit a new automation workflow to the company
          </SheetDescription>
        </SheetHeader>
        <EditDeviceForm setOpen={setOpen} device={device} />
      </SheetContent>
    </Sheet>
  );
};
