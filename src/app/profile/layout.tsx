import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function ProfileLayout({ children }) {
  return <>{children}</>;
}