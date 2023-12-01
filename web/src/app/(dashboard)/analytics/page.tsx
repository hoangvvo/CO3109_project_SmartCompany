"use client";

import { api } from "@/apis/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/view/date-range-picker";
import { PageHeader } from "@/components/view/page-header";
import { StatCard } from "@/components/view/stat-card";
import { useQuery } from "@tanstack/react-query";
import { Activity, Clock, MonitorSmartphone, PlugZap } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { DeviceFilters } from "../devices/_components/DeviceFilters";
import { DeviceLeaderBoard } from "./_components/device-leaderboard";
import { DeviceLineChart } from "./_components/device-line-chart";
import { toHours, toKiloWattHours } from "./utils";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [filterDeviceIds, setFilterDeviceIds] = useState<number[] | undefined>(
    undefined,
  );

  const { data: dataAnalytics } = useQuery({
    queryKey: [
      "analytics",
      "aggregate",
      {
        startDate: dateRange?.from?.toJSON(),
        endDate: dateRange?.to?.toJSON(),
        filterDeviceIds,
      },
    ],
    queryFn: () =>
      !!dateRange?.from && !!dateRange.to
        ? api.getAggregatedAnalytics({
            startDate: dateRange.from,
            endDate: dateRange.to,
            filterDeviceIds,
          })
        : null,
    enabled: !!dateRange?.from && !!dateRange.to,
  });

  return (
    <div className="container">
      <PageHeader
        title="Analytics"
        actions={
          <>
            <DeviceFilters
              filterDeviceIds={filterDeviceIds}
              setFilterDeviceIds={setFilterDeviceIds}
            />
            <CalendarDateRangePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </>
        }
      />
      <div className="mt-2 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Devices used"
            Icon={MonitorSmartphone}
            previous={dataAnalytics?.aggregated_analytics.count_compare}
          >
            {dataAnalytics?.aggregated_analytics.count || 0}
          </StatCard>
          <StatCard
            title="Active duration"
            Icon={Clock}
            previous={toHours(
              dataAnalytics?.aggregated_analytics.on_duration_compare,
            )}
            suffix="h"
          >
            {toHours(dataAnalytics?.aggregated_analytics.on_duration) || 0}
          </StatCard>
          <StatCard
            title="Electricity used"
            Icon={PlugZap}
            previous={toKiloWattHours(
              dataAnalytics?.aggregated_analytics.watt_seconds_compare,
            )}
            suffix="kWh"
          >
            {toKiloWattHours(
              dataAnalytics?.aggregated_analytics.watt_seconds,
            ) || 0}
          </StatCard>
          <StatCard
            title="Total activities"
            Icon={Activity}
            previous={
              dataAnalytics?.aggregated_analytics.activity_count_compare
            }
          >
            {dataAnalytics?.aggregated_analytics.activity_count || 0}
          </StatCard>
        </div>
        <h2 className="text-xl font-semibold mt-8">Device Usage</h2>
        <Tabs defaultValue="energy">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="energy">Energy Consumption</TabsTrigger>
            <TabsTrigger value="duration">Active Duration</TabsTrigger>
          </TabsList>
          <TabsContent value="energy">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Energy Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2" style={{ height: 500 }}>
                  <DeviceLineChart
                    property="watt_seconds"
                    dateRange={dateRange}
                    filterDeviceIds={filterDeviceIds}
                  />
                </CardContent>
              </Card>
              <Card className="col-span-3 flex flex-col">
                <CardHeader>
                  <CardTitle>Energy Leaderboard</CardTitle>
                  <CardDescription>
                    Devices sorted by energy usage
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 h-0">
                  <DeviceLeaderBoard
                    property="watt_seconds"
                    dateRange={dateRange}
                    filterDeviceIds={filterDeviceIds}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="duration">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Active Duration Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2" style={{ height: 500 }}>
                  <DeviceLineChart
                    property="on_duration"
                    dateRange={dateRange}
                  />
                </CardContent>
              </Card>
              <Card className="col-span-3 flex flex-col">
                <CardHeader>
                  <CardTitle>Active Duration Leaderboard</CardTitle>
                  <CardDescription>
                    Devices sorted by active duration
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 h-0">
                  <DeviceLeaderBoard
                    property="on_duration"
                    dateRange={dateRange}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
