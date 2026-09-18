"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { LocationSheet } from "@/components/dashboard/LocationSheet";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { User } from "@/types";
import {
  Crosshair,
  Layers,
  Ghost,
  Share2,
  Users,
  Shield,
  Zap,
} from "lucide-react";

const DEMO_USERS: User[] = [
  { id: "1", name: "Amina", lat: 40.7128, lng: -74.006, distance: 120, battery: 84, status: "live" },
  { id: "2", name: "Marcus", lat: 40.758, lng: -73.9855, distance: 340, battery: 67, status: "live" },
  { id: "3", name: "Sofia", lat: 40.7484, lng: -73.9857, distance: 890, battery: 45, status: "away" },
  { id: "4", name: "Kai", lat: 40.7614, lng: -73.9776, distance: 1200, battery: 92, status: "ghost" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { location, isActive, start, stop } = useGeolocation();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [ghostModeActive, setGhostModeActive] = useState(false);
  const [mapLayer, setMapLayer] = useState<"dark" | "streets" | "satellite">("dark");

  const toggleMapLayer = () => {
    if (mapLayer === "dark") setMapLayer("satellite");
    else if (mapLayer === "satellite") setMapLayer("streets");
    else setMapLayer("dark");
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col overflow-hidden">
      <TopNav
        currentPage="dashboard"
        onNavigate={(p) => router.push(p === "dashboard" ? "/main/dashboard" : `/main/${p}`)}
      />

      <main className="flex-1 relative flex flex-col h-[calc(100vh-64px-60px)]">
        {/* Dynamic Asynchronous Interactive Map */}
        <InteractiveMap
          users={DEMO_USERS}
          location={location}
          selectedUser={selectedUser}
          onSelectUser={(u) => setSelectedUser(u)}
          mapLayer={mapLayer}
          className="absolute inset-0 w-full h-full"
        />

        {/* Top Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button
            onClick={() => {
              if (location) {
                start();
              }
            }}
            title="Recenter Map"
            className="glass rounded-xl p-3 hover:bg-white/10 transition-all active:scale-95 shadow-lg border border-white/10 cursor-pointer"
          >
            <Crosshair className="w-5 h-5 text-cyan-400" />
          </button>
          <button
            onClick={toggleMapLayer}
            title={`Current Layer: ${mapLayer}. Click to toggle Google Satellite / Dark / Streets`}
            className="glass rounded-xl p-3 hover:bg-white/10 transition-all active:scale-95 shadow-lg border border-white/10 cursor-pointer flex items-center justify-center relative group"
          >
            <Layers className="w-5 h-5 text-purple-400" />
            <span className="absolute right-full mr-2 px-2 py-1 rounded bg-black/80 text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {mapLayer === "dark" ? "Dark Matter" : mapLayer === "satellite" ? "Google Satellite" : "Streets"}
            </span>
          </button>
          <button
            onClick={() => setGhostModeActive((prev) => !prev)}
            title="Toggle Ghost Mode"
            className={`glass rounded-xl p-3 transition-all active:scale-95 shadow-lg border cursor-pointer ${
              ghostModeActive
                ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                : "border-white/10 text-text-secondary hover:text-white"
            }`}
          >
            <Ghost className="w-5 h-5" />
          </button>
        </div>

        {/* Top Quick Status Pill */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="glass-strong px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              {ghostModeActive ? "Ghost Mode Active" : "Trust Circle Live"}
            </span>
            <span className="text-xs text-cyan-400 font-bold ml-1">4 Nearby</span>
            <span className="text-[10px] text-purple-400 font-mono ml-1 px-1.5 py-0.5 rounded bg-white/5 uppercase">
              {mapLayer}
            </span>
          </div>
        </div>

        {/* Bottom Interactive Dashboard HUD */}
        <div className="mt-auto p-4 z-20 max-w-5xl w-full mx-auto space-y-3 pointer-events-none">
          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pointer-events-auto">
            <GlassCard
              onClick={() => router.push("/main/trust-circle")}
              className="p-3 cursor-pointer hover:border-cyan-500/30 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Circle</p>
                  <p className="text-xs font-bold text-text-primary">4 Online</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              onClick={() => router.push("/main/safe-arrival")}
              className="p-3 cursor-pointer hover:border-green-500/30 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Safe Arrival</p>
                  <p className="text-xs font-bold text-text-primary">Monitored</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              onClick={() => router.push("/main/ghost-mode")}
              className="p-3 cursor-pointer hover:border-purple-500/30 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Ghost className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Privacy</p>
                  <p className="text-xs font-bold text-text-primary">
                    {ghostModeActive ? "Cloaked" : "Standard"}
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              onClick={() => router.push("/main/share")}
              className="p-3 cursor-pointer hover:border-yellow-500/30 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Share Link</p>
                  <p className="text-xs font-bold text-text-primary">Temporary</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Main Status & Tracker Card */}
          <GlassCard className="p-4 pointer-events-auto border border-white/15 bg-bg-card/90 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <div
                  className={`w-3.5 h-3.5 rounded-full ${
                    isActive ? "bg-green-400 animate-pulse ring-4 ring-green-500/20" : "bg-text-muted"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display font-semibold text-sm">
                      {isActive ? "Live GPS Broadcast Active" : "GPS Broadcast Inactive"}
                    </p>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                        E2E Encrypted
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted">
                    {location
                      ? `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)} (Accuracy: ±${Math.round(location.accuracy || 10)}m)`
                      : "Click 'Start Broadcasting' to acquire real-time coordinates"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {!isActive ? (
                  <button
                    onClick={() => start()}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" /> Start Broadcasting
                  </button>
                ) : (
                  <button
                    onClick={() => stop()}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Stop Broadcast
                  </button>
                )}
              </div>
            </div>
          </GlassCard>
        </div>
      </main>

      {selectedUser && (
        <LocationSheet
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onMessage={() => alert(`Opening secure chat with ${selectedUser.name}...`)}
          onNavigate={() => {
            setSelectedUser(null);
          }}
          onShare={() => router.push("/main/share")}
        />
      )}

      <BottomNav
        currentPage="dashboard"
        onNavigate={(p) => router.push(p === "dashboard" ? "/main/dashboard" : `/main/${p}`)}
      />
    </div>
  );
}
