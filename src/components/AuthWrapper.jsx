"use client";

import { useAuth } from "@/contexts/AuthContext";
import { FullPageLoader } from "@/components/FullPageLoader";

export default function AuthWrapper({ children }) {
  const { isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
}