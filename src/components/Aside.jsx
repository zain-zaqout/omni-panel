"use client";
import {
  BarChart3,
  Box,
  LayoutDashboard,
  Loader2,
  LogOut,
  ShoppingCart,
  Users2,
  X,
} from "lucide-react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMenu } from "@/contexts/MenuContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useProduct } from "@/contexts/EditProductContext";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/UserContext";
import { toast } from "sonner";

const Aside = () => {

  const [Loading, setLoading] = useState(false)
  const router = useRouter();

  const pathName = usePathname();
  const { Menu, setMenu } = useMenu();
  const { setProducts } = useProduct()
  const { setCurrentUser } = useAuth()
  const { setdisplayName, seteditName } = useData()

  if (pathName === "/profile" || pathName === "/login" || pathName === "/signup" || pathName === "/verify-email" || pathName === "/forgot-password") {
    return null;
  }

  const cards = [
    {
      id: 1,
      link: "/",
      icon: <LayoutDashboard size={18} />,
      head: "Dashboard",
    },
    { id: 2, link: "/products", icon: <Box size={18} />, head: "Products" },
    {
      id: 3,
      link: "/orders",
      icon: <ShoppingCart size={18} />,
      head: "Orders",
    },
    {
      id: 4,
      link: "/customers",
      icon: <Users2 size={18} />,
      head: "Customers",
    },
    {
      id: 5,
      link: "/analytics",
      icon: <BarChart3 size={18} />,
      head: "Analytics",
    },
  ];

  const logOut = async () => {
    setLoading(true)
    try {

      await deleteCookie("firebase_token");
      await signOut(auth);

      localStorage.clear();
      setProducts([]);
      setCurrentUser(null)
      setMenu(false)
      seteditName("Loading User...")
      setdisplayName("Loading User...")

      router.replace("/login");

      toast.success("Successfully logged out!");
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    } catch (error) {
      toast.error("some thing went error!")
      setLoading(false)
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setMenu(false)}
        className={`fixed inset-0 z-30 bg-black/40 min-[376px]:hidden ${Menu ? "block" : "hidden"
          }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-55 border-r border-slate-200 dark:border-gray-700 bg-white dark:bg-slate-800 transition-transform duration-300 min-[376px]:w-15 min-[376px]:translate-x-0 lg:w-55 ${Menu ? "translate-x-0" : "-translate-x-full"
          } min-[376px]:flex`}
      >
        <div className="flex h-full w-full flex-col">
          <div className="flex h-[9vh] items-center justify-between border-b border-slate-200 dark:border-gray-700 px-4 min-[376px]:justify-center min-[376px]:px-2 lg:justify-start lg:px-4">
            <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">
              <span className="hidden min-[376px]:inline lg:hidden">NS</span>
              <span className="text-lg min-[376px]:hidden lg:inline">
                Nex<span className="text-violet-500">Store</span>
              </span>
            </h3>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
              className="min-[376px]:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-gray-300 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="mx-auto w-full py-6 lg:w-[88%] lg:px-0">
              <span className="hidden text-[10px] font-bold uppercase tracking-[2px] text-slate-400 dark:text-gray-400 lg:block mb-4 px-3">
                Main Menu
              </span>

              <ul className="space-y-1.5">
                {cards.map((item) => {
                  const isActive =
                    item.link === "/"
                      ? pathName === "/"
                      : pathName.startsWith(item.link);
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.link}
                        onClick={() => setMenu(false)}
                        className={`flex w-full relative cursor-pointer items-center justify-start gap-3 rounded-xl px-4 py-2.5 text-left font-medium transition-all duration-200 active:scale-95 min-[376px]:justify-center min-[376px]:px-2 lg:justify-start lg:px-4 ${isActive
                          ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 shadow-sm"
                          : "text-slate-500 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700/70 hover:text-slate-900 dark:hover:text-white"
                          }`}
                      >
                        {item.icon}
                        <span className="hidden lg:inline text-sm">
                          {item.head}
                        </span>
                        <span className="inline min-[376px]:hidden text-sm">
                          {item.head}
                        </span>

                        {item.head === "Orders" && (
                          <span className="hidden lg:flex absolute right-4 text-[11px] font-bold items-center justify-center w-5 h-5 bg-violet-500 text-white rounded-full">
                            12
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-auto border-t flex items-center border-slate-200 dark:border-gray-600/90 px-3 h-16 lg:px-6">
              <button
                className="flex w-full focus:ring-2 
             focus:ring-red-500 
             focus:ring-offset-2 dark:focus:ring-offset-slate-800 items-center justify-center gap-2 rounded-xl bg-red-100 dark:bg-red-500/20 py-2.5 transition-all duration-200 hover:bg-red-200 dark:hover:bg-red-500/30 group cursor-pointer"
                onClick={logOut}
                disabled={Loading}
              >
                {
                  Loading ? (
                    <>
                      <span><Loader2 className="animate-spin text-red-500" /></span>
                    </>
                  ) : (
                    <>
                      <LogOut size={16} className="text-red-500 dark:text-red-400" />
                      <span className="hidden text-sm font-bold text-red-600 dark:text-red-300 lg:inline">
                        Log Out
                      </span>
                    </>
                  )
                }
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;