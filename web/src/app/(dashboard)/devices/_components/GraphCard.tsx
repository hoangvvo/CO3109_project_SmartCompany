import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CategoryScale,
  Chart,
  ChartData,
  LineElement,
  LinearScale,
  Point,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function GraphCard({
  data,
}: {
  data: ChartData<"line", (number | Point | null)[], unknown>;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <CardTitle>Sample Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={data} />
      </CardContent>
    </Card>
  );
}
