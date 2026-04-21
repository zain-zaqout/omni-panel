import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
};

export default function AnalyticeLayout({ children }: { children: any }) {
  return <>{children}</>; 
}