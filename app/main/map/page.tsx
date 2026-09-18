"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Radio, Crosshair, Layers, Key, CheckCircle2, X } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { User } from "@/types";

const DEMO_USERS: User[] = [
  { id: "1", name: "Amina", lat: 40.7128, lng: -74.006, distance: 120, battery: 84, status: "live" },
  { id: "2", name: "Marcus", lat: 40.758, lng: -73.9855, distance: 340, battery: 67, status: "live" },
];

export default function MapPage() {
  const router = useRouter();
  const { location, isActive, start, stop } = useGeolocation();
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
    <div className="min-h-screen bg-bg-primary">
      <TopNav currentPage="map" onNavigate={(p) => router.push(p === "map" ? "/main/map" : `/main/${p}`)} />
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
            title="Recenter Map"
          >
            <Crosshair className="w-5 h-5 text-cyan-400" />
          </button>
          <button
            onClick={toggleMapLayer}
            className="glass rounded-xl p-3 hover:bg-white/10 cursor-pointer shadow-lg"
            title={`Toggle Layer (${mapLayer})`}
          >
            <Layers className="w-5 h-5 text-purple-400" />
          </button>
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="glass rounded-xl p-3 hover:bg-cyan-500/20 text-cyan-400 cursor-pointer shadow-lg border border-cyan-500/30"
            title="Configure Google Maps API Key"
          >
            <Key className="w-5 h-5" />
          </button>
          <button className="glass rounded-xl p-3 hover:bg-white/10 cursor-pointer shadow-lg">
            <Radio className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="glass-strong px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span>Map API Key ({mapLayer})</span>
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20">
          <GlassCard className="border border-white/15 bg-bg-card/90 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-sm">{isActive ? "Tracking Active" : "Not Tracking"}</p>
                {location && (
                  <p className="text-xs text-cyan-400 font-mono">
                    {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  if (isActive) {
                    stop();
                  } else {
                    start();
                  }
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors cursor-pointer"
              >
                {isActive ? "Stop" : "Start Live GPS"}
              </button>
            </div>
          </GlassCard>
        </div>
      </div>

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
                  Saved directly in your browser. Enables Google Satellite, Hybrid, and Road tiles in real-time.
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
    </div>
  );
}
