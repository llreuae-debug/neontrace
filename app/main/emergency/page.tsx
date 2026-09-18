"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { TopNav } from "@/components/dashboard/TopNav";
import type { User } from "@/types";
import { Radio, Shield, AlertTriangle } from "lucide-react";

const EMERGENCY_CONTACTS: User[] = [
  { id: "1", name: "Sarah", status: "live", distance: 120, battery: 84 },
  { id: "2", name: "James", status: "live", distance: 340, battery: 67 },
  { id: "3", name: "Mom", status: "live", distance: 890, battery: 45 },
];

export default function EmergencyPage() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>(["1"]);

  const toggleContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const startEmergency = () => {
    setConfirming(true);
    setSharing(true);
    setTimeout(() => {
      setSharing(false);
    }, 1500);
  };


  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="emergency" onNavigate={(p) => router.push(p === "emergency" ? "/main/emergency" : `/main/${p}`)} />

      <main className="max-w-lg mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/20 mb-6">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">Emergency Share</h1>
            <p className="text-text-secondary">Quickly share your live location with selected contacts</p>
          </div>

          <GlassCard className="border-red-500/20 bg-red-500/5 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">This will immediately start sharing your live location with all selected contacts. You can stop at any time.</p>
            </div>
          </GlassCard>

          <GlassCard className="mb-6">
            <h3 className="font-display font-semibold mb-4">Emergency Contacts</h3>
            <div className="space-y-2">
              {EMERGENCY_CONTACTS.map((c) => (
                <label key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-bg-primary cursor-pointer hover:bg-white/5">
                  <input type="checkbox" checked={selectedContacts.includes(c.id)} onChange={() => toggleContact(c.id)} className="w-4 h-4 rounded border-white/20 bg-bg-primary text-red-400 focus:ring-red-400" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-text-muted">{c.distance}m away</p>
                  </div>
                </label>
              ))}
            </div>
          </GlassCard>

          {!confirming ? (
            <NeonButton variant="danger" size="xl" className="w-full" onClick={startEmergency}>
              <Radio className="w-5 h-5" /> EMERGENCY SHARE
            </NeonButton>
          ) : sharing ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-400 rounded-full animate-spin mx-auto mb-4" />
              <p className="font-display font-semibold">Sharing your location...</p>
            </div>
          ) : (
            <>
              <GlassCard className="border-red-500/30 bg-red-500/5 text-center mb-4">
                <Radio className="w-8 h-8 text-red-400 mx-auto mb-2 animate-pulse" />
                <p className="font-display font-bold">⚡ Sharing now!</p>
                <p className="text-sm text-text-muted mt-1">To {selectedContacts.length} contacts</p>
              </GlassCard>
              <NeonButton variant="danger" className="w-full" onClick={() => { setConfirming(false); setSharing(false); }}>
                <Shield className="w-4 h-4" /> Stop Emergency Share
              </NeonButton>
              <NeonButton variant="ghost" className="w-full mt-2" onClick={() => router.push("/main/dashboard")}>
                Back to Dashboard
              </NeonButton>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}
