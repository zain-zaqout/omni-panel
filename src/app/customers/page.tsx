"use client";
import { Search, FileDown, ChevronDown, FilterIcon } from "lucide-react";
import { AnimationWrapper } from "@/components/AnimationWrapper";
import CustomerCards from "@/components/CustomerCards";
import CustomerTable from "@/components/CustomerTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CustomerStatus = "VIP" | "Active" | "New" | "Inactive";

type Customer = {
  id: string;
  name: string;
  status: CustomerStatus;
  location: string;
  lastOrder: string;
  spent: string;
  orders: number;
};

const CustomerPage = () => {
  const [stockFilter, setstockFilter] = useState("All");
  const [searchTerm, setsearchTerm] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const Filter = ["All", "VIP", "New", "Inactive"];

  const [customer, setCustomer] = useState<Customer[]>([
    {
      id: "CUST-001",
      name: "Khalil Al-Tamimi",
      status: "VIP",
      location: "Hebron, PS",
      lastOrder: "2026-03-15",
      spent: "5,400.00",
      orders: 12,
    },
    {
      id: "CUST-002",
      name: "Ibrahim Al-Qawasmi",
      status: "Active",
      location: "Hebron, PS",
      lastOrder: "2026-03-10",
      spent: "1,250.00",
      orders: 4,
    },
    {
      id: "CUST-003",
      name: "Jaber Al-Natsha",
      status: "New",
      location: "Hebron, PS",
      lastOrder: "2026-03-01",
      spent: "450.00",
      orders: 1,
    },
    {
      id: "CUST-004",
      name: "Tameem Al-Zughair",
      status: "Inactive",
      location: "Hebron, PS",
      lastOrder: "2025-11-20",
      spent: "2,100.00",
      orders: 8,
    },
    {
      id: "CUST-005",
      name: "Ahmad Al-Jaabari",
      status: "VIP",
      location: "Hebron, PS",
      lastOrder: "2026-03-12",
      spent: "4,800.00",
      orders: 15,
    },
    {
      id: "CUST-006",
      name: "Samer Al-Sharif",
      status: "Active",
      location: "Hebron, PS",
      lastOrder: "2026-03-08",
      spent: "920.00",
      orders: 3,
    },
    {
      id: "CUST-007",
      name: "Qais Al-Salhab",
      status: "New",
      location: "Hebron, PS",
      lastOrder: "2026-03-14",
      spent: "300.00",
      orders: 2,
    },
    {
      id: "CUST-008",
      name: "Zaid Al-Bakri",
      status: "Active",
      location: "Hebron, PS",
      lastOrder: "2026-03-05",
      spent: "1,150.00",
      orders: 5,
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1200);

    const local = localStorage.getItem("customer");
    if (local) {
      setCustomer(JSON.parse(local) as Customer[]);
    }
  }, []);

  const filteredCustomer = customer.filter((item) => {
    const matchesSearch =
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const stock_customer = {
      "All": true,
      "VIP": item.status === "VIP",
      "Active": item.status === "Active",
      "New": item.status === "New",
      "Inactive": item.status === "Inactive",
    };

    return matchesSearch && stock_customer[stockFilter];
  });

  const deletOrder = (id: string) => {
    const filter = customer.filter((i) => i.id !== id);
    
    const promise = new Promise((resolve) => setTimeout(resolve, 2500));

  toast.promise(promise, {
    loading: 'Loading',
    success: () => {
      setCustomer(filter)
      localStorage.setItem("customer", JSON.stringify(filter))
      return `Success In Add Product`;
    },
    error: 'عذراً، حدث خطأ أثناء التحديث',
    });
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen ml-0 min-[376px]:ml-15 lg:ml-55 transition-colors duration-300">
      <div className="m-auto w-[96%] pb-6 pt-5">
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-slate-900 dark:text-white text-3xl max-[376px]:text-2xl md:text-[32px] font-semibold">
              Customers
            </h2>
            <p className="text-[12px] text-slate-500 dark:text-slate-400">
              Manage customer profiles and recent activity.
            </p>
          </div>
        </section>
        <CustomerCards />
        <section className="flex flex-col mt-4 gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-97.5">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <label htmlFor="orders-search" className="sr-only">
              Search customers
            </label>
            <input
              id="orders-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 pl-10 pr-11 text-sm text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-[0_8px_20px_rgba(2,6,23,0.28)] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15"
              placeholder="Search by customer name or location..."
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
                className="block w-full pl-10 pr-10 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 cursor-pointer transition-all shadow-sm dark:shadow-xl hover:border-slate-300 dark:hover:border-slate-600"
              >
                {Filter.map((status) => (
                  <option
                    key={status}
                    value={status}
                    className="bg-white dark:bg-[#1e293b] text-slate-900 dark:text-slate-200 py-2"
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
            <button className="flex w-auto items-center justify-center gap-1 rounded-2xl bg-violet-600 dark:bg-violet-500 px-3.5 py-2 text-white dark:text-violet-100 shadow-sm transition-all duration-300 hover:bg-violet-700 dark:hover:bg-violet-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] active:scale-90 cursor-pointer">
              <FileDown size={16} />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </section>
        <AnimationWrapper delay={0.4}>
          <CustomerTable data={filteredCustomer} isLoading={isLoading} />
        </AnimationWrapper>
      </div>
    </main>
  );
};

export default CustomerPage;
