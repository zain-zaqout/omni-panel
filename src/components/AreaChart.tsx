"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-[280px] w-full rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse lg:h-[350px]" />
  ),
});

const AreaChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDark(); 
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const chartSeries = [
    {
      name: "Revenue",
      data: [31000, 40000, 28000, 51000, 42000, 109000, 100000, 120000, 80000, 95000, 110000, 124592],
    },
  ];

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Inter, sans-serif",
      background: "transparent",
      animations: { enabled: true, easing: "easeinout", speed: 1000 },
    },
    colors: ["#8B5CF6"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: isDarkMode ? 0.35 : 0.45,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    grid: {
      show: true,
      borderColor: isDarkMode ? "#334155" : "#E2E8F0",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      padding: { left: 10 },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: isDarkMode ? "#94A3B8" : "#64748B", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: any) => `$${val / 1000}k`,
        style: { colors: isDarkMode ? "#94A3B8" : "#64748B", fontSize: "12px" },
      },
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light",
      x: { show: false },
    },
  };

  return (
    <figure className="h-[280px] lg:h-[350px] border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 w-full shadow-sm bg-white dark:bg-slate-800 rounded-2xl px-5 py-3 flex flex-col">
      <div className="my-2.5 flex items-center justify-between px-1">
        <h3 className="text-slate-800 dark:text-slate-100 font-bold text-lg">Sales Volume</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Last 12 months</span>
      </div>
      <div className="flex-1 min-h-0">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </figure>
  );
};

export default AreaChart;