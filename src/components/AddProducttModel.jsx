"use client";
import { useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useProduct } from "@/contexts/EditProductContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export const AddProducttModel = ({ isOpen, onClose }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
  });

  const { setProducts } = useProduct();
  const { currentUser } = useAuth();

  // تأثير لتعطيل السكرول في الخلفية عندما يكون موديل الإضافة مفتوحاً
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // تنظيف التأثير عند عمل unmount للمكون
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handle = (e) => {
    const { name, value, type } = e.target;

    if (value === "") {
      setProductData((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    setProductData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = "64b38851a39d1412ca74f19205722e5f"; 
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errRes = await response.json().catch(() => ({}));
      throw new Error(errRes.error?.message || "ImgBB upload failed.");
    }

    const result = await response.json();
    const uploadedUrl = result.data?.url || result.data?.display_url;
    
    if (!uploadedUrl) {
      throw new Error("Invalid response structure from ImgBB.");
    }

    return uploadedUrl;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedStock = productData.stock === "" ? 0 : Number(productData.stock);
    const normalizedPrice = productData.price === "" ? 0 : Number(productData.price);

    const status =
      normalizedStock <= 20 && normalizedStock > 0
        ? "Low Stock"
        : normalizedStock > 20
          ? "In Stock"
          : "Out of Stock";

    const addNewProduct = async () => {
      try {
        if (!currentUser?.uid) throw new Error("User is not authenticated.");
        if (!imageFile) throw new Error("Please select an image first.");

        const finalImageUrl = await uploadToImgBB(imageFile); 

        if (!finalImageUrl || finalImageUrl.startsWith("blob:")) {
          throw new Error("Failed to secure a permanent image URL. Try uploading the image again.");
        }

        const newProduct = {
          id: `PRD-${Date.now()}`,
          name: productData.name,
          sku: productData.sku,
          image: finalImageUrl,
          category: "General",
          status: status,
          price: normalizedPrice,
          stock: normalizedStock,
        };

        const userDocRef = doc(db, "users", currentUser.uid);
        
        setProducts((prevProducts) => {
          const updated = [newProduct, ...prevProducts];
          
          updateDoc(userDocRef, { productsUser: updated }).catch((err) => {
            console.error("Firestore Error:", err);
          });
          
          return updated;
        });

        setTimeout(() => {
          setProductData({ name: "", sku: "", price: "", stock: "" });
          setImageFile(null);
          setImagePreview(null);
          onClose();
        }, 100);

        return "Product added successfully!";
      } catch (error) {
        console.error("Submission flow failed:", error.message);
        throw new Error(error.message);
      }
    };

    toast.promise(addNewProduct(), {
      loading: "Securing cloud storage and saving product...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col h-full right-0 border-l border-slate-200 dark:border-slate-800 transition-colors animate-[slideIn_0.3s_ease-out]">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-5 bg-white dark:bg-slate-900">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">New Product</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Add details for the new product.</p>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="rounded-full hover:bg-red-500/10 dark:hover:bg-red-500/35 p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-slate-50 dark:bg-slate-900/50">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Product Image</label>
                <div className="group relative h-45 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 py-10 hover:border-indigo-500 transition-all">
                  {imagePreview ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                        }}
                        className="rounded-full absolute -top-3 -right-2 z-50 bg-red-500/70 p-1.5 text-white transition-colors cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                      <img src={imagePreview} alt="Preview" className="absolute object-cover inset-0 w-full h-full rounded-xl" />
                    </>
                  ) : (
                    <>
                      <UploadCloud className="mb-3 h-10 w-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Click to upload or drag and drop</p>
                      <input type="file" onChange={handleImage} accept="image/*" required className="absolute inset-0 cursor-pointer opacity-0" />
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Product Name</label>
                  <input type="text" name="name" required value={productData.name} onChange={handle} placeholder="e.g. Minimalist Watch" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SKU</label>
                    <input type="text" name="sku" required value={productData.sku} onChange={handle} placeholder="e.g. PRD-001" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                    <div className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium">
                      {Number(productData.stock) <= 20 && Number(productData.stock) > 0 ? (
                        <span className="text-yellow-600 dark:text-yellow-400">Low Stock</span>
                      ) : Number(productData.stock) > 20 ? (
                        <span className="text-green-600 dark:text-green-400">In Stock</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-500">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                      <input type="number" required name="price" onWheel={(e) => e.currentTarget.blur()} step="any" value={productData.price} onChange={handle} placeholder="0.00" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-7 pr-4 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Stock Quantity</label>
                    <input type="number" onWheel={(e) => e.currentTarget.blur()} max={999} name="stock" value={productData.stock} onChange={handle} placeholder="0" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">Cancel</button>
              <button type="submit" className="flex-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors cursor-pointer">Publish Product</button>
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