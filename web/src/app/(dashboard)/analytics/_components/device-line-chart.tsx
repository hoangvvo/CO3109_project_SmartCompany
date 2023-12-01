import { api } from "@/apis/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { FC, useMemo } from "react";
import { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toHours, toKiloWattHours } from "../utils";

export const DeviceLineChart: FC<{
  dateRange: DateRange | undefined;
  property: "on_duration" | "watt_seconds";
  filterDeviceIds?: number[];
}> = ({ dateRange, property, filterDeviceIds }) => {
  const { data: dataRawAnalytics } = useQuery({
    queryKey: [
      "analytics",
      "raw",
      {
        startDate: dateRange?.from?.toJSON(),
        endDate: dateRange?.to?.toJSON(),
        filterDeviceIds,
      },
    ],
    queryFn: () =>
      !!dateRange?.from && !!dateRange.to
        ? api.getRawAnalytics({
            startDate: dateRange.from,
            endDate: dateRange.to,
            filterDeviceIds,
          })
        : null,
    enabled: !!dateRange?.from && !!dateRange.to,
  });

  const data = useMemo(
    () =>
      dataRawAnalytics?.raw_analytics.data?.map((d) => ({
        date: format(new Date(d.timestamp), "yyyy-MM-dd"),
        kiloWattHours: toKiloWattHours(d.watt_seconds),
        kiloWattHoursCompare: toKiloWattHours(d.watt_seconds_compare),
        onDuration: toHours(d.on_duration),
        onDurationCompare: toHours(d.on_duration_compare),
      })),
    [dataRawAnalytics],
  );

  if (!data) {
    return <Loader className="w-8 h-8 text-secondary animate-spin m-auto" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" className="text-xs">
          <Label value="Date" position="insideBottom" offset={-5} />
        </XAxis>
        <YAxis
          dataKey={property === "on_duration" ? "onDuration" : "kiloWattHours"}
          stroke="#888888"
          className="text-xs"
        >
          <Label
            value={property === "on_duration" ? "Duration (h)" : "Energy (kWh)"}
            position="insideLeft"
            angle={-90}
            offset={10}
          />
        </YAxis>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey={
            property === "on_duration"
              ? "onDurationCompare"
              : "kiloWattHoursCompare"
          }
          stroke="hsl(221deg 83% 53% / 50%)"
          name="Previous Period"
          strokeDasharray="3 4 5 2"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey={property === "on_duration" ? "onDuration" : "kiloWattHours"}
          stroke="hsl(221deg 83% 53%)"
          name="Current Period"
          dot={false}
        />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{
            top: -10,
          }}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
