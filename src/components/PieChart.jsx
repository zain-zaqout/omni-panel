import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
});

export const PieChart = () => {
  const series = [45, 42, 32, 5];
  const labels = ["Direct", "Organic Search", "Social Media", "Others"];
  const colors = ["#a78bfa", "#4ade80", "#3b82f6", "#fb923c"];

  const options = {
    chart: {
      type: "donut",
      fontFamily: "var(--font-sans), Inter, sans-serif",
      background: "transparent", 
      animations: { enabled: true }
    },
    labels: labels,
    colors: colors,
    stroke: {
      show: true,
      colors: ["transparent"]
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "var(--font-sans), Inter, sans-serif",
      fontSize: "14px",
      labels: {
        colors: "#64748b", 
      },
      markers: {
        radius: 12,
      },
    },
    theme: {
      mode: "dark", 
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Visits",
              color: "#64748b", 
              formatter: () => "124",
            },
            value: {
              color: "#94a3b8",
              fontSize: "24px",
              fontWeight: "bold",
              show: true,
            },
          },
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
    states: {
        hover: { filter: { type: 'none' } }
    }
  };

  const [chartOptions, setChartOptions] = useState(options);

  useEffect(() => {
    const applyTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setChartOptions((prev) => ({
        ...prev,
        theme: { mode: isDark ? "dark" : "light" },
        legend: {
          ...prev.legend,
          labels: { colors: isDark ? "#cbd5e1" : "#64748b" },
        },
        plotOptions: {
          ...prev.plotOptions,
          pie: {
            ...prev.plotOptions?.pie,
            donut: {
              ...prev.plotOptions?.pie?.donut,
              labels: {
                ...prev.plotOptions?.pie?.donut?.labels,
                value: {
                  ...prev.plotOptions?.pie?.donut?.labels?.value,
                  color: isDark ? "#ffffff" : "#0f172a",
                },
              },
            },
          },
        },
      }));
    };

    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <article className="col-span-full transition-all duration-300 lg:col-span-4 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent rounded-2xl px-7 py-7 flex flex-col space-y-6 h-[280px] sm:h-[320px] lg:h-[350px] shadow-sm dark:shadow-2xl hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(139,92,235,0.1)]">
      <div>
        <h3 className="text-slate-800 dark:text-gray-200 font-semibold text-lg transition-colors">Traffic Sources</h3>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <Chart
          options={chartOptions}
          series={series}
          type="donut"
          width="100%"
          height="100%"
        />
      </div>
    </article>
  );
};
