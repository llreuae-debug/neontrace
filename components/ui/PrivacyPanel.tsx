"use client";

import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import type { ReactNode } from "react";

interface PrivacyPanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function PrivacyPanel({ children, className, title }: PrivacyPanelProps) {
  return (
    <GlassCard className={cn("border border-cyan-500/10", className)}>
      {title && <h3 className="font-display font-semibold mb-4">{title}</h3>}
      {children}
    </GlassCard>
  );
}
