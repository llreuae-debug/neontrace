"use client";

import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { ActivityItem } from "@/types";
import { formatTimeAgo } from "@/lib/utils";
import {
  Share2,
  Eye,
  Clock,
  CheckCircle2,
  Ghost,
  KeyRound,
  MapPin,
} from "lucide-react";

interface ActivityTimelineProps {
  items: ActivityItem[];
  className?: string;
}

const typeConfig = {
  sharing_started: { icon: Share2, color: "text-cyan-400", dot: "bg-cyan-400" },
  sharing_stopped: { icon: Clock, color: "text-text-muted", dot: "bg-text-muted" },
  sharing_expired: { icon: Clock, color: "text-yellow-400", dot: "bg-yellow-400" },
  location_viewed: { icon: Eye, color: "text-purple-400", dot: "bg-purple-400" },
  arrived: { icon: CheckCircle2, color: "text-green-400", dot: "bg-green-400" },
  ghost_mode: { icon: Ghost, color: "text-purple-400", dot: "bg-purple-400" },
  session_created: { icon: KeyRound, color: "text-cyan-400", dot: "bg-cyan-400" },
  session_ended: { icon: Share2, color: "text-red-400", dot: "bg-red-400" },
};

export function ActivityTimeline({ items, className }: ActivityTimelineProps) {
  if (items.length === 0) {
    return (
      <GlassCard className={cn("text-center py-8", className)}>
        <p className="text-text-muted">No activity yet</p>
      </GlassCard>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-4 top-2 bottom-2 w-px bg-white/5" />
      <div className="space-y-4">
        {items.map((item) => {
          const config = typeConfig[item.type] || typeConfig.sharing_started;
          const Icon = config.icon;

          return (
            <div key={item.id} className="relative flex items-start gap-4 pl-2">
              <div className={cn("relative z-10 w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center border border-white/10", config.dot)}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.description}</p>
                <p className="text-xs text-text-muted mt-0.5">{formatTimeAgo(item.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
