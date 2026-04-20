import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Directory",
};

export default function CustomerLayout({ children }) {
  return <>{children}</>;
}