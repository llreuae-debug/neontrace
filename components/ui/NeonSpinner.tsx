"use client";

import { cn } from "@/lib/utils";

interface NeonSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-3",
  lg: "w-12 h-12 border-4",
};

export function NeonSpinner({ className, size = "md" }: NeonSpinnerProps) {
  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <div className={cn(sizeClasses[size], "border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin")} />
    </div>
  );
}
