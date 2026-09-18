"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { LocationSheet } from "@/components/dashboard/LocationSheet";
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const { location, isActive, start, stop } = useGeolocation();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [ghostModeActive, setGhostModeActive] = useState(false);
  const [mapLayer, setMapLayer] = useState<"dark" | "streets">("dark");

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("leaflet/dist/leaflet.css");

    // Clean up existing map if container already initialized
    if ((mapRef.current as any)._leaflet_id && mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const defaultLat = location?.lat || 40.7128;
    const defaultLng = location?.lng || -74.006;

    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([defaultLat, defaultLng], 13);

    mapInstanceRef.current = map;

    // Dark Matter CartoDB Tiles
    const tileUrl =
      mapLayer === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    L.tileLayer(tileUrl, {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    // Render Contact Markers
    DEMO_USERS.forEach((user) => {
      if (user.lat === undefined || user.lng === undefined) return;
      const colors: Record<string, { bg: string; border: string; glow: string }> = {
        live: { bg: "rgba(34,197,94,0.3)", border: "#22c55e", glow: "rgba(34,197,94,0.6)" },
        away: { bg: "rgba(250,204,21,0.3)", border: "#facc15", glow: "rgba(250,204,21,0.5)" },
        ghost: { bg: "rgba(168,85,247,0.3)", border: "#a855f7", glow: "rgba(168,85,247,0.6)" },
        offline: { bg: "rgba(100,116,139,0.3)", border: "#64748b", glow: "rgba(100,116,139,0.4)" },
      };
      const c = colors[user.status] || colors.offline;
      const icon = L.divIcon({
        className: "contact-marker",
        html: `<div style="position:relative;width:38px;height:38px;cursor:pointer;">
          <div style="position:absolute;inset:0;border-radius:50%;background:${c.bg};border:2px solid ${c.border};box-shadow:0 0 14px ${c.glow};display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);">
            <span style="color:white;font-size:12px;font-weight:bold;font-family:system-ui;">${user.name[0]}</span>
          </div>
          <div style="position:absolute;bottom:-2px;right:-2px;width:10px;height:10px;border-radius:50%;background:${c.border};border:2px solid #050508;"></div>
        </div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });
      L.marker([user.lat, user.lng], { icon })
        .addTo(map)
        .bindPopup(`<div style="background:#0a0b10;color:#fff;padding:4px;font-family:system-ui;"><b>${user.name}</b><br/><span style="color:#00f0ff;">${user.distance}m away</span> &bull; ${user.battery}% 🔋</div>`)
        .on("click", () => setSelectedUser(user));
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapLayer]);

  // Update or attach user's own live marker
  useEffect(() => {
    if (!mapInstanceRef.current || !location) return;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet");

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([location.lat, location.lng]);
    } else {
      const pulseIcon = L.divIcon({
        className: "user-pulse",
        html: `<div style="position:relative;width:40px;height:40px;">
          <div style="width:20px;height:20px;border-radius:50%;background:#00f0ff;border:2px solid #fff;box-shadow:0 0 20px rgba(0,240,255,0.9);position:absolute;top:10px;left:10px;z-index:2;"></div>
          <div style="position:absolute;inset:0;border-radius:50%;border:2px solid rgba(0,240,255,0.6);animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
        </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      userMarkerRef.current = L.marker([location.lat, location.lng], { icon: pulseIcon }).addTo(mapInstanceRef.current);
    }

    mapInstanceRef.current.setView([location.lat, location.lng], 14, { animate: true });
  }, [location]);

  const handleCenterMap = () => {
    if (mapInstanceRef.current && location) {
      mapInstanceRef.current.setView([location.lat, location.lng], 15, { animate: true });
    } else if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([40.7128, -74.006], 14, { animate: true });
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      <TopNav
        currentPage="dashboard"
        onNavigate={(p) => router.push(p === "dashboard" ? "/main/dashboard" : `/main/${p}`)}
      />

      <main className="flex-1 relative flex flex-col h-[calc(100vh-64px-60px)]">
        {/* Full-bleed Interactive Cyberpunk Map */}
        <div ref={mapRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Top Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={handleCenterMap}
            title="Recenter Map"
            className="glass rounded-xl p-3 hover:bg-white/10 transition-all active:scale-95 shadow-lg border border-white/10"
          >
            <Crosshair className="w-5 h-5 text-cyan-400" />
          </button>
          <button
            onClick={() => setMapLayer((prev) => (prev === "dark" ? "streets" : "dark"))}
            title="Toggle Map Style"
            className="glass rounded-xl p-3 hover:bg-white/10 transition-all active:scale-95 shadow-lg border border-white/10"
          >
            <Layers className="w-5 h-5 text-purple-400" />
          </button>
          <button
            onClick={() => setGhostModeActive((prev) => !prev)}
            title="Toggle Ghost Mode"
            className={`glass rounded-xl p-3 transition-all active:scale-95 shadow-lg border ${
              ghostModeActive
                ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                : "border-white/10 text-text-secondary hover:text-white"
            }`}
          >
            <Ghost className="w-5 h-5" />
          </button>
        </div>

        {/* Top Quick Status Pill */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <div className="glass-strong px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              {ghostModeActive ? "Ghost Mode Active" : "Trust Circle Live"}
            </span>
            <span className="text-xs text-cyan-400 font-bold ml-1">4 Nearby</span>
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
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5" /> Start Broadcasting
                  </button>
                ) : (
                  <button
                    onClick={() => stop()}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
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
            if (mapInstanceRef.current && selectedUser.lat && selectedUser.lng) {
              mapInstanceRef.current.setView([selectedUser.lat, selectedUser.lng], 16, { animate: true });
              setSelectedUser(null);
            }
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
