"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { LocationSheet } from "@/components/dashboard/LocationSheet";
import { useGeolocation } from "@/hooks/useGeolocation";
import { LOCATION_MODES } from "@/lib/constants";
import type { User } from "@/types";
import { Crosshair, Layers, Compass } from "lucide-react";

const DEMO_USERS: User[] = [
  { id: "1", name: "Amina", lat: 40.7128, lng: -74.006, distance: 120, battery: 84, status: "live" },
  { id: "2", name: "Marcus", lat: 40.758, lng: -73.9855, distance: 340, battery: 67, status: "live" },
  { id: "3", name: "Sofia", lat: 40.7484, lng: -73.9857, distance: 890, battery: 45, status: "away" },
  { id: "4", name: "Kai", lat: 40.7614, lng: -73.9776, distance: 1200, battery: 92, status: "ghost" },
];

export default function DashboardPage() {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const { location, isActive, start, stop } = useGeolocation();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;
      const L = require("leaflet"); // eslint-disable-line @typescript-eslint/no-require-imports
      require("leaflet/dist/leaflet.css"); // eslint-disable-line @typescript-eslint/no-require-imports

    const map = L.map(mapRef.current).setView([40.7128, -74.006], 13);

    DEMO_USERS.forEach((user) => {
      if (user.lat === undefined || user.lng === undefined) return;
      const colors: Record<string, { bg: string; border: string; glow: string }> = {
        live: { bg: "rgba(34,197,94,0.2)", border: "#22c55e", glow: "rgba(34,197,94,0.4)" },
        away: { bg: "rgba(250,204,21,0.2)", border: "#facc15", glow: "rgba(250,204,21,0.3)" },
        ghost: { bg: "rgba(168,85,247,0.2)", border: "#a855f7", glow: "rgba(168,85,247,0.4)" },
        offline: { bg: "rgba(100,116,139,0.2)", border: "#64748b", glow: "rgba(100,116,139,0.3)" },
      };
      const c = colors[user.status] || colors.offline;
      const icon = L.divIcon({
        className: "contact-marker",
        html: `<div style="position:relative;width:36px;height:36px;"><div style="position:absolute;inset:0;border-radius:50%;background:${c.bg};border:2px solid ${c.border};box-shadow:0 0 12px ${c.glow};display:flex;align-items:center;justify-content:center;"><span style="color:white;font-size:11px;font-weight:bold;font-family:system-ui;">${user.name[0]}</span></div></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
      L.marker([user.lat, user.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${user.name}</b><br/>${user.distance}m away`)
        .on("click", () => setSelectedUser(user));
    });

    if (location) {
      map.setView([location.lat, location.lng], 15);
    }

    return () => { map.remove(); };
  }, [location]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <TopNav currentPage="dashboard" onNavigate={() => {}} />

      <div className="h-[calc(100vh-64px)] relative">
        <div ref={mapRef} className="w-full h-full" />

        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button className="glass rounded-xl p-3 hover:bg-white/10 transition-colors"><Crosshair className="w-5 h-5 text-cyan-400" /></button>
          <button className="glass rounded-xl p-3 hover:bg-white/10 transition-colors"><Layers className="w-5 h-5 text-text-secondary" /></button>
          <button className="glass rounded-xl p-3 hover:bg-white/10 transition-colors"><Compass className="w-5 h-5 text-text-secondary" /></button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20">
          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-text-muted"}`} />
                <div>
                  <p className="font-display font-semibold text-sm">{isActive ? "Tracking Active" : "Not Tracking"}</p>
                  {location && <p className="text-xs text-cyan-400">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>}
                </div>
              </div>
              {!isActive ? (
                <button onClick={() => start()} className="px-4 py-2 text-xs font-medium rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors">Track Live</button>
              ) : (
                <button onClick={() => stop()} className="px-4 py-2 text-xs font-medium rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors">Stop</button>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {selectedUser && (
        <LocationSheet user={selectedUser} onClose={() => setSelectedUser(null)} onMessage={() => {}} onShare={() => router.push("/main/share")} />
      )}
    </div>
  );
}
