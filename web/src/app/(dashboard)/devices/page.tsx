"use client";

import { deviceApi } from "@/apis/device";
import { PageHeader } from "@/components/view/page-header";
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
      <PageHeader
        title="Devices"
        subtitle="Manage all your devices in the company"
        actions={<AddDevice />}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {data?.devices.map((device) => (
          <DeviceCard device={device as Device} key={device.id} />
        ))}
      </div>
    </div>
  );
}
