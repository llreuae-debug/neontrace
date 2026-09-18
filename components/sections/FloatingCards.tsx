"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { formatDistance, formatTimeAgo } from "@/lib/utils";
import type { User } from "@/types";

interface FloatingCardProps {
  user: User;
  delay?: number;
}

export function FloatingCard({ user, delay = 0 }: FloatingCardProps) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!user.distance) return;
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(Date.now() - ((user.distance ?? 0) * 100)));
    }, 10000);
    return () => clearInterval(interval);
  }, [user.distance]);

  return (
    <div
      className="absolute"
      style={{
        top: `${20 + Math.random() * 50}%`,
        left: `${10 + Math.random() * 70}%`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="animate-float-slow">
        <GlassCard className="w-44 py-3 px-4" glow="cyan">
          <div className="flex items-center gap-3">
            <UserAvatar user={user} size="sm" showStatus />
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-text-muted">
                {user.distance ? `${formatDistance(user.distance)} away` : "Live"}
              </p>
            </div>
            <div className="text-right shrink-0">
              <LiveStatus status={user.status} showLabel={false} />
              <p className="text-[10px] text-text-dim mt-0.5">{user.battery}%</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
