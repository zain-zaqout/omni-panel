import { IdCard, Mail, Phone, User } from "lucide-react";
import { useData } from "@/contexts/UserContext";
import { useRef, useEffect } from "react";

const PersonalDetails = () => {
  const {
    displayName,
    editName,
    seteditName,
    showActions
  } = useData();

  const inputFocusRef = useRef(null);

  useEffect(() => {
    if (showActions && inputFocusRef.current) {
      inputFocusRef.current.focus();
    }
  }, [showActions]);

  const email = "alex.thompson@shopadmin.com";
  const phone = "+1 (555) 123-4567";

  return (
    <section className="w-full bg-white dark:bg-slate-800 px-7 py-5 rounded-[20px] border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none transition-colors duration-300">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider">
          Personal Details
        </h2>
        <hr className="border-slate-100 dark:border-slate-700 w-full my-3" />

        <div className="grid grid-cols-1 space-y-4 md:grid-cols-2 md:gap-6 md:space-y-0 mx-auto pt-2">
          <div className="relative w-full">
            <label htmlFor="editName" className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-1">
              Full Name
            </label>
            <div className="relative mt-1.5">
              <User
                size={20}
                className={`${showActions ? "text-violet-500" : "text-slate-400"} pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors`}
              />
              <input
                ref={inputFocusRef}
                id="editName"
                type="text"
                className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm transition-all duration-200 outline-none 
                  ${showActions
                    ? "border-violet-500 bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 shadow-[0_0_0_4px_rgba(139,92,246,0.1)]"
                    : "border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                  }`}
                value={showActions ? editName : displayName}
                readOnly={!showActions}
                onChange={(e) => seteditName(e.target.value)}
              />
            </div>
          </div>
          <div className="relative w-full">
            <label htmlFor="email" className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-1">
              Email Address
            </label>
            <div className="relative mt-1.5">
              <Mail size={19} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                id="email"
                className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-4 text-sm text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed"
                value={email}
                readOnly
              />
            </div>
          </div>
          <div className="relative w-full">
            <label htmlFor="phone" className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-1">
              Phone Number
            </label>
            <div className="relative mt-1.5">
              <Phone
                size={19}
                className={`${showActions ? "text-violet-500" : "text-slate-400"} pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors`}
              />
              <input
                id="phone"
                type="text"
                className="h-11 w-full rounded-xl border pl-10 pr-4 text-sm transition-all duration-200 outline-none
                 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-slate-500 
                 dark:text-slate-400 cursor-not-allowed"
                value={phone}
                readOnly
              />
            </div>
          </div>
          <div className="relative w-full">
            <label htmlFor="role" className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-1">
              Role
            </label>
            <div className="relative mt-1.5">
              <IdCard size={21} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="role"
                type="text"
                className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-4 text-sm text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed"
                value="E-commerce Manager"
                readOnly
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PersonalDetails;
