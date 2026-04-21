"use client";
import {
  Users,
  UserCheck,
  Wallet,
  UserX,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { AnimationWrapper } from "./AnimationWrapper";
import NumberTicker from "./NumberTicker";

const CustomerCards = () => {
  const cards = [
    {
      id: 1,
      head: "Total Customers",
      value: 8,
      background: "bg-sky-500/15",
      hover: "border hover:border-sky-400/90 dark:border-transparent",
      icon: <Users className="text-sky-600 dark:text-sky-400" size={22} />,
      percent: "6.2",
      row: "up",
    },
    {
      id: 2,
      head: "Active Customers",
      value: 24,
      background: "bg-emerald-500/15",
      hover: "border hover:border-emerald-400/90 dark:border-transparent",
      icon: (
        <UserCheck
          className="text-emerald-600 dark:text-emerald-400"
          size={22}
        />
      ),
      percent: "4.8",
      row: "up",
    },
    {
      id: 3,
      head: "AVG. Order Value",
      value: 156,
      background: "bg-amber-500/15",
      hover: "border hover:border-amber-400/90 dark:border-transparent",
      icon: <Wallet className="text-amber-600 dark:text-amber-400" size={22} />,
      percent: "2.1",
      row: "up",
      unit: "$",
    },
    {
      id: 4,
      head: "Inactive Customers",
      value: 1,
      background: "bg-rose-500/15",
      hover: "border hover:border-rose-400/90 dark:border-transparent",
      icon: <UserX className="text-rose-600 dark:text-rose-400" size={22} />,
      percent: "1.4",
      row: "down",
    },
  ];

  return (
    <section className="mt-6 grid grid-cols-1 gap-4 min-[457px]:grid-cols-2 lg:grid-cols-4">
      {cards.map((item, index) => (
        <AnimationWrapper key={item.id} delay={index * 0.1}>
          <div
            className={`w-full rounded-[20px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 px-6 py-6 cursor-pointer ${item.hover} transition-all duration-300 shadow-sm dark:shadow-none`}
          >
            <div>
              <div className="flex gap-5 relative">
                <div className="flex flex-col">
                  <span className="text-slate-500 dark:text-slate-400 text-[12px]">
                    {item.head}
                  </span>
                  <span className="text-slate-900 dark:text-slate-100 text-[23px] font-semibold">
                    {item.unit}
                    <NumberTicker value={item.value} />
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
                    <TrendingUp
                      size={13}
                      className="text-green-600 dark:text-green-500"
                    />
                  ) : (
                    <TrendingDown
                      size={13}
                      className="text-red-600 dark:text-red-500"
                    />
                  )}
                  <span
                    className={`text-[10px] font-semibold ${item.row === "up" ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}
                  >
                    {item.percent}%
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  vs Last month
                </span>
              </div>
            </div>
          </div>
        </AnimationWrapper>
      ))}
    </section>
  );
};
export default CustomerCards;
