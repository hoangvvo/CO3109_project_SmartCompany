"use client";

import { deviceActivityApi } from "@/apis/device-activity";
import { Device } from "@/apis/openapi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FC } from "react";
import { DateRange } from "react-day-picker";

export const DeviceActivities: FC<{
  device: Device;
  dateRange: DateRange | undefined;
}> = ({ device, dateRange }) => {
  const { data } = useQuery({
    queryKey: [
      "device_activities",
      {
        startDate: dateRange?.from?.toJSON(),
        endDate: dateRange?.to?.toJSON(),
        filterDeviceIds: [device.id],
      },
    ],
    queryFn: () =>
      deviceActivityApi.getAllDeviceActivities({
        startDate: dateRange?.from,
        endDate: dateRange?.to,
        filterDeviceIds: [device.id],
      }),
    refetchInterval: 5000,
  });

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
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
  );
};
