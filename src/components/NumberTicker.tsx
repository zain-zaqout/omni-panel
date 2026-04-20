"use client";
import { useEffect, useRef } from "react";
import { useSpring, useTransform } from "framer-motion";

export default function NumberTicker({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const springValue = useSpring(0, {
    stiffness: 70,  
    damping: 20,    
  });

  const displayValue = useTransform(springValue, (latest) =>
  Math.round(latest).toLocaleString('en-US')
);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest;
      }
    });
    
    return () => unsubscribe();
  }, [displayValue]);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  return (
    <span 
      ref={ref} 
      className="inline-block"
    >
      0
    </span>
  );
}