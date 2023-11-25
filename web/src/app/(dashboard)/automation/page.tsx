"use client";

import { automationApi } from "@/apis/automation";
import { useQuery } from "@tanstack/react-query";
import { AddAutomation } from "./_components/AddAutomation";
import { AutomationCard } from "./_components/AutomationCard";

export default function AutomationPage() {
  const { data } = useQuery({
    queryKey: ["automations"],
    queryFn: automationApi.getAutomations,
  });

  return (
    <div className="container">
      <div className="flex py-4 justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Automation</h2>
          <p className="text-muted-foreground">
            Automate devices to respond to events
          </p>
        </div>
        <AddAutomation />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.automations.map((automation) => (
          <AutomationCard key={automation.id} automation={automation} />
        ))}
      </div>
    </div>
  );
}
