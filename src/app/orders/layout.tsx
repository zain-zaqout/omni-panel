import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders Management",
};

export default function OrdersLayout({ children }) {
  return <>{children}</>;
}