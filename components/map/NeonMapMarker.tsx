"use client";

import { cn } from "@/lib/utils";

interface NeonMapMarkerProps {
  lat: number;
  lng: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  isPulse?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function NeonMapMarker({
  lat,
  lng,
  color = "cyan",
  size = "md",
  isPulse = true,
  children,
  className,
}: NeonMapMarkerProps) {
  const colorMap = {
    cyan: { glow: "0 0 15px rgba(0,240,255,0.6)", bg: "bg-cyan-500", ring: "border-cyan-400" },
    purple: { glow: "0 0 15px rgba(168,85,247,0.6)", bg: "bg-purple-500", ring: "border-purple-400" },
    green: { glow: "0 0 15px rgba(34,197,94,0.6)", bg: "bg-green-500", ring: "border-green-400" },
    pink: { glow: "0 0 15px rgba(244,114,182,0.6)", bg: "bg-pink-500", ring: "border-pink-400" },
    red: { glow: "0 0 15px rgba(239,68,68,0.6)", bg: "bg-red-500", ring: "border-red-400" },
  };

  const c = colorMap[color as keyof typeof colorMap] || colorMap.cyan;
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} data-lat={lat} data-lng={lng}>
      {isPulse && (
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2 animate-pulse-ring opacity-60",
            c.ring
          )}
        />
      )}
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center shadow-lg",
          sizeClasses[size],
          c.bg,
          children ? "border-2 border-white/20" : ""
        )}
        style={{ boxShadow: c.glow }}
      >
        {children}
      </div>
    </div>
  );
}
