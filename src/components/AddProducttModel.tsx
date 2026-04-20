"use client";
import {  useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useProduct, type Product } from "@/contexts/EditProductContext";

type ProductForm = {
  name: string;
  sku: string;
  price: number | "";
  stock: number | "";
};

type AddProductModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddProducttModel = ({
  isOpen,
  onClose,
  setImageFile, 
  setImagePreview,
  imagePreview,
}: AddProductModelProps) => {

  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
  });

  const { setProducts } = useProduct();

  if (!isOpen) return null;

  const handel = (e: any) => {
    const { name, value, type } = e.target;
    const field = name as keyof ProductForm;

    if (value === "") {
      setProductData((prev) => ({ ...prev, [field]: "" }));
      return;
    }

    setProductData((prev) => ({
      ...prev,
      [field]: type === "number" ? Number(value) : value,
    }));
  };

  const handelImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      localStorage.setItem("img", JSON.stringify(URL.createObjectURL(file)))
    }
  };

  const handelSubmit = (e: any) => {
    e.preventDefault();

    const normalizedStock =
      productData.stock === "" ? 0 : Number(productData.stock);
    const normalizedPrice =
      productData.price === "" ? 0 : Number(productData.price);

    const status =
      normalizedStock <= 20 && normalizedStock > 0
        ? "Low Stock"
        : normalizedStock > 20
          ? "In Stock"
          : "Out of Stock";

    const newProduct: Product = {
      ...productData,
      id: `PRD-${Date.now()}`,
      image: imagePreview ?? "",
      category: "General",
      status: status,
      price: normalizedPrice,
      stock: normalizedStock,
    };

    const promise = new Promise((resolve) => setTimeout(resolve, 2500)); 

    toast.promise(promise, {
      loading: "Loading",
      success: () => {
        setProducts((prev) => {
          const update = [newProduct, ...prev];
          localStorage.setItem("products", JSON.stringify(update));
          return update;
        });
        return `New product published to inventory.`;
      },
      error: "Something went wrong. Could not save product.",
    });

    setProductData({
      name: "",
      sku: "",
      price: 0,
      stock: 1,
    });
    setImageFile(null);
    setImagePreview(null);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col h-full right-0 animate-[slideIn_0.3s_ease-out] border-l border-slate-200 dark:border-slate-800 transition-colors">
        <form onSubmit={handelSubmit}>
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-5 bg-white dark:bg-slate-900 transition-colors">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                New Product
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Add details for the new product.
              </p>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="rounded-full group hover:bg-red-500/10 dark:hover:bg-red-500/35 cursor-pointer p-2 text-slate-400 hover:text-red-600 transition-colors"
            >
              <X
                size={20}
                className="group-hover:rotate-90 transition-transform"
              />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-slate-50 dark:bg-slate-900/50 transition-colors">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Product Image
                </label>
                <div className="group relative h-45 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 py-10 hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  {imagePreview ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="rounded-full absolute -top-3 -right-2 z-50 bg-red-500/70 cursor-pointer p-1.5 text-white transition-colors"
                      >
                        <X
                          size={20}
                          className="hover:rotate-180 duration-200"
                        />
                      </button>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="absolute object-cover inset-0 w-full h-full rounded-xl"
                      />
                    </>
                  ) : (
                    <>
                      <UploadCloud className="mb-3 h-10 w-10 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        SVG, PNG, JPG (max. 5MB)
                      </p>
                      <input
                        type="file"
                        onChange={handelImage}
                        accept="image/*"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        required
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={productData.name}
                    onChange={handel}
                    placeholder="e.g. Minimalist Watch"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      name="sku"
                      required
                      value={productData.sku}
                      onChange={handel}
                      placeholder="e.g. PRD-001"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <div className="relative">
                      <div className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none">
                        {productData.stock <= 20 && productData.stock > 0 ? (
                          <span className="text-yellow-600 dark:text-yellow-400">
                            Low Stock
                          </span>
                        ) : productData.stock > 20 ? (
                          <span className="text-green-600 dark:text-green-400">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-500">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm font-medium">
                        $
                      </span>
                      <input
                        type="number"
                        required
                        name="price"
                        onWheel={(e) => e.currentTarget.blur()}
                        step="any"
                        value={productData.price}
                        onChange={handel}
                        placeholder="0.00"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-7 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      onWheel={(e) => e.currentTarget.blur()}
                      step="any"
                      max={999}
                      name="stock"
                      value={productData.stock}
                      onChange={handel}
                      placeholder="0"
                      className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-colors">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-2 rounded-lg cursor-pointer bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Publish Product
              </button>
            </div>
          </div>
        </form>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `,
        }}
      />
    </div>
  );
};
