"use client";

import { deviceApi } from "@/apis/device";
import { Device } from "@/apis/openapi";
import { ErrorPage } from "@/components/pages/error-page";
import { CalendarDateRangePicker } from "@/components/view/date-range-picker";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { DateRange } from "react-day-picker";
import { DeviceControl } from "../_components/DeviceCard";
import { DeviceActivities } from "./_components/DeviceActivities";
import { DeviceExtraData } from "./_components/DeviceExtraData";
import { EditDevice } from "./_components/EditDevice";

const DevicePageContent: FC<{
  device: Device;
}> = ({ device }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="container">
      <div className="flex py-4 justify-between items-center">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            {device.name}
            <EditDevice device={device} />
          </h1>
          <p className="text-muted-foreground">{device.description_location}</p>
        </div>
        <CalendarDateRangePicker
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-xl font-semibold mt-8">Control</h2>
          <div className="flex justify-around items-start border py-4 px-8 bg-secondary relative rounded-lg w-64">
            <DeviceControl device={device} />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-xl font-semibold mt-8">Data</h2>
          <DeviceExtraData device={device} dateRange={dateRange} />
        </div>
        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-xl font-semibold mt-8">Activities</h2>
          <DeviceActivities device={device} dateRange={dateRange} />
        </div>
      </div>
    </div>
  );
};

export default function DevicePage({
  params,
}: {
  params: {
    device_id: string;
  };
}) {
  const { data, status, error } = useQuery({
    queryKey: ["devices", params.device_id],
    queryFn: () => deviceApi.getDevice(params.device_id),
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorPage title="Could not load device" message={error.message} />;
  }

  if (!data.device) {
    return null;
  }

  return <DevicePageContent device={data.device} />;
}
