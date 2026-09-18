"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { NeonButton } from "@/components/ui/NeonButton";
import { MapPin, Navigation, Clock, Star, Heart, Filter } from "lucide-react";

const PLACES = [
  { id: "1", name: "Home", address: "123 Main St, New York", lat: 40.7128, lng: -74.006, type: "home" as const, distance: 0 },
  { id: "2", name: "Office", address: "456 Park Ave, New York", lat: 40.758, lng: -73.9855, type: "work" as const, distance: 5200 },
  { id: "3", name: "Coffee Shop", address: "789 Broadway, New York", lat: 40.7484, lng: -73.9857, type: "custom" as const, distance: 1200 },
  { id: "4", name: "Gym", address: "321 Fitness Ave, New York", lat: 40.7614, lng: -73.9776, type: "custom" as const, distance: 2800 },
  { id: "5", name: "Mall", address: "555 Commerce St, New York", lat: 40.7436, lng: -73.9901, type: "custom" as const, distance: 4100 },
];

export default function PlacesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? PLACES : PLACES.filter((p) => p.type === filter);

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="places" onNavigate={(p) => router.push(p === "places" ? "/main/places" : `/main/${p}`)} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold">Saved Places</h1>
              <p className="text-text-muted text-sm">{PLACES.length} places saved</p>
            </div>
            <NeonButton size="sm" variant="primary">
              <MapPin className="w-4 h-4" /> Add
            </NeonButton>
          </div>

          <div className="flex gap-2 mb-6">
            {["all", "home", "work", "custom"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  filter === f ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" : "bg-white/5 text-text-muted border-white/10"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((place) => (
              <GlassCard key={place.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{place.name}</p>
                  <p className="text-xs text-text-muted truncate">{place.address}</p>
                </div>
                <span className="text-xs text-text-muted">{place.distance > 0 ? `${(place.distance / 1000).toFixed(1)}km` : "Here"}</span>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
