"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { TopNav } from "@/components/dashboard/TopNav";
import { Ghost, EyeOff, Radio, CheckCircle2, AlertTriangle } from "lucide-react";

export default function GhostModePage() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const activate = () => {
    setConfirming(true);
    setTimeout(() => setEnabled(true), 1500);
  };

  const deactivate = () => {
    setEnabled(false);
    setConfirming(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="ghost" onNavigate={(p) => router.push(p === "ghost" ? "/main/ghost-mode" : `/main/${p}`)} />

      <main className="max-w-lg mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {enabled ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/20 mb-6 animate-pulse">
                <Ghost className="w-12 h-12 text-purple-400" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2 text-purple-400">GHOST MODE ACTIVE</h1>
              <p className="text-text-secondary mb-8">
                Your location is hidden from all contacts. You appear offline and unavailable.
              </p>
              <GlassCard className="mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-text-muted">Status</span><span className="text-purple-400 font-medium">Invisible</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Sharing</span><span className="text-red-400 font-medium">Stopped</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Visibility</span><span className="text-purple-400 font-medium">Hidden</span></div>
                </div>
              </GlassCard>
              <NeonButton variant="secondary" className="w-full" onClick={deactivate}>
                <EyeOff className="w-4 h-4" /> Disable Ghost Mode
              </NeonButton>
            </div>
          ) : confirming ? (
            <div className="text-center py-12">
              <NeonButton variant="secondary" className="w-full" onClick={() => setConfirming(false)}>
                <Radio className="w-4 h-4" /> Activating...
              </NeonButton>
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-bg-tertiary border border-white/10 mb-6">
                <Ghost className="w-12 h-12 text-text-muted" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2">Ghost Mode</h1>
              <p className="text-text-secondary mb-8">
                Go invisible to your trust circle. Stop sharing your location and hide your online status all at once.
              </p>

              <GlassCard className="mb-6 border-purple-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-purple-300">
                    When enabled, all contacts will see you as offline. Your location sharing will stop. You can reactivate anytime.
                  </p>
                </div>
              </GlassCard>

              <NeonButton variant="secondary" size="lg" className="w-full" onClick={activate}>
                <Ghost className="w-4 h-4" /> Activate Ghost Mode
              </NeonButton>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
