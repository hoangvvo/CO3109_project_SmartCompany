"use client";

import { automationApi } from "@/apis/automation";
import { PageHeader } from "@/components/view/page-header";
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
      <PageHeader title="Automation" actions={<AddAutomation />} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.automations.map((automation) => (
          <AutomationCard key={automation.id} automation={automation} />
        ))}
      </div>
    </div>
  );
}
