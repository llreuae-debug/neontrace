"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { TopNav } from "@/components/dashboard/TopNav";
import {
  Shield,
  Eye,
  EyeOff,
  Lock,
  Trash2,
  Clock,
  Fingerprint,
} from "lucide-react";

export default function PrivacyPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    sharing: true,
    precision: "exact" as const,
    history: false,
    autoExpiry: true,
    background: false,
    visibility: "live" as const,
  });

  const score = settings.sharing ? 25 : 0;
  const total = 100;

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="privacy" onNavigate={(p) => router.push(p === "privacy" ? "/main/privacy" : `/main/${p}`)} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Your Location. Your Rules.</h1>
            <p className="text-text-secondary">Control every aspect of your location sharing</p>
          </div>

          {/* Privacy Score */}
          <GlassCard className="mb-8 text-center border-cyan-500/20">
            <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Privacy Score</p>
            <p className="font-display text-5xl font-bold text-cyan-400 mb-2">{score}%</p>
            <p className="text-sm text-text-muted">Not a security certification. An informational guide.</p>
          </GlassCard>

          {/* Controls */}
          {[
            {
              title: "Location Sharing",
              icon: Shield,
              children: (
                <div className="flex items-center gap-3 py-2">
                  <span className="text-sm">{settings.sharing ? "ON" : "OFF"}</span>
                  <button onClick={() => setSettings((s) => ({ ...s, sharing: !s.sharing }))} className={`w-10 h-6 rounded-full transition-all relative ${settings.sharing ? "bg-cyan-500" : "bg-white/10"}`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${settings.sharing ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ),
            },
            {
              title: "Share With",
              icon: Eye,
              children: (
                <div className="flex gap-2 py-2">
                  {["Everyone in trust circle", "Selected people", "Nobody"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {}}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        settings.visibility === opt.toLowerCase()
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                          : "bg-white/5 text-text-muted border-white/10"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ),
            },
            {
              title: "Precision",
              icon: Fingerprint,
              children: (
                <div className="flex gap-2 py-2">
                  {["Exact", "Approximate"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSettings((s) => ({ ...s, precision: opt.toLowerCase() as typeof s.precision }))}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        settings.precision === opt.toLowerCase()
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                          : "bg-white/5 text-text-muted border-white/10"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ),
            },
            {
              title: "Location History",
              icon: Trash2,
              children: (
                <div className="flex items-center gap-3 py-2">
                  <span className="text-sm">{settings.history ? "ON" : "OFF"}</span>
                  <button onClick={() => setSettings((s) => ({ ...s, history: !s.history }))} className={`w-10 h-6 rounded-full transition-all relative ${settings.history ? "bg-cyan-500" : "bg-white/10"}`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${settings.history ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ),
            },
            {
              title: "Auto Expiry",
              icon: Clock,
              children: (
                <div className="flex items-center gap-3 py-2">
                  <span className="text-sm">{settings.autoExpiry ? "ON" : "OFF"}</span>
                  <button onClick={() => setSettings((s) => ({ ...s, autoExpiry: !s.autoExpiry }))} className={`w-10 h-6 rounded-full transition-all relative ${settings.autoExpiry ? "bg-cyan-500" : "bg-white/10"}`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${settings.autoExpiry ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ),
            },
            {
              title: "Background Location",
              icon: Lock,
              children: (
                <div className="py-2">
                  <p className="text-xs text-text-muted mb-2">Browser limitations: Background location requires HTTPS and user permission. Available on mobile browsers.</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{settings.background ? "ON" : "OFF"}</span>
                    <button onClick={() => setSettings((s) => ({ ...s, background: !s.background }))} className={`w-10 h-6 rounded-full transition-all relative ${settings.background ? "bg-cyan-500" : "bg-white/10"}`}>
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${settings.background ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                </div>
              ),
            },
          ].map((section) => {
            const Icon = section.icon;
            return (
              <GlassCard key={section.title} className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-display font-semibold">{section.title}</h3>
                </div>
                {section.children}
              </GlassCard>
            );
          })}

          <div className="text-center">
            <button onClick={() => router.push("/main/profile")} className="text-sm text-cyan-400 hover:underline">
              Back to Profile
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
