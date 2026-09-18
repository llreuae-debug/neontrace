"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Radio, Crosshair, Layers } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { User } from "@/types";

const DEMO_USERS: User[] = [
  { id: "1", name: "Amina", lat: 40.7128, lng: -74.006, distance: 120, battery: 84, status: "live" },
  { id: "2", name: "Marcus", lat: 40.758, lng: -73.9855, distance: 340, battery: 67, status: "live" },
];

const MODE_LABELS: Record<string, string> = {
  BATTERY_SAVER: "Battery Saver",
  BALANCED: "Balanced",
  REAL_TIME: "Real-Time",
};

export default function ActivityPage() {
  const router = useRouter();
  const { location, isActive, start, stop, error } = useGeolocation();
  const [mode, setMode] = useState<string>("BALANCED");
  const [mapLayer, setMapLayer] = useState<"dark" | "streets">("dark");

  return (
    <div className="min-h-screen bg-bg-primary">
      <TopNav currentPage="activity" onNavigate={(p) => router.push(p === "activity" ? "/main/activity" : `/main/${p}`)} />
      <div className="h-[calc(100vh-64px)] relative">
        <InteractiveMap
          users={DEMO_USERS}
          location={location}
          mapLayer={mapLayer}
          className="w-full h-full"
        />

        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={() => start()}
            className="glass rounded-xl p-3 hover:bg-white/10 cursor-pointer shadow-lg"
            title="Recenter"
          >
            <Crosshair className="w-5 h-5 text-cyan-400" />
          </button>
          <button
            onClick={() => setMapLayer((l) => (l === "dark" ? "streets" : "dark"))}
            className="glass rounded-xl p-3 hover:bg-white/10 cursor-pointer shadow-lg"
            title="Toggle Map"
          >
            <Layers className="w-5 h-5 text-purple-400" />
          </button>
          <button className="glass rounded-xl p-3 hover:bg-white/10 cursor-pointer shadow-lg">
            <Radio className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20">
          <GlassCard className="border border-white/15 bg-bg-card/90 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-sm">{isActive ? "Tracking Active" : "Not Tracking"}</p>
                {location && <p className="text-xs text-cyan-400 font-mono">{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>}
                {error && <p className="text-xs text-red-400 mt-1">Error: {error.message}</p>}
              </div>
              {!isActive ? (
                <button onClick={() => start()} className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-colors cursor-pointer">Start Tracking</button>
              ) : (
                <div className="flex items-center gap-2">
                  {Object.entries(MODE_LABELS).map(([key, label]) => (
                    <button key={key} onClick={() => setMode(key)} className={`px-2 py-1 text-[10px] rounded-lg border cursor-pointer ${mode === key ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" : "bg-white/5 text-text-muted border-white/10"}`}>{label}</button>
                  ))}
                  <button onClick={() => stop()} className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 text-xs font-semibold hover:bg-red-500/30 transition-colors cursor-pointer">Stop</button>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
