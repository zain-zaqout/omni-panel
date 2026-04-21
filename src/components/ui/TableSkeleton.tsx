"use client";
import { usePathname } from "next/navigation";

export const TableSkeleton = ({ index }) => {
  const path = usePathname();

  return (
    <tr
      className="animate-pulse"
      style={{
        animationDelay: `${index * 100}ms`,
        animationDuration: "1.2s",
      }}
    >
      {path === "/products" ? (
        <>
          <td className="px-5 py-4">
            <div className="space-y-2">
              <div className="h-4 w-16 rounded bg-slate-700/80" />
              <div className="h-3 w-32 rounded bg-slate-700/50" />
            </div>
          </td>
          <td className="px-5 py-4">
            <div className="h-9 w-9 rounded-full bg-slate-700/80" />
          </td>
          <td className="px-5 py-4 text-right">
            <div className="ml-auto h-4 w-12 rounded bg-slate-700/80" />
          </td>
          <td className="px-5 py-4">
            <div className="min-w-36 space-y-3">
              <div className="flex justify-between">
                <div className="h-2 w-10 rounded bg-slate-700/50" />
                <div className="h-2 w-6 rounded bg-slate-700/50" />
              </div>
              <div className="h-2 w-full rounded-full bg-slate-700/40" />
            </div>
          </td>
          <td className="px-5 py-4 text-center">
            <div className="mx-auto h-5 w-20 rounded-full bg-slate-700/60" />
          </td>
          <td className="px-5 py-4 text-right">
            <div className="ml-auto h-5 w-5 rounded bg-slate-700/40" />
          </td>
        </>
      ) : path === "/orders" || path === "/dashboard" ? (
        <>
          <td className="px-5 py-4">
            <div className="h-4 w-12 rounded bg-slate-700/80" />
          </td>
          <td className="px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-700/80" />
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-slate-700/80" />
                <div className="h-2 w-16 rounded bg-slate-700/50" />
              </div>
            </div>
          </td>
          <td className="px-5 py-4">
            <div className="space-y-2">
              <div className="h-3 w-32 rounded bg-slate-700/80" />
              <div className="h-2 w-12 rounded bg-slate-700/50" />
            </div>
          </td>
          <td className="px-5 py-4">
            <div className="mx-auto h-5 w-16 rounded-full bg-slate-700/60" />
          </td>
          <td className="px-5 py-4">
            <div className="ml-auto h-3 w-20 rounded bg-slate-700/60" />
          </td>
          <td className="px-5 py-4">
            <div className="ml-auto h-4 w-14 rounded bg-slate-700/80" />
          </td>
        </>
      ) : path === "/customers" ? (
        <>
          <td className="px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-700/80 border border-slate-700/50" />
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-slate-700/80" />
                <div className="h-2 w-16 rounded bg-slate-700/50" />
              </div>
            </div>
          </td>
          <td className="px-5 py-4">
            <div className="mx-auto h-5 w-16 rounded-full bg-slate-700/80" />
          </td>
          <td className="px-5 py-4">
            <div className="h-3 w-20 rounded bg-slate-700/60" />
          </td>
          <td className="px-5 py-4 text-right">
            <div className="ml-auto h-3 w-16 rounded bg-slate-700/60" />
          </td>
          <td className="px-5 py-4">
            <div className="ml-auto space-y-2">
              <div className="h-3 w-12 rounded bg-slate-700/80 ml-auto" />
              <div className="h-2 w-8 rounded bg-slate-700/50 ml-auto" />
            </div>
          </td>
        </>
      ) : null}
    </tr>
  );
};
