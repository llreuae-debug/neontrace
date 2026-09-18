"use client";

import { cn } from "@/lib/utils";
import type { User } from "@/types";

interface UserAvatarProps {
  user: Pick<User, "name" | "avatar" | "status">;
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
  className?: string;
}

const statusColors = {
  live: "bg-green-400",
  away: "bg-yellow-400",
  offline: "bg-text-muted",
  ghost: "bg-purple-500",
};

export function UserAvatar({ user, size = "md", showStatus = true, className }: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-lg",
  };

  const statusSizeClasses = {
    sm: "w-2 h-2 border-[1px]",
    md: "w-2.5 h-2.5 border-[1.5px]",
    lg: "w-3.5 h-3.5 border-2",
    xl: "w-4 h-4 border-2",
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn("relative inline-flex", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-display font-bold text-white bg-gradient-to-br from-blue-violet to-purple-600 border border-white/10 shrink-0",
          sizeClasses[size]
        )}
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          initials
        )}
      </div>
      {showStatus && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-[#050508] border-solid",
            statusSizeClasses[size],
            statusColors[user.status] || statusColors.offline,
            "animate-pulse"
          )}
        />
      )}
    </div>
  );
}
