"use client";

import { deviceApi } from "@/apis/device";
import { Device } from "@/types/device";
import { useQuery } from "@tanstack/react-query";
import { AddDevice } from "./_components/AddDevice";
import { DeviceCard } from "./_components/DeviceCard";

export default function DevicesPage() {
  const { data } = useQuery({
    queryKey: ["devices"],
    queryFn: deviceApi.getDevices,
    refetchInterval: 5000,
  });

  return (
    <div className="container">
      <div className="flex py-4 justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Devices</h2>
          <p className="text-muted-foreground">
            Manage all your devices in the company
          </p>
        </div>
        <AddDevice />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.devices.map((device) => (
          <DeviceCard key={device.id} device={device as Device} />
        ))}
      </div>
    </div>
  );
}
