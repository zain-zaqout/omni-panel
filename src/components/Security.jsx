import { Lock } from "lucide-react";
import { Switch } from "./ui/Toggle";

const Security = () => {
  return (
    <section className="w-full bg-white dark:bg-slate-800 px-7 py-5 rounded-[20px] border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none transition-colors duration-300">
      <h2 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider">
        Security & Authentication
      </h2>
      <hr className="border-slate-100 dark:border-slate-700 w-full mt-3 mb-2" />
      
      <div>
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <h3 className="text-slate-800 dark:text-slate-200 text-[17px] font-semibold">
              Account Password
            </h3>
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              Update your password to keep your account secure
            </p>
          </div>
          <button className="bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm px-5 h-10 text-slate-700 dark:text-slate-300 font-semibold border border-slate-300 dark:border-slate-600 rounded-full w-full sm:w-auto transition-all active:scale-95 cursor-pointer">
            Change Password
          </button>
        </div>

        <hr className="border-slate-100 dark:border-slate-700 w-full" />
        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-violet-600 dark:text-violet-300 shadow-sm dark:shadow-[0_6px_16px_rgba(2,6,23,0.35)] transition-colors">
              <Lock size={20} />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-200 text-[17px] font-semibold">
                Two-Factor Authentication (2FA)
              </h3>
              <p className="text-slate-500 dark:text-slate-500 text-sm">
                Add an extra layer of security to your login
              </p>
            </div>
          </div>
          <div className="self-start sm:self-auto flex items-center">
            <Switch storageKey="2FA" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;