"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { LocationSheet } from "@/components/dashboard/LocationSheet";
import { MapView } from "@/components/map/MapView";
import { TopNav } from "@/components/dashboard/TopNav";
import type { User } from "@/types";
import { Map, Users, Shield, Clock, Zap, Eye, Radio, Save, Trash2 } from "lucide-react";

const DEMO_USER: User = { id: "1", name: "Alex", status: "live", lat: 40.7128, lng: -74.006 };

export default function SharePage() {
  const router = useRouter();
  const [duration, setDuration] = useState<string>("1 hour");
  const [recipients, setRecipients] = useState<string[]>([]);

  const durations = ["15 minutes", "30 minutes", "1 hour", "4 hours", "Until stopped"];

  const generateToken = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="share" onNavigate={(p: string) => router.push(p === "share" ? "/main/share" : `/main/${p}`)} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Share Location</h1>
            <p className="text-text-secondary">Control who sees your live location and for how long</p>
          </div>

          {/* Map Preview */}
          <GlassCard className="mb-6 overflow-hidden">
            <div className="h-48 rounded-xl bg-bg-primary relative">
              <MapView currentUserLat={DEMO_USER.lat} currentUserLng={DEMO_USER.lng} showCurrentLocation={false} />
            </div>
          </GlassCard>

          {/* Duration Selection */}
          <GlassCard className="mb-6">
            <h3 className="font-display font-semibold mb-4">Duration</h3>
            <div className="grid grid-cols-3 gap-2">
              {durations.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-3 py-2.5 text-xs font-medium rounded-xl border transition-all ${
                    duration === d
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                      : "bg-white/5 text-text-secondary border-white/10 hover:bg-white/10"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Recipients */}
          <GlassCard className="mb-6">
            <h3 className="font-display font-semibold mb-4">Share With</h3>
            <div className="space-y-2">
              {["Amina", "Marcus", "Sofia", "Kai"].map((name) => (
                <label key={name} className="flex items-center gap-3 p-3 rounded-xl bg-bg-primary cursor-pointer hover:bg-white/5 transition-colors">
                  <input type="checkbox" checked={recipients.includes(name)} onChange={(e) => {
                    if (e.target.checked) setRecipients([...recipients, name]);
                    else setRecipients(recipients.filter((r) => r !== name));
                  }} className="w-4 h-4 rounded border-white/20 bg-bg-primary text-cyan-400 focus:ring-cyan-400" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-violet to-purple-600 flex items-center justify-center text-white text-xs font-bold">{name[0]}</div>
                  <span className="flex-1 font-medium">{name}</span>
                  <span className="text-xs text-text-muted">{Math.floor(Math.random() * 500 + 50)}m</span>
                </label>
              ))}
            </div>
          </GlassCard>

          {/* Share Link */}
          <GlassCard className="mb-6">
            <h3 className="font-display font-semibold mb-3">Share Link</h3>
            <div className="flex items-center gap-2 p-3 bg-bg-primary rounded-xl border border-white/10">
              <code className="flex-1 text-sm text-cyan-400 truncate">neontrace.app/share/{generateToken()}</code>
              <NeonButton size="sm" variant="secondary">Copy</NeonButton>
            </div>
          </GlassCard>

          <NeonButton variant="primary" size="lg" className="w-full">
            <Radio className="w-4 h-4" /> Start Sharing Session
          </NeonButton>
        </motion.div>
      </main>
    </div>
  );
}
