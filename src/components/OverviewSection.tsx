"use client";
import {
  Calendar,
  ChevronDown,
  FileDown,
  DollarSign,
  User,
  Percent,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
} from "lucide-react";
import OrdersTable from "./OrdersTable";
import TrafficSources from "./TrafficSources";
import { AnimationWrapper } from "./AnimationWrapper";
import NumberTicker from "./NumberTicker";
import AreaChart from "./AreaChart";
import { useOrders } from "@/contexts/OrderContext";
import { useData } from "@/contexts/UserContext";

const OverviewSection = () => {
  const { displayName } = useData();
  const sayHello = displayName?.split(" ")[0] || "User";

  
  const cards = [
    {
      id: 1,
      head: "Total Revenue",
      value: 124592,
      background: "bg-green-50 dark:bg-green-500/10",
      hover:
        "hover:border-green-200 dark:hover:border-green-500/50 hover:shadow-md",
      icon: (
        <DollarSign className="text-green-600 dark:text-green-400" size={23} />
      ),
      percent: "12.5",
      row: "up",
      unit: "$",
    },
    {
      id: 2,
      head: "Active Users",
      value: 14203,
      background: "bg-violet-50 dark:bg-violet-500/10",
      hover:
        "hover:border-violet-200 dark:hover:border-violet-500/50 hover:shadow-md",
      icon: <User className="text-violet-600 dark:text-violet-400" size={24} />,
      percent: "5.2",
      row: "up",
      unit: "",
    },
    {
      id: 3,
      head: "New Orders",
      value: 1492,
      background: "bg-blue-50 dark:bg-blue-500/10",
      hover:
      "hover:border-blue-200 dark:hover:border-blue-500/50 hover:shadow-md",
      icon: (
        <ShoppingCart className="text-blue-600 dark:text-blue-400" size={20} />
      ),
      percent: "8.1",
      row: "up",
      unit: "",
    },
    {
      id: 4,
      head: "Conversion Rate",
      value: 4,
      background: "bg-orange-50 dark:bg-orange-500/10",
      hover:
      "hover:border-orange-200 dark:hover:border-orange-500/50 hover:shadow-md",
      icon: (
        <Percent className="text-orange-600 dark:text-orange-400" size={20} />
      ),
      percent: "0.4",
      row: "down",
      unit: "%",
    },
  ];
  
  const { orders } = useOrders();

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-5 ml-0 min-[376px]:ml-15 lg:ml-55 transition-colors duration-300">
      <div className="w-[96%] m-auto pt-5">
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-slate-800 dark:text-slate-100 text-3xl max-[376px]:text-2xl md:text-[32px] font-bold tracking-tight">
              Dashboard Overview
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Hello{" "}
              <span className="text-violet-600 dark:text-violet-400 font-semibold">
                {sayHello}
              </span>
              , here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          <div className="flex items-center gap-2 lg:w-auto lg:justify-end">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-700 dark:text-slate-300 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-sm active:scale-95 cursor-pointer min-[400px]:w-auto">
              <Calendar
                size={16}
                className="text-violet-500 dark:text-violet-400"
              />
              <span className="text-sm font-semibold">Last 30 Days</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 max-[389px]:px-1 py-2 text-white shadow-md shadow-violet-200 dark:shadow-none transition-all duration-300 hover:bg-violet-700 active:scale-95 cursor-pointer min-[400px]:w-auto">
              <FileDown size={16} />
              <span className="text-sm font-semibold">Export</span>
            </button>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 min-[457px]:grid-cols-2 lg:grid-cols-4 pb-5">
          {cards.map((item, index) => (
            <AnimationWrapper key={item.id} delay={index * 0.1}>
              <div
                className={`w-full rounded-[20px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-6 cursor-pointer shadow-sm ${item.hover} transition-all duration-300`}
              >
                <div className="flex gap-5 relative">
                  <div className="flex flex-col">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                      {item.head}
                    </span>
                    <span className="text-slate-800 dark:text-slate-100 text-2xl font-bold mt-1">
                      {item.unit}
                      <NumberTicker value={item.value} />
                    </span>
                  </div>
                  <div
                    className={`w-10 h-10 absolute right-0 top-0 flex items-center justify-center rounded-2xl ${item.background}`}
                  >
                    {item.icon}
                  </div>
                </div>
                <div className="inline-flex justify-between items-center w-full pt-4">
                  <div
                    className={`flex items-center gap-1 w-fit px-2 py-1 rounded-lg ${
                      item.row === "up"
                        ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {item.row === "up" ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    <span className="text-xs font-bold">{item.percent}%</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    vs Last month
                  </span>
                </div>
              </div>
            </AnimationWrapper>
          ))}
        </section>

        <section className="grid grid-cols-1 mb-4 gap-5 lg:grid-cols-13">
          <AnimationWrapper
            delay={0.4}
            className="col-span-full lg:col-span-9 bg-white dark:bg-slate-800 rounded-[20px] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm transition-colors duration-300"
          >
            <AreaChart />
          </AnimationWrapper>
          <AnimationWrapper
            delay={0.5}
            className="col-span-full lg:col-span-4 bg-white dark:bg-slate-800 rounded-[20px] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm transition-colors duration-300"
          >
            <TrafficSources />
          </AnimationWrapper>
        </section>

        <AnimationWrapper
          delay={0.6}
          className="bg-white dark:bg-slate-800 rounded-[20px] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm transition-colors duration-300"
        >
          <OrdersTable data={orders.slice(0, 3)} />
        </AnimationWrapper>
      </div>
    </main>
  );
};

export default OverviewSection;
