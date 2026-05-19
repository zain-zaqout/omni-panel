"use client";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export const EditContextInstance = createContext(null);

export const EditProductContext = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { currentUser } = useAuth();

  const [productData, setProductData] = useState({
    id: "",
    name: "",
    sku: "",
    image: "",
    category: "",
    price: "",
    stock: "",
    status: "",
  });

  const delet = async (id) => {
    const oldProducts = [...products];
    const filteredProducts = products.filter((item) => item.id !== id);

    setProducts(filteredProducts);

    const deleteProcess = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);

        await updateDoc(userDocRef, {
          productsUser: filteredProducts
        });

        return "Product deleted successfully!";
      } catch (error) {
        setProducts(oldProducts);
        throw error;
      }
    };

    toast.promise(deleteProcess(), {
      loading: "Deleting product...",
      success: (data) => data,
      error: (err) => `Delete failed: ${err.message}`,
    });
  };

  useEffect(() => {
    if (!currentUser) return;

    const getProducts = async () => {
      setisLoading(true)
      try {

        const res = await getDoc((doc(db, "users", currentUser.uid)));
        const data = res.data();
        setProducts(data?.productsUser || []);
      } catch (error) {
        toast.error("Failed to fetch products: " + error.message);
      }finally{
        setisLoading(false)
      }
    };

    getProducts();
  }, [currentUser]);

  const changeData = (item) => {
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
        isLoading
      }}
    >
      {children}
    </EditContextInstance.Provider>
  );
};

export const useProduct = () => useContext(EditContextInstance);