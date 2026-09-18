"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  children: ReactNode;
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-gradient-to-r from-cyan-500/90 to-purple-500/90 hover:from-cyan-400 hover:to-purple-400 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 border-0",
      secondary: "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 hover:border-purple-500/50 shadow-lg shadow-purple-500/10",
      danger: "bg-gradient-to-r from-red-500/90 to-pink-500/90 hover:from-red-400 hover:to-pink-400 text-white shadow-lg shadow-red-500/20 border-0",
      ghost: "bg-transparent hover:bg-white/5 text-text-secondary hover:text-text-primary border border-white/10 hover:border-white/20",
      outline: "bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/60",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs rounded-lg",
      md: "px-6 py-3 text-sm rounded-xl",
      lg: "px-8 py-4 text-base rounded-2xl",
      xl: "px-10 py-5 text-lg rounded-2xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-display font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] hover:scale-[1.02]",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);
NeonButton.displayName = "NeonButton";
