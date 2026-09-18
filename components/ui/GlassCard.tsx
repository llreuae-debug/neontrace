"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: "cyan" | "purple" | "pink" | "none";
  interactive?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, glow = "none", interactive = false, onClick }: GlassCardProps) {
  const glowClasses = {
    cyan: "glow-cyan",
    purple: "glow-purple",
    pink: "glow-pink",
    none: "",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        glowClasses[glow],
        interactive && "hover:border-white/15 hover:shadow-lg hover:shadow-cyan-500/5 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
