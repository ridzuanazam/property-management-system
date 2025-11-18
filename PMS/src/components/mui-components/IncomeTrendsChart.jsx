// components/charts/IncomeTrendsChart.jsx
import React, { useState } from "react";
import Chart from "react-apexcharts";

// 🔒 Generate DETERMINISTIC demo data at module level (runs once)
const generateStableData = (length, seed = 42) => {
  const data = [];
  let state = seed;

  // Simple pseudo-random number generator (LCG)
  const random = () => {
    state = (state * 1664525 + 1013904223) % Math.pow(2, 32);
    return state / Math.pow(2, 32);
  };

  for (let i = 0; i < length; i++) {
    const base = 5000;
    const noise = 10000;
    const value = base + Math.sin(i / 3) * noise + random() * 5000;
    data.push(Math.max(0, Math.round(value)));
  }
  return data;
};

// Pre-generate all datasets (pure, no side effects)
const demoData = {
  12: generateStableData(12),
  24: generateStableData(24),
  36: generateStableData(36),
  48: generateStableData(48),
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function IncomeTrendsChart() {
  const [timeRange, setTimeRange] = useState(12);

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#60A5FA"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#6860fa"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: Array.from({ length: timeRange }, (_, i) => months[i % 12]),
      axisBorder: { show: true },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${Math.round(val / 10000)}k`,
        style: {
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
          colors: "#6B7280",
        },
      },
      min: 0,
      // Dynamically set max based on data
      max: Math.max(6000, Math.max(...demoData[timeRange]) * 1.1),
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => `$${val.toLocaleString()}` },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "14px",
      labels: { colors: "#6B7280" },
      markers: { width: 10, height: 10, radius: 5 },
    },
  };

  const series = [
    {
      name: "Earnings",
      data: demoData[timeRange],
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Income Trends</h2>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
            <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
            Earnings
          </span>
        </div>
      </div>

      <div className="flex gap-1 mb-6">
        {[12, 24, 36, 48].map((months) => (
          <button
            key={months}
            onClick={() => setTimeRange(months)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              timeRange === months
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {months} months
          </button>
        ))}
      </div>

      <div className="h-[300px]">
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
