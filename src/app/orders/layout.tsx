import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders Management",
};

export default function OrdersLayout({ children }: { children: any }) {
  return <>{children}</>;
}