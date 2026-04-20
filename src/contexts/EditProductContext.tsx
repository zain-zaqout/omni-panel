"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type Product = {
  id: string;
  name: string;
  sku: string;
  image: string;
  category: string;
  stock: number;
  price: number;
  status: ProductStatus;
};

export type ProductDraft = {
  id: string;
  name: string;
  sku: string;
  image: string;
  category: string;
  price: number | "";
  stock: number | "";
  status: ProductStatus | "";
};

type EditProductContextValue = {
  productData: ProductDraft;
  setProductData: React.Dispatch<React.SetStateAction<ProductDraft>>;
  changeData: (item: Product) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  delet: (id: string) => void;
};

export const EditContextInstance =
  createContext<EditProductContextValue | null>(null);

export const EditProductContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PRD-4024",
      name: "Nimbus Hoodie",
      sku: "NH-7750",
      image:
        "/assets/Images/1.avif",
      category: "Apparel",
      stock: 64,
      price: 58,
      status: "In Stock",
    },
    {
      id: "PRD-4025",
      name: "Studio Notebook",
      sku: "SN-2310",
      image:
        "/assets/Images/2.avif",
      category: "Stationery",
      stock: 6,
      price: 14,
      status: "Low Stock",
    },
    {
      id: "PRD-4026",
      name: "Echo Speaker Mini",
      sku: "ES-9982",
      image:
        "/assets/Images/3.avif",
      category: "Electronics",
      stock: 23,
      price: 79,
      status: "In Stock",
    },
    {
      id: "PRD-4027",
      name: "Lumen Desk Plant",
      sku: "LP-6404",
      image:
        "/assets/Images/4.avif",
      category: "Home Decor",
      stock: 0,
      price: 45,
      status: "Out of Stock",
    },
    {
      id: "PRD-4028",
      name: "Trail Sneakers",
      sku: "TS-4029",
      image:
        "/assets/Images/5.avif",
      category: "Footwear",
      stock: 39,
      price: 96,
      status: "In Stock",
    },
    {
      id: "PRD-4029",
      name: "Aura Candle Pack",
      sku: "AC-5527",
      image:
        "/assets/Images/6.avif",
      category: "Home Decor",
      stock: 18,
      price: 26,
      status: "Low Stock",
    },
    {
      id: "PRD-4030",
      name: "Metro Backpack",
      sku: "MB-8801",
      image:
        "/assets/Images/7.avif",
      category: "Accessories",
      stock: 52,
      price: 74,
      status: "In Stock",
    },
  ]);

  const [productData, setProductData] = useState<ProductDraft>({
    id: "",
    name: "",
    sku: "",
    image: "",
    category: "",
    price: "",
    stock: "",
    status: "",
  });

  const delet = (id: string) => {
    const filter = products.filter((item) => id !== item.id);
    const promise = new Promise((resolve) => setTimeout(resolve, 2500));

    toast.promise(promise, {
      loading: "Loading",
      success: () => {
        localStorage.setItem("products", JSON.stringify(filter));
        setProducts(filter);

        return `Product deleted successfully!`;
      },
      error: "Something went wrong. Delete failed.",
    });
  };

  const changeData = (item: Product) => {
    setProductData(item);
  };

  return (
    <EditContextInstance.Provider
      value={{
        productData,
        setProductData,
        changeData,
        products,
        setProducts,
        delet,
      }}
    >
      {children}
    </EditContextInstance.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(EditContextInstance);
  if (!context) {
    throw new Error("useProduct must be used within EditProductContext");
  }
  return context;
};
