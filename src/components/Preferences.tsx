import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Preferences = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const legacyTheme = localStorage.getItem("mood");
    if (legacyTheme === "dark" || legacyTheme === "light") {
      setTheme(legacyTheme);
      localStorage.removeItem("mood");
    }
  }, [setTheme]);

  const activeTheme = mounted && resolvedTheme ? resolvedTheme : "dark";
  return (
    <section className="w-full bg-white dark:bg-slate-800 px-6 py-5 rounded-[20px] border border-slate-200 dark:border-slate-700 transition-colors duration-300 shadow-sm dark:shadow-none">
      <div className="flex flex-col mb-4">
        <h2 className="text-slate-900 dark:text-slate-200 font-bold">
          Preferences
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Manage appearance
        </span>
      </div>

      <hr className="border-slate-100 dark:border-slate-700 w-full mb-5" />

      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 transition-colors">
              {activeTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-200 text-[15px] font-semibold">
                Theme
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Switch between light and dark modes
              </p>
            </div>
          </div>
          <div className="flex items-center border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 rounded-full p-1 w-fit shadow-inner transition-colors">
            <button
              className={`cursor-pointer px-4 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-2 ${activeTheme === "dark" ? "bg-violet-500 text-white shadow-md" : "text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white"}`}
              onClick={() => {
                setTheme("dark");
              }}
            >
              <Moon size={14} /> Dark
            </button>
            <button
              className={`cursor-pointer px-4 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-2 ${activeTheme === "light" ? "bg-violet-500 text-white shadow-md" : "text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white"}`}
              onClick={() => {
                setTheme("light");
              }}
            >
              <Sun size={14} /> Light
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Preferences;
