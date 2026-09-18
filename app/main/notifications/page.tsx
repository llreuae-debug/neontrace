"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { TopNav } from "@/components/dashboard/TopNav";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { formatTimeAgo } from "@/lib/utils";
import type { User } from "@/types";
import { Plus, X, Send, Shield, Radio } from "lucide-react";

const DEMO_NOTIFICATIONS: User[] = [
  { id: "1", name: "Amina", status: "live", distance: 120, battery: 84 },
  { id: "2", name: "Marcus", status: "live", distance: 340, battery: 67 },
];

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    { id: "1", type: "info" as const, title: "🔵 Location sharing started with Amina", time: Date.now() - 1800000, read: false },
    { id: "2", type: "success" as const, title: "🟢 Sarah arrived safely", time: Date.now() - 3600000, read: false },
    { id: "3", type: "warning" as const, title: "🟣 Sharing session expires in 10 min", time: Date.now() - 5400000, read: true },
    { id: "4", type: "error" as const, title: "🔴 Sharing stopped", time: Date.now() - 7200000, read: true },
  ]);

  const markRead = (id: string) => setNotifications((n) => n.map((x) => (x.id === id ? { ...x, read: true } : x)));

  const typeColors = {
    info: "border-cyan-500/20 bg-cyan-500/5",
    success: "border-green-500/20 bg-green-500/5",
    warning: "border-yellow-500/20 bg-yellow-500/5",
    error: "border-red-500/20 bg-red-500/5",
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="notifications" onNavigate={(p) => router.push(p === "notifications" ? "/main/notifications" : `/main/${p}`)} />

      <main className="max-w-lg mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold mb-6">Notifications</h1>

          {/* Preferences */}
          <GlassCard className="mb-6">
            <h3 className="font-display font-semibold mb-3">Notification Preferences</h3>
            {["Sharing updates", "Session alerts", "Arrival notifications", "Emergency alerts"].map((pref) => (
              <div key={pref} className="flex items-center justify-between py-2">
                <span className="text-sm">{pref}</span>
                <button className={`w-10 h-6 rounded-full transition-all relative ${true ? "bg-cyan-500" : "bg-white/10"}`}>
                  <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all translate-x-4" />
                </button>
              </div>
            ))}
          </GlassCard>

          {/* List */}
          <div className="space-y-2">
            {notifications.map((n) => (
              <GlassCard
                key={n.id}
                className={`cursor-pointer transition-all ${n.read ? "" : typeColors[n.type]}`}
                onClick={() => markRead(n.id)}
              >
                <p className="text-sm">{n.title}</p>
                <p className="text-xs text-text-muted mt-1">{formatTimeAgo(n.time)}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
