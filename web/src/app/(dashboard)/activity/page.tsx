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
import { useQuery } from "@tanstack/react-query";

export default function ActivityPage() {
  const { data } = useQuery({
    queryKey: ["device_activities"],
    queryFn: deviceActivityApi.getAllDeviceActivities,
    refetchInterval: 5000,
  });

  return (
    <div className="container">
      <div className="flex py-4 justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Activities</h2>
          <p className="text-muted-foreground">All device activities</p>
        </div>
      </div>
      <div className="py-4">
        <Table>
          <TableCaption>A list of your recent device activities.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Extra data</TableHead>
              <TableHead>Timestamp</TableHead>
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
                <TableCell>{activity.current_extra_data}</TableCell>
                <TableCell>{String(activity.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
