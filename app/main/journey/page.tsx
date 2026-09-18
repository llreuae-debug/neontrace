"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { NeonButton } from "@/components/ui/NeonButton";
import { formatTimeAgo } from "@/lib/utils";
import type { ActivityItem } from "@/types";
import { Clock, MapPin, Navigation, Shield, Share2, CheckCircle2, Ghost, AlertCircle, KeyRound, Eye, Trash2 } from "lucide-react";

const DEMO_JOURNEY = [
  { time: "09:12", event: "Left Home", icon: Navigation, color: "cyan" },
  { time: "09:45", event: "Coffee Shop", icon: MapPin, color: "purple" },
  { time: "10:30", event: "Office", icon: MapPin, color: "cyan" },
  { time: "12:15", event: "Lunch Break", icon: MapPin, color: "pink" },
  { time: "13:00", event: "Office", icon: MapPin, color: "cyan" },
  { time: "18:45", event: "Home", icon: CheckCircle2, color: "green" },
];

const DEMO_ACTIVITIES: ActivityItem[] = [
  { id: "1", type: "sharing_started", description: "Location sharing started with Amina", timestamp: Date.now() - 7200000 },
  { id: "2", type: "arrived", description: "Arrived at Office", timestamp: Date.now() - 5400000 },
  { id: "3", type: "location_viewed", description: "Marcus viewed your location", timestamp: Date.now() - 3600000 },
  { id: "4", type: "sharing_expired", description: "Sharing session expired", timestamp: Date.now() - 1800000 },
  { id: "5", type: "ghost_mode", description: "Ghost Mode was enabled", timestamp: Date.now() - 600000 },
  { id: "6", type: "sharing_started", description: "Location sharing started with Sofia", timestamp: Date.now() - 120000 },
];

export default function JourneyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="activity" onNavigate={(p) => router.push(p === "activity" ? "/main/activity" : `/main/${p}`)} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold mb-8">My Journey</h1>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <GlassCard className="text-center">
              <p className="font-display text-xl font-bold">4.2 km</p>
              <p className="text-xs text-text-muted mt-1">Today</p>
            </GlassCard>
            <GlassCard className="text-center">
              <p className="font-display text-xl font-bold">6</p>
              <p className="text-xs text-text-muted mt-1">Places</p>
            </GlassCard>
            <GlassCard className="text-center">
              <p className="font-display text-xl font-bold">3h 20m</p>
              <p className="text-xs text-text-muted mt-1">Traveling</p>
            </GlassCard>
          </div>

          {/* Timeline */}
          <GlassCard className="mb-8">
            <h3 className="font-display font-semibold mb-4">Today&apos;s Route</h3>
            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-500/30 to-green-500/30" />
              {DEMO_JOURNEY.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="relative flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center border border-white/10 shrink-0 z-10">
                      <Icon className="w-3.5 h-3.5 text-{item.color}" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.event}</p>
                      <p className="text-xs text-text-muted">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Delete History */}
          <NeonButton variant="secondary" className="w-full">
            <Trash2 className="w-4 h-4" /> Delete History
          </NeonButton>
        </motion.div>
      </main>
    </div>
  );
}
