import { api } from "@/apis/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { FileQuestion } from "lucide-react";
import { FC } from "react";
import { DateRange } from "react-day-picker";
import { DEVICE_CATEGORY_TO_ICON } from "../../devices/_components/constants";
import { toHours, toKiloWattHours } from "../utils";

export const DeviceLeaderBoard: FC<{
  property: "on_duration" | "watt_seconds";
  dateRange: DateRange | undefined;
}> = ({ property, dateRange }) => {
  const { data: dataAnalytics } = useQuery({
    queryKey: [
      "analytics",
      "aggregate",
      {
        startDate: dateRange?.from?.toJSON(),
        endDate: dateRange?.to?.toJSON(),
      },
    ],
    queryFn: () =>
      !!dateRange?.from && !!dateRange.to
        ? api.getAggregatedAnalytics({
            startDate: dateRange.from,
            endDate: dateRange.to,
          })
        : null,
    enabled: !!dateRange?.from && !!dateRange.to,
  });

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2">
        {dataAnalytics?.aggregated_analytics.devices
          .toSorted((a, b) => b[property] - a[property])
          .map((device) => {
            const DeviceIcon =
              DEVICE_CATEGORY_TO_ICON[device.device_category] || FileQuestion;

            return (
              <div
                key={device.device_id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-4">
                  <DeviceIcon className="w-6 h-6 text-primary" />
                  <div>
                    <div className="text-sm font-medium leading-none">
                      {device.device_name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {device.device_description_location}
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  {property === "on_duration" && (
                    <span className="text-primary">
                      {toHours(device.on_duration)} hours
                    </span>
                  )}
                  {property === "watt_seconds" && (
                    <span className="text-primary">
                      {toKiloWattHours(device.watt_seconds)} kWh
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </ScrollArea>
  );
};
