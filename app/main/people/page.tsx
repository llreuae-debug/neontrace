"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { TopNav } from "@/components/dashboard/TopNav";
import { TrustCircleCard } from "@/components/dashboard/TrustCircleCard";
import { MapView } from "@/components/map/MapView";
import { Search } from "lucide-react";
import type { User } from "@/types";

const DEMO_CONTACTS: User[] = [
  { id: "1", name: "Amina", status: "live", distance: 120, battery: 84 },
  { id: "2", name: "Marcus", status: "live", distance: 340, battery: 67 },
  { id: "3", name: "Sofia", status: "away", distance: 890, battery: 45 },
  { id: "4", name: "Kai", status: "ghost", distance: 1200, battery: 92 },
  { id: "5", name: "Luna", status: "offline", distance: 2100, battery: 30 },
];

export default function PeoplePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<User | null>(null);

  const filtered = DEMO_CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="people" onNavigate={(p) => router.push(p === "people" ? "/main/people" : `/main/${p}`)} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold">People</h1>
              <p className="text-text-muted text-sm">{filtered.length} contacts in your trust circle</p>
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search people..."
              className="w-full pl-10 pr-4 py-3 bg-bg-card border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 transition-all text-text-primary placeholder:text-text-muted"
            />
          </div>

          <div className="space-y-4">
            {filtered.map((contact) => (
              <TrustCircleCard
                key={contact.id}
                user={contact}
                onRemove={() => {}}
                onMessage={() => {}}
                onShare={() => router.push("/main/share")}
                onBlock={() => {}}
              />
            ))}
          </div>

          {selectedContact && (
            <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setSelectedContact(null)}>
              <div className="absolute inset-0 bg-black/60" />
              <GlassCard className="w-full max-w-md rounded-t-3xl rounded-b-none p-6 z-10">
                <p className="font-display text-xl font-bold mb-2">{selectedContact.name}</p>
                <NeonButton variant="primary" className="w-full mt-4" onClick={() => setSelectedContact(null)}>
                  Close
                </NeonButton>
              </GlassCard>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
