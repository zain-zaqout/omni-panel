"use client";
import { ReceiptText, CreditCard, Package, PackageCheck } from "lucide-react";
import { AnimationWrapper } from "./AnimationWrapper";
import NumberTicker from "./NumberTicker";

const OrdersCards = () => {
  const cards = [
    {
      id: 1,
      head: "Total Orders",
      value: 1245,
      background: "bg-sky-500/10 dark:bg-sky-500/15",
      hover: "border-slate-100 dark:border-transparent hover:border-sky-400/50 dark:hover:border-sky-400/85",
      textColor: "text-sky-600 dark:text-sky-400",
      label: "+12%",
      icon: <ReceiptText size={20} />,
    },
    {
      id: 2,
      head: "Pending Payment",
      value: 4320,
      background: "bg-amber-500/10 dark:bg-amber-500/15",
      hover: "border-slate-100 dark:border-transparent hover:border-amber-400/50 dark:hover:border-amber-400/90",
      textColor: "text-amber-600 dark:text-amber-400",
      label: "8 pending",
      icon: <CreditCard size={21} />,
      unit: "$",
    },
    {
      id: 3,
      head: "Processing",
      value: 45,
      background: "bg-violet-500/10 dark:bg-violet-500/15",
      hover: "border-slate-100 dark:border-transparent hover:border-violet-400/50 dark:hover:border-violet-400/90",
      textColor: "text-violet-600 dark:text-violet-400",
      label: "Active",
      icon: <Package size={20} />,
    },
    {
      id: 4,
      head: "Delivered",
      value: 128,
      background: "bg-emerald-500/10 dark:bg-emerald-500/15",
      hover: "border-slate-100 dark:border-transparent hover:border-emerald-400/50 dark:hover:border-emerald-400/90",
      textColor: "text-emerald-600 dark:text-emerald-400",
      label: "Today",
      icon: <PackageCheck size={22} />,
    },
  ];

  return (
    <section className="mt-5 grid grid-cols-1 gap-4 min-[457px]:grid-cols-2 lg:grid-cols-4">
      {cards.map((item, index) => (
        <AnimationWrapper key={item.id} delay={index * 0.1}>
          <div
            className={`w-full relative rounded-[20px] border border-slate-200/60 dark:border-slate-700/50 flex justify-between bg-white dark:bg-slate-800 px-6 py-5 ${item.hover} cursor-pointer transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-slate-900/20`}
          >
            <div className="flex flex-col space-y-3">
              <span
                className={`w-10 h-10 flex items-center justify-center rounded-2xl ${item.background} ${item.textColor} transition-colors`}
              >
                {item.icon}
              </span>
              
              <div className="space-y-0.5">
                <p className="text-slate-500 dark:text-slate-400 text-[13px] font-medium">
                  {item.head}
                </p>
                <div className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">
                  {item.unit}
                  <NumberTicker value={item.value} />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start">
              <span
                className={`inline-flex items-center ${item.background} ${item.textColor} px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider`}
              >
                {item.label}
              </span>
            </div>
          </div>
        </AnimationWrapper>
      ))}
    </section>
  );
};

export default OrdersCards;