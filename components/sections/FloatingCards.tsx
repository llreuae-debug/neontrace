"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { formatDistance } from "@/lib/utils";
import type { User } from "@/types";

interface FloatingCardProps {
  user: User;
  delay?: number;
}

export function FloatingCard({ user, delay = 0 }: FloatingCardProps) {
  // Deterministic positioning based on user id
  const charCode = user.id ? user.id.charCodeAt(0) : 1;
  const topPos = 20 + ((charCode * 17) % 45);
  const leftPos = 10 + ((charCode * 31) % 65);

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        top: `${topPos}%`,
        left: `${leftPos}%`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="animate-float-slow pointer-events-auto">
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

