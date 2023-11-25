import { automationApi } from "@/apis/automation";
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
import { FC, useState } from "react";
import { AutomationForm } from "./AutomationForm";

const AddAutomationForm: FC<{
  setOpen: (open: boolean) => void;
}> = ({ setOpen }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: automationApi.createAutomation,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["automations"],
      });
      toast({
        title: "Automation created",
        description: "The automation has been created.",
      });
      setOpen(false);
    },
    onError(error) {
      parseResponseError(error).then((error) => {
        toast({
          title: "Automation creation failed",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  return (
    <AutomationForm onSubmit={mutation.mutate} disabled={mutation.isPending} />
  );
};

export const AddAutomation: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add automation</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add automation</SheetTitle>
          <SheetDescription>
            Add a new automation workflow to the company
          </SheetDescription>
        </SheetHeader>
        <AddAutomationForm setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
