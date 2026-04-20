"use client";
import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-[260px] w-full rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center text-slate-400 dark:text-slate-500 sm:h-[300px] lg:h-[350px]">
      Loading Sales Data...
    </div>
  ),
});

const salesDataByYear = {
  2026: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 12],
  2025: [35, 48, 38, 59, 28, 46, 30, 52, 49, 33, 39, 25],
} as const;

type SalesYear = keyof typeof salesDataByYear;

const SalesColumnChart = () => {
  const [selectedYear, setSelectedYear] = useState<SalesYear>("2026");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const chartSeries = useMemo(
    () => [
      {
        name: "Sales",
        data: salesDataByYear[selectedYear],
      },
    ],
    [selectedYear],
  );

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
      background: "transparent",
    },
    theme: {
      mode: isDark ? 'dark' : 'light'
    },
    colors: ["#8B5CF6"], 
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "50%",
        borderRadiusApplication: 'around',
        dataLabels: { position: "top" },
      },
    },
    dataLabels: { enabled: false },
    grid: {
      show: true,
      borderColor: isDark ? "rgba(148, 163, 184, 0.05)" : "rgba(0, 0, 0, 0.05)",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { 
          colors: isDark ? "#94A3B8" : "#64748B", 
          fontSize: "12px" 
        },
      },
    },
    yaxis: {
      labels: {
        style: { 
          colors: isDark ? "#94A3B8" : "#64748B", 
          fontSize: "12px" 
        },
        formatter: (val) => `$${val}k`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: isDark ? "dark" : "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#C084FC"], 
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val) => `$${val.toLocaleString()} total sales` },
    },
  };

  return (
    <figure className="h-65 sm:h-75 lg:h-87.5 hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(139,92,235,0.15)] transition-all duration-300 w-full col-span-1 lg:col-span-9 bg-white dark:bg-slate-800 rounded-2xl px-5 py-4 border border-slate-200 dark:border-slate-700/50 flex flex-col shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-slate-800 dark:text-gray-200 font-bold text-lg">Sales Revenue</h3>
        <select
          value={selectedYear}
          onChange={(event) => setSelectedYear(event.target.value as SalesYear)}
          className="bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 rounded-md px-2 py-1 outline-none border-none cursor-pointer transition-colors"
        >
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
      </div>
      <div className="flex-1 min-h-0">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height="100%"
          width="100%"
        />
      </div>
    </figure>
  );
};

export default SalesColumnChart;