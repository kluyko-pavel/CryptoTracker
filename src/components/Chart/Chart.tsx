import "./Chart.scss";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { IChartInfo } from "../../types";

export const Chart = ({ chartInfo }: { chartInfo: IChartInfo[] }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    ticks: {
      maxTicksLimit: 8,
    },
  };

  const labels = chartInfo.map((el: IChartInfo) =>
    moment(el.date).format("DD.MM.YYYY")
  );
  const price = chartInfo.map((el: IChartInfo) => el.priceUsd);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: price,
        borderColor: "#2669ff",
        backgroundColor: "#FCD535",
      },
    ],
  };

  return (
    <div className="chart">
      <Line options={options} data={data} />
    </div>
  );
};
