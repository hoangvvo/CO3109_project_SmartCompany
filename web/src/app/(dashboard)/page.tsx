"use client";

import { api } from "@/apis/api";
import { DeviceCurrentStateEnum } from "@/apis/openapi";
import { CalendarDateRangePicker } from "@/components/view/date-range-picker";
import { PageHeader } from "@/components/view/page-header";
import { StatCard } from "@/components/view/stat-card";
import { useQuery } from "@tanstack/react-query";
import { Activity, MonitorSmartphone, Power, Workflow } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function HomePage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { data: dataDevice } = useQuery({
    queryKey: ["devices"],
    queryFn: () => api.getDevices(),
  });

  const { data: dataAutomation } = useQuery({
    queryKey: ["automations"],
    queryFn: () => api.getAutomations(),
  });

  const { data: dataAnalytics } = useQuery({
    queryKey: [
      "analytics",
      "aggregate",
      {
        startDate: dateRange?.from?.toJSON(),
        endDate: dateRange?.to?.toJSON(),
      },
    ],
    queryFn: () =>
      !!dateRange?.from && !!dateRange.to
        ? api.getAggregatedAnalytics({
            startDate: dateRange.from,
            endDate: dateRange.to,
          })
        : null,
    enabled: !!dateRange?.from && !!dateRange.to,
  });

  return (
    <div className="container">
      <PageHeader
        title="Home"
        subtitle="Welcome to SmartCompany"
        actions={
          <CalendarDateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        }
      />
      <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/devices">
            <StatCard title="Total Devices" Icon={MonitorSmartphone}>
              {dataDevice?.devices.length || 0}
            </StatCard>
          </Link>
          <Link href="/devices">
            <StatCard title="Active Devices" Icon={Power}>
              {dataDevice?.devices.filter(
                (device) => device.current_state === DeviceCurrentStateEnum.On,
              ).length || 0}
            </StatCard>
          </Link>
          <Link href="/automation">
            <StatCard title="Total Automations" Icon={Workflow}>
              {dataAutomation?.automations.length || 0}
            </StatCard>
          </Link>
          <Link href="/activity">
            <StatCard
              title="Total Activities"
              Icon={Activity}
              previous={
                dataAnalytics?.aggregated_analytics.activity_count_compare
              }
            >
              {dataAnalytics?.aggregated_analytics.activity_count || 0}
            </StatCard>
          </Link>
        </div>
      </div>
    </div>
  );
}
