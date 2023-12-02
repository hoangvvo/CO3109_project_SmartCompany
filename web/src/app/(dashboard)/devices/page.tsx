"use client";

import { deviceApi } from "@/apis/device";
import { PageHeader } from "@/components/view/page-header";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AddDevice } from "./_components/AddDevice";
import { DeviceCard } from "./_components/DeviceCard";
import { DeviceFilters } from "./_components/DeviceFilters";

export default function DevicesPage() {
  const { data } = useQuery({
    queryKey: ["devices"],
    queryFn: deviceApi.getDevices,
    refetchInterval: 5000,
  });

  const [filterDeviceIds, setFilterDeviceIds] = useState<number[] | undefined>(
    undefined,
  );

  const devices = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.devices.filter((device) => {
      if (!filterDeviceIds) {
        return true;
      }

      return filterDeviceIds.includes(device.id);
    });
  }, [data, filterDeviceIds]);

  return (
    <div className="container">
      <PageHeader
        title="Devices"
        actions={
          <>
            <DeviceFilters
              filterDeviceIds={filterDeviceIds}
              setFilterDeviceIds={setFilterDeviceIds}
            />
            <AddDevice />
          </>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {devices.map((device) => (
          <DeviceCard device={device} key={device.id} />
        ))}
      </div>
    </div>
  );
}
