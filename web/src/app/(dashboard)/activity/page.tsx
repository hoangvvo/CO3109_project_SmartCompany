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
      <PageHeader title="Activity" subtitle="All device activities" />
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
