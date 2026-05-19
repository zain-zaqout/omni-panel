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
};

const SalesColumnChart = () => {
  const [selectedYear, setSelectedYear] = useState("2026");
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

  const chartOptions = {
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
      enabled: true,
      theme: isDark ? "dark" : "light",
      style: {
        fontSize: "12px"
      },
      y: {
        formatter: (val) => `$${val}k`
      }
    },
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Sales Overview
        </h3>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-1 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
        >
          {Object.keys(salesDataByYear).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {chartSeries && chartOptions && (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};

export default SalesColumnChart;
