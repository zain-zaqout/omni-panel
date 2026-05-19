"use client";
import {
  FileDown,
  Calendar,
  ChevronDown,
  Search,
  FilterIcon,
} from "lucide-react";
import OrdersTable from "@/components/OrdersTable";
import { AnimationWrapper } from "@/components/AnimationWrapper";
import OrdersCards from "@/components/OrdersCards";
import { useState } from "react";
import { useOrders } from "@/contexts/OrderContext";

const Orders = () => {
  const [stockFilter, setstockFilter] = useState("All");
  const [searchTerm, setsearchTerm] = useState("");
  const Filter = ["All", "Paid", "Pending", "Failed", "Refunded"];

  const { orders } = useOrders();

  const filteredOrders = orders.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.products.toLowerCase().includes(searchTerm.toLowerCase())
    
    const stock_orders = {
      "All": true,
      "Paid": item.payment === "Paid",
      "Pending": item.payment === "Pending",
      "Failed": item.payment === "Failed",
      "Refunded": item.payment === "Refunded"
    }

    return matchesSearch && stock_orders[stockFilter]
  });

  return (
    <main className="bg-white dark:bg-slate-900 min-h-screen ml-0 min-[376px]:ml-15 lg:ml-55 pb-5 transition-colors">
      <div className="w-[96%] m-auto pt-5">
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-slate-900 dark:text-white text-3xl max-[376px]:text-2xl md:text-[32px] font-semibold">
              Orders Management
            </h2>
            <p className="text-slate-500 dark:text-gray-400 text-[12px]">
              Track and mange your customer orders securely.
            </p>
          </div>

          <div className="flex items-center gap-2 lg:w-auto lg:justify-end">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-4 py-2 text-slate-700 dark:text-slate-100 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-600 active:scale-90 cursor-pointer min-[400px]:w-auto">
              <Calendar size={16} className="text-violet-500 dark:text-violet-400" />
              <span className="text-sm font-medium">Last 30 Days</span>
              <ChevronDown size={14} className="text-slate-400 dark:text-slate-300" />
            </button>
          </div>
        </section>

        <OrdersCards />

        <section className="flex flex-col mt-4 mb-3 gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-97.5">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <label htmlFor="orders-search" className="sr-only">
              Search orders
            </label>
            <input
              id="orders-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 pl-10 pr-11 text-sm text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-[0_8px_20px_rgba(2,6,23,0.28)] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15"
              placeholder="Search by order ID or customer..."
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FilterIcon
                  size={18}
                  className="text-slate-400 group-focus-within:text-violet-500 transition-colors"
                />
              </div>
              <select
                value={stockFilter}
                onChange={(e) => setstockFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 cursor-pointer transition-all shadow-sm hover:border-slate-300 dark:hover:border-slate-600"
              >
                {Filter.map((status) => (
                  <option
                    key={status}
                    value={status}
                    className="bg-white dark:bg-[#1e293b] py-2"
                  >
                    {status}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown
                  size={18}
                  className="text-slate-400 group-focus-within:text-violet-400 transition-transform duration-300 group-focus-within:rotate-180"
                />
              </div>
            </div>

            <button className="flex w-auto items-center justify-center gap-1 rounded-2xl bg-violet-500 px-3.5 py-2 text-white shadow-sm transition-all duration-300 hover:bg-violet-600 active:scale-90 cursor-pointer">
              <FileDown size={16} />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </section>

        <AnimationWrapper delay={0.4}>
          <OrdersTable data={filteredOrders} />
        </AnimationWrapper>
      </div>
    </main>
  );
};

export default Orders;
