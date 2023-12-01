"use client";

import { deviceActivityApi } from "@/apis/device-activity";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDateRangePicker } from "@/components/view/date-range-picker";
import { PageHeader } from "@/components/view/page-header";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { DeviceFilters } from "../devices/_components/DeviceFilters";

export default function ActivityPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [filterDeviceIds, setFilterDeviceIds] = useState<number[] | undefined>(
    undefined,
  );

  const { data } = useQuery({
    queryKey: [
      "device_activities",
      {
        startDate: dateRange?.from?.toJSON(),
        endDate: dateRange?.to?.toJSON(),
        filterDeviceIds,
      },
    ],
    queryFn: () =>
      deviceActivityApi.getAllDeviceActivities({
        startDate: dateRange?.from,
        endDate: dateRange?.to,
        filterDeviceIds,
      }),
    refetchInterval: 5000,
  });

  return (
    <div className="container">
      <PageHeader
        title="Activity"
        subtitle="All your activities in one place"
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
      <div className="py-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Extra data</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.deviceActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">
                  {activity.device.name}
                </TableCell>
                <TableCell>{activity.current_state}</TableCell>
                <TableCell>{activity.current_value}</TableCell>
                <TableCell>
                  {Object.entries(activity.current_extra_data || {}).map(
                    ([key, value]) => (
                      <div key={key}>
                        <span className="italic">{key}: </span>
                        {value as number}
                      </div>
                    ),
                  )}
                </TableCell>
                <TableCell>{format(activity.started_at, "PPpp")}</TableCell>
                <TableCell>
                  {activity.ended_at ? format(activity.ended_at, "PPpp") : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
