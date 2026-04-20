"use client";
import { useState, useEffect } from "react";
import { FullPageLoader } from "./FullPageLoader";
import { AnimatePresence } from "framer-motion";

export const SplashLoader = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!mounted && <FullPageLoader key="initial-loader" />}
      </AnimatePresence>
      
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </>
  );
};