import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle }from "@/components/ui/card";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function GraphCard({ data }: any) {
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
