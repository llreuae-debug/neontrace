"use client";

import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { formatDistance, formatTimeAgo } from "@/lib/utils";
import type { User } from "@/types";
import { X, MessageCircle, MapPin } from "lucide-react";

interface TrustCircleCardProps {
  user: User & { lastUpdated?: number };
  onRemove?: () => void;
  onShare?: () => void;
  onMessage?: () => void;
  onBlock?: () => void;
  className?: string;
}

export function TrustCircleCard({
  user,
  onRemove,
  onShare,
  onMessage,
  onBlock,
  className,
}: TrustCircleCardProps) {
  return (
    <GlassCard className={cn("relative overflow-hidden", className)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="flex items-start gap-4">
        <UserAvatar user={user} size="lg" showStatus />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-display font-semibold text-lg truncate">{user.name}</h4>
            <NeonBadge variant={user.status === "live" ? "live" : user.status === "ghost" ? "ghost" : "default"}>
              <LiveStatus status={user.status} showLabel={false} />
              {" "}{user.status}
            </NeonBadge>
          </div>

          <div className="flex flex-wrap gap-3 mt-2 text-sm text-text-muted">
            <span>{user.distance ? `${formatDistance(user.distance)} away` : "Offline"}</span>
            <span>•</span>
            <span>{user.battery !== undefined ? `🔋 ${user.battery}%` : ""}</span>
            <span>•</span>
            <span>{user.lastUpdated ? formatTimeAgo(user.lastUpdated) : ""}</span>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={onShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors border border-cyan-500/20"
            >
              <MapPin className="w-3 h-3" /> Share
            </button>
            <button
              onClick={onMessage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-text-secondary hover:bg-white/10 transition-colors border border-white/10"
            >
              <MessageCircle className="w-3 h-3" /> Message
            </button>
            {onBlock && (
              <button
                onClick={onBlock}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-red-400 hover:bg-red-500/10 transition-colors border border-white/10"
              >
                Block
              </button>
            )}
            {onRemove && (
              <button
                onClick={onRemove}
                className="px-2 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-colors border border-white/10"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
