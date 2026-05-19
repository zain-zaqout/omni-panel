import { ChevronsRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TableSkeleton } from "./ui/TableSkeleton";

const avatarTone = [
  "from-sky-100 to-sky-50 text-sky-600 border-sky-200 dark:from-sky-900/30 dark:to-sky-800/20 dark:text-sky-400 dark:border-sky-800",
  "from-emerald-100 to-emerald-50 text-emerald-600 border-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/20 dark:text-emerald-400 dark:border-emerald-800",
  "from-violet-100 to-violet-50 text-violet-600 border-violet-200 dark:from-violet-900/30 dark:to-violet-800/20 dark:text-violet-400 dark:border-violet-800",
  "from-amber-100 to-amber-50 text-amber-600 border-amber-200 dark:from-amber-900/30 dark:to-amber-800/20 dark:text-amber-400 dark:border-amber-800",
  "from-rose-100 to-rose-50 text-rose-600 border-rose-200 dark:from-rose-900/30 dark:to-rose-800/20 dark:text-rose-400 dark:border-rose-800",
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
    
const englishDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

const formatEnglishDate = (dateValue) => {
  const [year, month, day] = dateValue.split("-").map(Number);
  return englishDate.format(new Date(Date.UTC(year, month - 1, day)));
};

const OrdersTable = ({ data }) => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false)
    }, 1200);
  }, [])
  
  const path = usePathname();
  const isOrdersPage = path === "/orders";
  
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all duration-300">
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-215 w-full text-left">
          <thead className="bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
            <tr className="text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <th className="px-5 py-4">Order ID</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Products</th>
              <th className="px-5 py-4 text-center">Payment</th>
              <th className="px-5 py-4 text-right">Date</th>
              <th className="px-5 py-4 text-right">Total</th>
              
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {isLoading ? (
              [...Array(4)].map((_, u) => (<TableSkeleton key={u} a={u}/>))
            ) : (
            data.map((order, index) => (
              <tr
                key={order.id}
                className="transition-colors duration-200 hover:bg-slate-50/50 dark:hover:bg-slate-900/30"
              >
                <td className="px-5 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {order.id}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border bg-linear-to-br text-xs font-bold transition-colors ${avatarTone[index % avatarTone.length]}`}
                    >
                      {getInitials(order.customer)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {order.customer}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {order.customerId}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {order.products}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {order.products.length} items
                  </p>
                </td>
                <td className="px-5 py-4 text-center">
                  {order.payment === "Paid" ? (
                      <span className="text-[12px] px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-medium">
                        {order.payment}
                      </span>
                    ) : order.payment === "Pending" ? (
                      <span className="text-[12px] px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-medium">
                        {order.payment}
                      </span>
                    ) : order.payment === "Failed" ? (
                      <span className="text-[12px] px-3 py-1 rounded-full bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 font-medium">
                        {order.payment}
                      </span>
                    ) : order.payment === "Refunded" ? (
                          <span className="text-[12px] px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                            {order.payment}
                          </span>
                    ) : null
                    }
                </td>
                <td className="px-5 py-4 text-right text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {formatEnglishDate(order.date)}
                </td>
                <td className="px-5 py-4 text-right text-sm font-bold text-slate-900 dark:text-slate-100">
                  ${order.total}
                </td>
                
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-900/30">
        <div className="py-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          Showing 5 of {data.length} orders
        </div>
        {isOrdersPage ? (
          <div className="flex items-center gap-2 py-3">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-600 bg-violet-600 text-xs font-bold text-white transition-all duration-200 shadow-sm shadow-violet-200 dark:shadow-none">
              1
            </button>
            {[1, 2, "...", 7].map((page, i) => (
              <button
                key={i}
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all duration-200 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 active:scale-95"
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="flex justify-center h-8 w-8 items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all duration-200 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 active:scale-95"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        ) : (
          <div>
            <Link href="/orders">
              <span className="text-violet-600 dark:text-violet-400 text-sm font-bold cursor-pointer hover:text-violet-700 dark:hover:text-violet-300 transition-colors duration-300">
                View All
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrdersTable;
