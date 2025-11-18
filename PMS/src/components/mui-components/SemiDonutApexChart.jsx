import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function SemiDonutChart({
  data = [
    { label: "Occupancy", value: 70, color: "#10B981" },
    { label: "Revenue", value: 55, color: "#F59E0B" },
    { label: "Tenants", value: 82, color: "#6366F1" },
  ],
}) {
  // Extract series + colors + labels
  const series = data.map((item) => item.value);
  const colors = data.map((item) => item.color);
  const labels = data.map((item) => item.label);

  const [chartData] = useState({
    series,
    options: {
      chart: {
        type: "donut",
      },
      colors,
      labels,
      stroke: {
        width: 0,
      },
      legend: {
        show: false, // We create our own legend below
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
          donut: {
            size: "75%",
          },
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center bg-white shadow-2xl rounded-2xl py-4 w-full h-full">
      {/* Semi Donut */}
      <div className="w-56">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
        />
      </div>

      {/* Custom Legend */}
      <div className="mt-3 grid grid-cols-1 gap-2 text-center">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-gray-700 text-sm font-medium">
              {item.label}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
