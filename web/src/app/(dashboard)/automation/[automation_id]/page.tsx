"use client";

import { automationApi } from "@/apis/automation";
import { parseResponseError } from "@/apis/error";
import { Automation } from "@/apis/openapi";
import { ErrorPage } from "@/components/pages/error-page";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { AutomationForm } from "../_components/AutomationForm";

const AutomationPageContent: FC<{
  automation: Automation;
}> = ({ automation }) => {
  const updateAutomationMutation = useMutation({
    mutationFn: automationApi.updateAutomation,
    onSuccess: (data) => {
      toast({
        title: "Automation updated",
        description: `Your automation "${data.automation.name}" has been updated.`,
      });
    },
    onError: (error) => {
      parseResponseError(error).then((error) => {
        toast({
          title: "Could not update automation",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  return (
    <div className="container">
      <div className="flex py-4 justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {automation.name}
          </h2>
          <p className="text-muted-foreground">{automation.description}</p>
        </div>
      </div>
      <AutomationForm
        initialValues={{
          name: automation.name,
          description: automation.description || "",
          logical_operator: automation.logical_operator,
        }}
        onSubmit={(data) => {
          updateAutomationMutation.mutate({
            id: automation.id,
            ...data,
          });
        }}
        disabled={updateAutomationMutation.isPending}
        submitLabel="Update"
      />
    </div>
  );
};

export default function AutomationPage({
  params,
}: {
  params: { automation_id: string };
}) {
  const { data, status, error } = useQuery({
    queryKey: ["automations", params.automation_id],
    queryFn: () => automationApi.getAutomation(Number(params.automation_id)),
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <ErrorPage title="Could not load automation" message={error.message} />
    );
  }

  if (!data.automation) {
    return null;
  }

  return <AutomationPageContent automation={data.automation} />;
}
