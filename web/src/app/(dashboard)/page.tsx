
import GraphCard from "./_components/GraphCard"
//hard code data
const labels = ["1", "2", "3", "4", "5", "6"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "dataset",
      data: [65, 59, 83, 89, 76, 55, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function HomePage() {
  return (
    <div className="container">
      <div className="flex py-4 justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Show all graph below
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <GraphCard data = {data} />
        <GraphCard data = {data} />
        <GraphCard data = {data} />
        <GraphCard data = {data} />
        <GraphCard data = {data} />
        <GraphCard data = {data} />
        <GraphCard data = {data} />
        <GraphCard data = {data} />
        <GraphCard data = {data} />
        <GraphCard data = {data} />
      </div>
    </div>
  );
}
