import { MoreHorizontal, ChevronsRight } from "lucide-react";
import { TableSkeleton } from "./ui/TableSkeleton";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
import { useState } from "react";
import EditProductModel from "./EditProductModel";
import { useProduct } from "@/contexts/EditProductContext";

const ProductsTable = ({ filteredProducts }) => {
  const [isModelOpen, setisModelOpen] = useState(false);

  const { changeData, products, delet, isLoading } = useProduct();

  return (
    <section className="mt-3 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all duration-300">
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-215 w-full text-left">
          <thead className="bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
            <tr className="text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <th className="px-5 py-4">SKU</th>
              <th className="px-5 py-4">Image</th>
              <th className="px-5 py-4 text-right">Price</th>
              <th className="px-5 py-4">Stock Level</th>
              <th className="px-5 py-4 text-center">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {isLoading
              ? [...Array(3)].map((_, i) => <TableSkeleton key={i} index={i} />)
              : filteredProducts.slice(0, 8).map((product) => {
                const stockPercent = Math.min(product.stock, 100);
                return (
                  <tr
                    key={product.id}
                    className="transition-colors duration-200 hover:bg-slate-50/50 dark:hover:bg-slate-900/30"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {product.sku}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {product.name}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center">
                        <Zoom zoomMargin={40}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            unoptimized
                            width={48}
                            height={48}
                            className="h-12 w-12 cursor-zoom-in rounded-full border border-slate-200 dark:border-slate-600 object-cover transition-transform hover:brightness-110"
                          />
                        </Zoom>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right text-sm font-bold text-slate-900 dark:text-slate-100">
                      ${product.price}
                    </td>
                    <td className="px-5 py-4">
                      <div className="min-w-36">
                        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          <span>{product.stock} units</span>
                          <span>{stockPercent}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                          {product.status === "In Stock" ? (
                            <div
                              className="h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)] dark:shadow-none"
                              style={{ width: `${stockPercent}%` }}
                            />
                          ) : product.status === "Low Stock" ? (
                            <div
                              className="h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.2)] dark:shadow-none"
                              style={{ width: `${stockPercent}%` }}
                            />
                          ) : (
                            <div
                              className="h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.2)] dark:shadow-none"
                              style={{ width: `${stockPercent}%` }}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      {product.status === "In Stock" ? (
                        <span className="inline-flex rounded-full border border-emerald-100 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                          {product.status}
                        </span>
                      ) : product.status === "Low Stock" ? (
                        <span className="inline-flex rounded-full border border-amber-100 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                          {product.status}
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full border border-rose-100 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-700 dark:text-rose-400">
                          {product.status}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <details className="relative inline-block group">
                        <summary
                          className="list-none rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer [&::-webkit-details-marker]:hidden"
                          aria-label={`Open actions for ${product.name}`}
                        >
                          <MoreHorizontal size={18} />
                        </summary>
                        <div className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg">
                          <button
                            type="button"
                            onClick={() => {
                              setisModelOpen(true)
                              changeData(product)
                            }}
                            className="w-full px-3 py-2 text-left text-sm font-semibold text-yellow-600 dark:text-yellow-300 transition-colors hover:bg-rose-50 dark:hover:bg-yellow-900/20"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => delet(product.id)}
                            className="w-full px-3 py-2 text-left text-sm font-semibold text-rose-600 dark:text-rose-400 transition-colors hover:bg-rose-50 dark:hover:bg-rose-900/20"
                          >
                            Delete
                          </button>
                        </div>
                      </details>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-900/30 transition-colors">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 pl-5">
          Showing {filteredProducts.length} of {products.length} products
        </div>
        <div className="flex items-center gap-2 py-3 px-5">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-600 bg-violet-600 text-xs font-bold text-white transition-all duration-200 shadow-sm shadow-violet-100 dark:shadow-none">
            1
          </button>
          {[2, "...", 7].map((page, i) => (
            <button
              key={i}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all duration-200 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 active:scale-95"
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all duration-200 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 active:scale-95"
          >
            <ChevronsRight size={14} />
          </button>
        </div>
      </div>
      <EditProductModel
        isOpen={isModelOpen}
        onClose={() => setisModelOpen(false)}
      />
    </section>
  );
};
export default ProductsTable;