import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import {
    GetVersionsQuery
} from '@rootTypes/compositionFunctions';

ChartJS.register(ArcElement, Tooltip, Legend);

type VersionPieChartProps = {
  data: GetVersionsQuery["getVersions"];
};

const VersionPieChart: React.FC<VersionPieChartProps> = ({ data }) => {
  const labels = data.versions.map(
    (version) => version.tag || version.commit.substring(0, 8)
  );
  const unitCounts = data.versions.map((version) => version.unitCount);
  const commits = data.versions.map((version) => version.commit);

  const chartData = {
    labels,
    datasets: [
      {
        data: unitCounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384AA",
          "#36A2EBAA",
          "#FFCE56AA",
          "#4BC0C0AA",
          "#9966FFAA",
        ],
        borderColor: "#444",
        borderWidth: 2
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const index = context.dataIndex;
            const tag = labels[index];
            const commit = commits[index];
            const count = unitCounts[index];
            return [`Tag: ${tag}`, `Commit: ${commit.substring(0, 8)}`, `Units: ${count}`];
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
          boxHeight: 15,
          color: "#FFFFFF",
        },
      },
    },
    animation: false,
  };

  return <Pie data={chartData} options={options} />;
};

export default VersionPieChart;