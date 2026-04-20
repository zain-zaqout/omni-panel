"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimationWrapperProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  notifyResize?: boolean;
};

export const AnimationWrapper = ({
  children,
  delay = 0,
  className = "",
  notifyResize = false,
}: AnimationWrapperProps) => {
  return (
    <motion.div
      className={`w-full min-w-0 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onAnimationComplete={() => {
        if (notifyResize && typeof window !== "undefined") {
          window.dispatchEvent(new Event("resize"));
        }
      }}
    >
      {children}
    </motion.div>
  );
};
