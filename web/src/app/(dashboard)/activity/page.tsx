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
import { PageHeader } from "@/components/view/page-header";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export default function ActivityPage() {
  const { data } = useQuery({
    queryKey: ["device_activities"],
    queryFn: deviceActivityApi.getAllDeviceActivities,
    refetchInterval: 5000,
  });

  return (
    <div className="container">
      <PageHeader
        title="Activity"
        subtitle="All your activities in one place"
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
