import { deviceActivityApi } from "@/apis/device-activity";
import { Device } from "@/apis/openapi";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const DeviceExtraData: React.FC<{
  device: Device;
  dateRange: DateRange | undefined;
}> = ({ device, dateRange }) => {
  const { data } = useQuery({
    queryKey: [
      "devices",
      device.id,
      "activities",
      {
        startDate: dateRange?.from?.toJSON(),
        endDate: dateRange?.to?.toJSON(),
      },
    ],
    queryFn: () =>
      deviceActivityApi.getAllDeviceActivities({
        filterDeviceIds: [device.id],
        startDate: dateRange?.from,
        endDate: dateRange?.to,
      }),
  });

  if (!device.current_extra_data) {
    return (
      <div className="text-muted-foreground">
        This device does not contain any additional data
      </div>
    );
  }

  const extraDataArr = data?.deviceActivities.map((activity) => ({
    ...activity.current_extra_data,
    date: format(activity.started_at, "yyyy-MM-dd"),
  }));

  const extraDataKeys = Object.keys(device.current_extra_data);

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <div className="flex gap-8">
        {Object.entries(device.current_extra_data).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-2 items-center">
            <p className="text-sm text-bold text-muted-foreground capitalize">
              {key}
            </p>
            <Badge className="text-lg" variant="outline">
              {value}
            </Badge>
          </div>
        ))}
      </div>
      {!!extraDataArr && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {extraDataKeys.map((key) => (
            <ResponsiveContainer key={key} width="100%" height={250}>
              <LineChart
                data={extraDataArr}
                syncId={`device-${device.id}-extra-data`}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#888888" className="text-xs">
                  <Label value="Date" position="insideBottom" offset={-5} />
                </XAxis>
                <YAxis dataKey={key} stroke="#888888" className="text-xs">
                  <Label
                    value={key.toUpperCase()}
                    position="insideLeft"
                    angle={-90}
                    offset={10}
                  />
                </YAxis>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={key}
                  stroke="hsl(221deg 83% 53%)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ))}
        </div>
      )}
    </div>
  );
};
