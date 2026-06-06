"use client";
import { Bell, Sun, User, Moon, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useData } from "@/contexts/UserContext";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useMenu } from "@/contexts/MenuContext";

const Navbar = () => {
  const pathName = usePathname();

  const { displayName } = useData();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const name = displayName.toLowerCase();
  const sayHello = displayName === "User" ?
    <span className="h-2 w-7 inline-block bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    : displayName.toLowerCase().split(" ")[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  const { setMenu } = useMenu();

  const isDark = mounted && resolvedTheme === "dark";

  if (pathName === "/profile" || pathName === "/login" || pathName === "/signup" || pathName === "/verify-email") {
    return null;
  }

  const getTitle = () => {
    if (pathName === "/") return "Overview";
    const title = pathName.split("/")[1];
    return title.charAt(0).toUpperCase() + title.slice();
  };

  return (
    <header
      className="sticky top-0 z-20 h-[9vh]
      bg-white/80 dark:bg-slate-800/80 backdrop-blur-md 
      text-slate-900 dark:text-white 
      ml-0 min-[376px]:ml-15 lg:ml-55 
      flex border-b border-slate-200 dark:border-gray-700 
      transition-all duration-300"
    >
      <div className="w-[95%] m-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Menu
            size={19}
            className="min-[376px]:hidden"
            onClick={() => setMenu(true)}
          />
          <div className="flex flex-col">
            <h2 className="text-sm lg:text-base font-bold tracking-tight text-slate-800 dark:text-slate-100">
              {getTitle()}
            </h2>
            <p className="hidden lg:block capitalize text-[10px] text-slate-500 dark:text-gray-400">
              Welcome back, {sayHello}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 min-[376px]:gap-2">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-gray-400 transition-colors cursor-pointer"
          >
            {mounted ? (
              isDark ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )
            ) : (
              <Moon size={19} />
            )}
          </button>
          <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-gray-400 transition-colors cursor-pointer">
            <Bell size={19} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
          </button>
          <div className="h-6 w-px bg-slate-200 dark:bg-gray-700 mx-1"></div>
          <Link
            href="/profile"
            className="flex items-center gap-3 pl-1 group cursor-pointer"
          >
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-xs capitalize font-bold text-slate-800 dark:text-white group-hover:text-violet-500 transition-colors">
                {name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-gray-400">
                Platform Manager
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30">
              <User size={20} />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
