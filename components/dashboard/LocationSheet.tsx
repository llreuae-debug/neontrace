"use client";

import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { formatDistance, formatTimeAgo, formatSpeed, formatHeading } from "@/lib/utils";
import type { User } from "@/types";
import {
  MessageCircle,
  Navigation,
  Share2,
  X,
  MapPin,
  Clock,
} from "lucide-react";

interface LocationSheetProps {
  user: User & { lastUpdated?: number; speed?: number; heading?: number };
  onClose: () => void;
  onNavigate?: () => void;
  onMessage?: () => void;
  onShare?: () => void;
  className?: string;
}

export function LocationSheet({
  user,
  onClose,
  onNavigate,
  onMessage,
  onShare,
  className,
}: LocationSheetProps) {
  if (!user) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex items-end justify-center", className)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <GlassCard className="w-full max-w-md rounded-t-3xl rounded-b-none p-6 z-10 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="flex flex-col items-center gap-4 pt-2">
          <UserAvatar user={user} size="xl" showStatus />

          <div className="text-center">
            <h3 className="font-display text-2xl font-bold">{user.name}</h3>
            <LiveStatus status={user.status} />
          </div>

          <div className="w-full space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="flex items-center gap-2 text-text-secondary text-sm">
                <MapPin className="w-4 h-4" /> Distance
              </span>
              <span className="font-medium">
                {user.distance ? formatDistance(user.distance) : "—"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="flex items-center gap-2 text-text-secondary text-sm">
                <Clock className="w-4 h-4" /> Last updated
              </span>
              <span className="font-medium">
                {user.lastUpdated ? formatTimeAgo(user.lastUpdated) : "—"}
              </span>
            </div>
            {user.battery !== undefined && (
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-text-secondary text-sm">Battery</span>
                <span className="font-medium">{user.battery}%</span>
              </div>
            )}
            {user.speed !== undefined && (
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-text-secondary text-sm">Speed</span>
                <span className="font-medium">{formatSpeed(user.speed)}</span>
              </div>
            )}
            {user.heading !== undefined && (
              <div className="flex justify-between items-center py-2">
                <span className="text-text-secondary text-sm">Heading</span>
                <span className="font-medium">{formatHeading(user.heading)}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 w-full mt-2">
            <NeonButton size="sm" variant="secondary" className="flex-1" onClick={onMessage}>
              <MessageCircle className="w-4 h-4" /> Message
            </NeonButton>
            <NeonButton size="sm" variant="secondary" className="flex-1" onClick={onNavigate}>
              <Navigation className="w-4 h-4" /> Navigate
            </NeonButton>
            <NeonButton size="sm" variant="secondary" onClick={onShare}>
              <Share2 className="w-4 h-4" />
            </NeonButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
