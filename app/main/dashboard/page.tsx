"use client";

import { useState, useEffect } from "react";
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
  Key,
  CheckCircle2,
  X,
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
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [googleMapsKey, setGoogleMapsKey] = useState("");
  const [savedKey, setSavedKey] = useState(false);

  useEffect(() => {
    const existingKey = localStorage.getItem("neontrace_google_maps_key") || "";
    setGoogleMapsKey(existingKey);
  }, []);

  const handleSaveApiKey = () => {
    localStorage.setItem("neontrace_google_maps_key", googleMapsKey);
    setSavedKey(true);
    // Switch to satellite layer to preview Google Maps
    setMapLayer("satellite");
    setTimeout(() => {
      setSavedKey(false);
      setShowApiKeyModal(false);
    }, 1200);
  };

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
            onClick={() => setShowApiKeyModal(true)}
            title="Google Maps API Key & Layer Settings"
            className="glass rounded-xl p-3 hover:bg-cyan-500/20 text-cyan-400 transition-all active:scale-95 shadow-lg border border-cyan-500/30 cursor-pointer"
          >
            <Key className="w-5 h-5" />
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

          <button
            onClick={() => setShowApiKeyModal(true)}
            className="glass-strong px-2.5 py-1.5 rounded-full border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span>Map API Key</span>
          </button>
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

      {/* In-App Google Maps API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setShowApiKeyModal(false)}
          />
          <div className="relative w-full max-w-md glass-strong rounded-2xl p-6 border border-cyan-500/30 shadow-2xl z-10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5 text-cyan-400">
                <Key className="w-5 h-5" />
                <h3 className="font-display font-bold text-base text-white">Google Maps API Configuration</h3>
              </div>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                  Paste your Google Maps API Key
                </label>
                <input
                  type="text"
                  value={googleMapsKey}
                  onChange={(e) => setGoogleMapsKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-2.5 bg-bg-primary border border-white/15 rounded-xl outline-none focus:border-cyan-500 text-sm font-mono text-cyan-300 placeholder:text-text-muted"
                />
                <p className="text-[11px] text-text-muted mt-1.5">
                  Your key is saved locally in your browser to enable live Google Satellite & Street Maps tiles immediately.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                  Select Active Map Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMapLayer("dark")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      mapLayer === "dark"
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                        : "bg-white/5 border-white/10 text-text-muted hover:text-white"
                    }`}
                  >
                    Dark Matter
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapLayer("satellite")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      mapLayer === "satellite"
                        ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                        : "bg-white/5 border-white/10 text-text-muted hover:text-white"
                    }`}
                  >
                    Google Satellite
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapLayer("streets")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      mapLayer === "streets"
                        ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                        : "bg-white/5 border-white/10 text-text-muted hover:text-white"
                    }`}
                  >
                    Street Map
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveApiKey}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {savedKey ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-300" />
                    <span>Applied & Saved!</span>
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>Save & Apply Key</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
