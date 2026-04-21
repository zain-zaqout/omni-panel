import { TableSkeleton } from "./ui/TableSkeleton";

const CustomerTable = ({ data, isLoading }) => {
  
  const avatarTone = [
    "from-sky-500/25 to-sky-400/15 text-sky-600 dark:text-sky-200",
    "from-emerald-500/25 to-emerald-400/15 text-emerald-600 dark:text-emerald-200",
    "from-violet-500/25 to-violet-400/15 text-violet-600 dark:text-violet-200",
    "from-amber-500/25 to-amber-400/15 text-amber-600 dark:text-amber-200",
    "from-rose-500/25 to-rose-400/15 text-rose-600 dark:text-rose-200",
  ];

  const getInitials = (name: any) =>
    name.split(" ").map((n: any) => n[0]).join("").slice(0, 2).toUpperCase();

  const englishDate = new Intl.DateTimeFormat("en-US", {
    month: "short", day: "2-digit", year: "numeric", timeZone: "UTC",
  });

  const formatEnglishDate = (dateValue: string) => {
    if (!dateValue) return "";
    const [year, month, day] = dateValue.split("-").map(Number);
    return englishDate.format(new Date(Date.UTC(year, month - 1, day)));
  };

  return (
    <section className="mt-3 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 shadow-sm dark:shadow-[0_14px_30px_rgba(2,6,23,0.35)] transition-colors duration-300">
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-215 w-full text-left">
          <thead className="bg-slate-50/80 dark:bg-slate-900/55 border-b border-slate-200 dark:border-slate-700/50">
            <tr className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4 text-center">Status</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4 text-right">Last Order</th>
              <th className="px-5 py-4 text-right">Total Spend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/70">
            {isLoading ? (
              [...Array(4)].map((_, i) => <TableSkeleton key={i} index={i}/>)
            ) : (
              data.map((customer, index) => (
                <tr key={customer.id} className="transition-colors duration-200 hover:bg-slate-50/50 dark:hover:bg-slate-700/25">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-600 bg-linear-to-br text-xs font-semibold ${avatarTone[index % avatarTone.length]}`}>
                        {getInitials(customer.name)}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{customer.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-[12px] px-3 py-px rounded-full font-medium ${
                      customer.status === "VIP" ? "bg-violet-100 text-violet-700 dark:bg-violet-500/12 dark:text-violet-300" :
                      customer.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/12 dark:text-emerald-300" :
                      customer.status === "New" ? "bg-sky-100 text-sky-700 dark:bg-sky-500/12 dark:text-sky-300" :
                      "bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300"
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{customer.location}</td>
                  <td className="px-5 py-4 text-right text-sm text-slate-600 dark:text-slate-300">{formatEnglishDate(customer.lastOrder)}</td>
                  <td className="px-5 py-4 text-right">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">${customer.spent}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{customer.orders} orders</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CustomerTable;