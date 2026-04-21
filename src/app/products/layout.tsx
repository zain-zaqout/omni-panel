import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory",
};

export default function ProductsLayout({ children }: { children: any }) {
  return <>{children}</>;
}