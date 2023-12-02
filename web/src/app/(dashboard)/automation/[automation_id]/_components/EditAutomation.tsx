import { automationApi } from "@/apis/automation";
import { parseResponseError } from "@/apis/error";
import { Automation } from "@/apis/openapi";
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
import { AutomationForm } from "../../_components/AutomationForm";

const EditAutomationForm: FC<{
  setOpen: (open: boolean) => void;
  automation: Automation;
}> = ({ setOpen, automation }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: automationApi.updateAutomation,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["automations"],
      });
      toast({
        title: "Automation updated",
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
    <AutomationForm
      onSubmit={(data) =>
        mutation.mutate({
          id: automation.id,
          ...data,
        })
      }
      disabled={mutation.isPending}
      initialValues={{
        name: automation.name,
        description: automation.description || "",
        logical_operator: automation.logical_operator,
      }}
      submitLabel="Update"
    />
  );
};

export const EditAutomation: React.FC<{
  automation: Automation;
}> = ({ automation }) => {
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
        <EditAutomationForm setOpen={setOpen} automation={automation} />
      </SheetContent>
    </Sheet>
  );
};
