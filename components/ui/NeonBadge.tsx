"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface NeonBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "live" | "away" | "offline" | "ghost" | "danger" | "success";
  className?: string;
}

const variantStyles = {
  default: "bg-bg-card text-text-secondary border-white/10",
  live: "bg-green-500/10 text-green-400 border-green-500/20",
  away: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  offline: "bg-bg-card text-text-muted border-white/10",
  ghost: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  danger: "bg-red-500/10 text-red-400 border-red-500/20",
  success: "bg-green-500/10 text-green-400 border-green-500/20",
};

export function NeonBadge({ children, variant = "default", className }: NeonBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
