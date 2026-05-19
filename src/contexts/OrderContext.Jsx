"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const OrderContextInstance = createContext(null);

export const OrderContext = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-2301",
      customer: "Lina Haddad",
      customerId: "CUS-1001",
      products: "Aurora Lamp",
      payment: "Paid",
      date: "2026-03-09",
      total: 420,
    },
    {
      id: "ORD-2304",
      customer: "Karim Suleiman",
      customerId: "CUS-1004",
      products: "Trail Sneakers",
      payment: "Refunded",
      date: "2026-03-07",
      total: 120,
    },
    {
      id: "ORD-2305",
      customer: "Maya Fares",
      customerId: "CUS-1005",
      products: "Aura Candle Pack",
      payment: "Failed",
      date: "2026-03-06",
      total: 78,
    },
    {
      id: "ORD-2306",
      customer: "Yousef Hamdan",
      customerId: "CUS-1006",
      products: "Echo Speaker Mini",
      payment: "Paid",
      date: "2026-03-05",
      total: 310,
    },
    {
      id: "ORD-2307",
      customer: "Sara Odeh",
      customerId: "CUS-1007",
      products: "Studio Notebook",
      payment: "Pending",
      date: "2026-03-04",
      total: 56,
    },
    {
      id: "ORD-2308",
      customer: "Omar Alqadi",
      customerId: "CUS-1008",
      products: "Metro Backpack",
      payment: "Paid",
      date: "2026-03-03",
      total: 690,
    },
    {
      id: "ORD-2309",
      customer: "Dina Khoury",
      customerId: "CUS-1009",
      products: "Aurora Lamp",
      payment: "Paid",
      date: "2026-03-02",
      total: 214,
    },
    {
      id: "ORD-2310",
      customer: "Hadi Barghouti",
      customerId: "CUS-1010",
      products: "Terra Mug Set",
      payment: "Pending",
      date: "2026-03-01",
      total: 138,
    },
  ]);

  useEffect(() => {
    const local = localStorage.getItem("orders");
    if (local) setOrders(JSON.parse(local));
  }, []);

  return (
    <OrderContextInstance.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContextInstance.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContextInstance);
  if (!context) {
    throw new Error("useOrders must be used within OrderContext");
  }
  return context;
};