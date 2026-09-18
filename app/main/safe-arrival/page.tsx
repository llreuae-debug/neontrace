"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { TopNav } from "@/components/dashboard/TopNav";
import { MapPin, Navigation, CheckCircle2 } from "lucide-react";

export default function SafeArrivalPage() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [contact, setContact] = useState("");
  const [arrived, setArrived] = useState(false);

  const start = () => {
    if (!destination || !time || !contact) return;
    setActive(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="safe-arrival" onNavigate={(p) => router.push(p === "safe-arrival" ? "/main/safe-arrival" : `/main/${p}`)} />

      <main className="max-w-lg mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/20 mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">Safe Arrival</h1>
            <p className="text-text-secondary">Tell a trusted contact when you&apos;ve arrived safely</p>
          </div>

          {arrived ? (
            <GlassCard className="text-center border-green-500/30 bg-green-500/5">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-green-400 mb-2">ARRIVED SAFELY ✓</h2>
              <p className="text-text-secondary">Your contact has been notified</p>
              <NeonButton variant="secondary" className="w-full mt-6" onClick={() => { setArrived(false); setActive(false); }}>
                Reset
              </NeonButton>
            </GlassCard>
          ) : !active ? (
            <GlassCard className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Where are you going?"
                    className="w-full pl-10 pr-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 transition-all text-text-primary placeholder:text-text-muted"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Expected Arrival</label>
                <input
                  type="datetime-local"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 transition-all text-text-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tell This Person</label>
                <select
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 transition-all text-text-primary"
                >
                  <option value="">Select contact</option>
                  <option>Amina</option>
                  <option>Marcus</option>
                  <option>Sofia</option>
                </select>
              </div>
              <NeonButton variant="primary" size="lg" className="w-full" onClick={start} disabled={!destination || !time || !contact}>
                <Navigation className="w-4 h-4" /> Set Safe Arrival
              </NeonButton>
            </GlassCard>
          ) : (
            <GlassCard className="text-center">
              <p className="font-display font-semibold mb-4">Tracking your arrival...</p>
              <p className="text-sm text-text-muted mb-2">Destination: {destination}</p>
              <p className="text-sm text-text-muted mb-6">Expected: {time}</p>
              <div className="flex items-center justify-center gap-1 mb-6">
                {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />)}
              </div>
              <NeonButton variant="secondary" className="w-full" onClick={() => setArrived(true)}>
                I&apos;ve Arrived
              </NeonButton>
            </GlassCard>
          )}
        </motion.div>
      </main>
    </div>
  );
}
