"use client";
import { FileDown, Plus, Search, ChevronDown, FilterIcon } from "lucide-react";
import { AnimationWrapper } from "@/components/AnimationWrapper";
import { useEffect, useState } from "react";
import ProductsTable from "@/components/ProductsTable";
import { AddProducttModel } from "@/components/AddProducttModel";
import ProductsCard from "@/components/ProductsCard";
import { useProduct } from "@/contexts/EditProductContext";

const Products = () => {
  const [isLoading, setisLoading] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [stockFilter, setstockFilter] = useState("All");
  const [searchTerm, setsearchTerm] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const Filter = ["All", "In Stock", "Low Stock", "Out of Stock"];

  const { products, setProducts } = useProduct();

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1200);

    const localData = localStorage.getItem("products");
    if (localData) {
      setProducts(JSON.parse(localData));
    }
  }, [setProducts]);

  useEffect(() => {
    const local = localStorage.getItem("img")
    if (local) {
      setImagePreview(JSON.parse(local))
    }
  }, [])
  

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const stock_products = {
      All: true,
      "In Stock": item.stock > 20,
      "Low Stock": item.stock > 0 && item.stock <= 20,
      "Out of Stock": item.stock === 0,
    };

    return matchesSearch && stock_products[stockFilter];
  });

  return (
    <main className="bg-[#f8fafc] dark:bg-slate-900 min-h-screen ml-0 min-[376px]:ml-15 lg:ml-55 pb-5 transition-colors duration-300">
      <div className="w-[96%] m-auto pt-5">
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-slate-900 dark:text-slate-100 text-3xl max-[376px]:text-2xl md:text-[32px] font-bold">
              Inventory
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-[12px] font-medium">
              Manage your product catalog and stock levels.
            </p>
          </div>

          <div className="flex items-center gap-2 lg:w-auto lg:justify-end">
            <button
              className="flex w-auto items-center justify-center gap-1 rounded-2xl bg-violet-600 px-3.5 py-2 text-white shadow-md shadow-violet-200 dark:shadow-none transition-all duration-300 hover:bg-violet-700 active:scale-95 cursor-pointer"
              onClick={() => setIsModelOpen(true)}
            >
              <Plus size={16} />
              <span className="text-sm font-semibold">Add New Product</span>
            </button>
          </div>
        </section>

        <section>
          <AnimationWrapper delay={0.1}>
            <ProductsCard />
          </AnimationWrapper>
        </section>

        <section className="flex flex-col mt-4 gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-97.5">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              id="products-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-10 pr-11 text-sm text-slate-800 dark:text-slate-100 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 dark:focus:ring-violet-500/10"
              placeholder="Search products by name or SKU..."
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FilterIcon
                  size={18}
                  className="text-slate-400 group-focus-within:text-violet-600 transition-colors"
                />
              </div>
              <select
                value={stockFilter}
                onChange={(e) => setstockFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 cursor-pointer transition-all shadow-sm hover:border-slate-300 dark:hover:border-slate-600"
              >
                {Filter.map((status) => (
                  <option
                    key={status}
                    value={status}
                    className="bg-white dark:bg-slate-800 py-2"
                  >
                    {status}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown
                  size={18}
                  className="text-slate-400 group-focus-within:text-violet-600 transition-transform duration-300 group-focus-within:rotate-180"
                />
              </div>
            </div>
            <button className="flex items-center justify-end gap-2 rounded-2xl bg-violet-600 dark:bg-violet-500 px-4 py-2 text-white dark:text-violet-100 shadow-md transition-all duration-300 hover:bg-violet-700 dark:hover:bg-violet-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-90 cursor-pointer w-auto">
              <FileDown size={16} />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </section>

        <AnimationWrapper delay={0.4}>
          <ProductsTable
            
            filteredProducts={filteredProducts}
            isLoading={isLoading}
            setisLoading={setisLoading}
          />
        </AnimationWrapper>
      </div>

      <AddProducttModel
        isOpen={isModelOpen}
        setImagePreview={setImagePreview}
        setImageFile={setImageFile}
        imagePreview={imagePreview}
        onClose={() => setIsModelOpen(false)}
      />
    </main>
  );
};

export default Products;
