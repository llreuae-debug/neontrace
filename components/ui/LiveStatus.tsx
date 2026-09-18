"use client";

import { cn } from "@/lib/utils";

interface LiveStatusProps {
  status: "live" | "away" | "offline" | "connecting" | "ghost";
  showLabel?: boolean;
  className?: string;
}

const statusConfig = {
  live: { color: "bg-green-400", label: "Live", text: "text-green-400" },
  away: { color: "bg-yellow-400", label: "Away", text: "text-yellow-400" },
  offline: { color: "bg-text-muted", label: "Offline", text: "text-text-muted" },
  connecting: { color: "bg-cyan-400 animate-pulse", label: "Connecting", text: "text-cyan-400" },
  ghost: { color: "bg-purple-500", label: "Ghost", text: "text-purple-400" },
};

export function LiveStatus({ status, showLabel = true, className }: LiveStatusProps) {
  const config = statusConfig[status] || statusConfig.offline;

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn("w-2 h-2 rounded-full", config.color)} />
      {showLabel && (
        <span className={cn("text-xs font-medium font-display", config.text)}>
          {config.label}
        </span>
      )}
    </span>
  );
}
