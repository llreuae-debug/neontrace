"use client";

import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { useState } from "react";
import { NeonBadge } from "@/components/ui/NeonBadge";

export function NotificationBell() {
  const { unreadCount, notifications, markAsRead, markAllRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-2 rounded-xl hover:bg-white/5 transition-colors"
        )}
      >
        <Bell className="w-5 h-5 text-text-secondary" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-10 w-80 glass-strong rounded-2xl z-50 p-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center mb-4">
              <span className="font-display font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-cyan-400 hover:underline">
                  Mark all read
                </button>
              )}
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-text-muted text-center py-4">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "p-3 rounded-xl border transition-all",
                      n.read
                        ? "bg-bg-card border-white/5"
                        : "bg-cyan-500/5 border-cyan-500/10"
                    )}
                    onClick={() => markAsRead(n.id)}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mt-1.5 shrink-0",
                          n.type === "success" && "bg-green-400",
                          n.type === "error" && "bg-red-400",
                          n.type === "warning" && "bg-yellow-400",
                          (n.type === "info" || !n.type) && "bg-cyan-400"
                        )}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        {n.body && (
                          <p className="text-xs text-text-muted mt-0.5">{n.body}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
