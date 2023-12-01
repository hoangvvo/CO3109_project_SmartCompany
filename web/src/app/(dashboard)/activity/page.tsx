"use client";

import { deviceActivityApi } from "@/apis/device-activity";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/view/page-header";
import { useQuery } from "@tanstack/react-query";

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
          <TableCaption>A list of your recent device activities.</TableCaption>
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
                  {JSON.stringify(activity.current_extra_data)}
                </TableCell>
                <TableCell>{String(activity.started_at)}</TableCell>
                <TableCell>
                  {activity.ended_at ? String(activity.ended_at) : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
