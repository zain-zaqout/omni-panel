"use client";
import { motion } from "framer-motion";

const sources = [
  { label: "Direct", value: 45, color: "bg-violet-500 dark:bg-violet-400" },
  { label: "Organic Search", value: 32, color: "bg-green-500 dark:bg-green-400" },
  { label: "Social Media", value: 18, color: "bg-blue-600 dark:bg-blue-400" },
  { label: "Other", value: 5, color: "bg-orange-500 dark:bg-orange-400" },
];

const TrafficSources = () => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="col-span-full border border-slate-100 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-none transition-all duration-300 lg:col-span-4 w-full bg-white dark:bg-slate-800 rounded-2xl px-7 py-7 flex flex-col space-y-10 lg:h-[350px] shadow-sm"
    >
      <div>
        <h3 className="text-slate-800 dark:text-slate-100 font-bold text-lg">
          Traffic Sources
        </h3>
      </div>
      <div className="flex flex-col space-y-5">
        {sources.map((source, index) => (
          <div key={source.label} className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                <span className={`size-2 rounded-full ${source.color}`} />
                {source.label}
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {source.value}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${source.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${source.value}%` }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.1 + index * 0.08,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.article>
  );
};

export default TrafficSources;