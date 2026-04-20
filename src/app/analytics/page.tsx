"use client";
import dynamic from "next/dynamic";
import {
  Calendar,
  ChevronDown,
  FileDown,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  BadgeDollarSign,
} from "lucide-react";
import AreaChart from "@/components/AreaChart";
import { PieChart } from "@/components/PieChart";
import TrafficSources from "@/components/TrafficSources";
import ColumnChart from "@/components/ColumnChart";
import { AnimationWrapper } from "@/components/AnimationWrapper";
import NumberTicker from "@/components/NumberTicker";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-87.5 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />
  ),
});

const Analytice = () => {
  const cards = [
    {
      id: 3,
      head: "Active Visitors",
      value: 1208,
      background: "bg-blue-500/15 dark:bg-[#155dfb33]",
      hover: "border border-transparent hover:border-blue-500/50 dark:hover:border-blue-500/85",
      icon: <Users className="text-blue-600 dark:text-blue-500" size={20} />,
      percent: "8.1",
      row: "up",
    },
    {
      id: 2,
      head: "Total Orders",
      value: 3450,
      background: "bg-violet-500/15 dark:bg-[#7f22fe33]",
      hover: "border border-transparent hover:border-violet-500/50 dark:hover:border-violet-500/80",
      icon: <ShoppingCart className="text-violet-600 dark:text-violet-500" size={24} />,
      percent: "5.2",
      row: "up",
    },
    {
      id: 1,
      head: "Total Revenue",
      value: 128490,
      background: "bg-green-500/15 dark:bg-[#00c95026]",
      hover: "border border-transparent hover:border-green-500/50 dark:hover:border-green-500/90",
      icon: <DollarSign className="text-green-600 dark:text-green-400" size={23} />,
      percent: "12.5",
      row: "up",
      unit: "$"
    },
    {
      id: 4,
      head: "Avg Order Value",
      value: 84,
      background: "bg-amber-500/15 dark:bg-[#f5490033]",
      hover: "border border-transparent hover:border-amber-600/50 dark:hover:border-amber-600/90",
      icon: <BadgeDollarSign className="text-amber-600" size={20} />,
      percent: "1.4",
      row: "down",
    },
  ];

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen ml-0 min-[376px]:ml-15 lg:ml-55 transition-colors duration-300">
      <div className="w-[96%] m-auto pt-5">
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-slate-900 dark:text-white text-3xl max-[376px]:text-2xl md:text-[32px] font-semibold">
              Performance Overview
            </h2>
            <p className="text-slate-500 dark:text-gray-400 text-[12px]">
              Real-time data insights for Global Store Operations
            </p>
          </div>
          <div className="flex items-center gap-2 lg:w-auto lg:justify-end">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-700 dark:text-slate-100 shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-600 active:scale-90 cursor-pointer min-[400px]:w-auto">
              <Calendar size={16} className="text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium">Last 30 Days</span>
              <ChevronDown size={14} className="text-slate-400 dark:text-slate-300" />
            </button>
          </div>
        </section>
        <section className="mt-6 grid grid-cols-1 gap-4 min-[457px]:grid-cols-2 lg:grid-cols-4 pb-2.5">
          {cards.map((item, index) => (
            <AnimationWrapper key={item.id} delay={index * 0.1}>
              <div
                className={`w-full rounded-[20px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-transparent px-6 py-6 cursor-pointer ${item.hover} transition-all duration-300 shadow-sm dark:shadow-none`}
              >
                <div>
                  <div className="flex gap-5 relative">
                    <div className="flex flex-col">
                      <span className="text-slate-500 dark:text-slate-400 text-[12px]">
                        {item.head}
                      </span>
                      <span className="text-slate-900 dark:text-slate-100 text-[23px] font-semibold">
                        {item.unit}
                        <NumberTicker value={item.value}/>
                      </span>
                    </div>
                    <div
                      className={`w-9 h-9 absolute right-0 top-1 flex items-center justify-center rounded-full ${item.background}`}
                    >
                      <span className="absolute">{item.icon}</span>
                    </div>
                  </div>
                  <div className="inline-flex justify-between w-full pt-3">
                    <div
                      className={`flex items-center gap-1 w-fit px-2 py-0.5 rounded-lg ${item.row === "up" ? "bg-green-500/15" : "bg-red-500/15"}`}
                    >
                      {item.row === "up" ? (
                        <TrendingUp size={13} className="text-green-600 dark:text-green-500" />
                      ) : (
                        <TrendingDown size={13} className="text-red-600 dark:text-red-500" />
                      )}
                      <span
                        className={`text-[10px] font-semibold ${item.row === "up" ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}
                      >
                        {item.percent}%
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-400">
                      vs Last month
                    </span>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          ))}
        </section>

        <section className="flex justify-end pb-2.5">
          <button className="flex items-center justify-end gap-2 rounded-2xl bg-violet-600 dark:bg-violet-500 px-4 py-2 text-white dark:text-violet-100 shadow-md transition-all duration-300 hover:bg-violet-700 dark:hover:bg-violet-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-90 cursor-pointer w-auto">
            <FileDown size={16} />
            <span className="text-sm font-medium">Export</span>
          </button>
        </section>
        <section className="rounded-xl grid grid-cols-1 gap-5 md:grid-cols-12 lg:grid-cols-13 pb-4">
          <AnimationWrapper
            delay={0.4}
            className="col-span-full md:col-span-8 lg:col-span-9"
          >
            <AreaChart />
          </AnimationWrapper>
          <AnimationWrapper
            delay={0.5}
            className="col-span-full h-full md:col-span-4 lg:col-span-4"
          >
            <PieChart />
          </AnimationWrapper>
        </section>
        <section className="rounded-xl grid grid-cols-1 gap-5 md:grid-cols-12 lg:grid-cols-13 pb-4">
          <AnimationWrapper
            delay={0.6}
            className="col-span-full md:col-span-4 lg:col-span-4"
          >
            <TrafficSources />
          </AnimationWrapper>
          <AnimationWrapper
            delay={0.7}
            className="col-span-full md:col-span-8 lg:col-span-9"
          >
            <ColumnChart />
          </AnimationWrapper>
        </section>
      </div>
    </main>
  );
};

export default Analytice;