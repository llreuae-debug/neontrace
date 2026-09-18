"use client";

import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { MapPin, Shield, Clock, Activity, BarChart3, Users } from "lucide-react";
import type { User } from "@/types";

interface StatsGridProps {
  currentUser?: User;
}

export function StatsGrid({ currentUser }: StatsGridProps) {
  const stats = [
    { label: "Distance today", value: "2.4 km", icon: MapPin, color: "cyan", trend: "+12%" },
    { label: "Trips today", value: "3", icon: Activity, color: "purple", trend: "+1" },
    { label: "Places visited", value: "2", icon: BarChart3, color: "pink", trend: "+1" },
    { label: "Active sessions", value: currentUser?.status === "live" ? "1" : "0", icon: Shield, color: "green", trend: "" },
    { label: "Avg duration", value: "42m", icon: Clock, color: "cyan", trend: "-5m" },
    { label: "Trust Circle", value: "4", icon: Users, color: "purple", trend: "+1" },
  ];

  const colorMap = {
    cyan: "border-cyan-500/20 bg-cyan-500/5",
    purple: "border-purple-500/20 bg-purple-500/5",
    pink: "border-pink-500/20 bg-pink-500/5",
    green: "border-green-500/20 bg-green-500/5",
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <GlassCard key={stat.label} className={cn("border", colorMap[stat.color as keyof typeof colorMap])}>
            <div className="flex items-start justify-between mb-2">
              <div className={cn(
                "p-2 rounded-lg",
                colorMap[stat.color as keyof typeof colorMap]
              )}>
                <Icon className="w-5 h-5" />
              </div>
              {stat.trend && (
                <span className="text-xs text-green-400 font-medium">{stat.trend}</span>
              )}
            </div>
            <p className="font-display text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </GlassCard>
        );
      })}
    </div>
  );
}
