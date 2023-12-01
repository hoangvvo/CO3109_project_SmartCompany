import { deviceApi } from "@/apis/device";
import { parseResponseError } from "@/apis/error";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import { DeviceForm } from "./DeviceForm";

export const AddDevice: React.FC = () => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deviceApi.createDevice,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["devices"],
      });
      toast({
        title: "Device created",
        description: `Device ${data.device.name} has been created.`,
      });
      setOpen(false);
    },
    onError(error) {
      parseResponseError(error).then((error) => {
        toast({
          title: "Device creation failed",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Add device
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add device</SheetTitle>
          <SheetDescription>Add a new device to the company</SheetDescription>
        </SheetHeader>
        <DeviceForm
          onSubmit={mutation.mutate}
          submitText="Add device"
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
