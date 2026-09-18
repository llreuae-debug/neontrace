"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Radio, Crosshair } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { User } from "@/types";

const DEMO_USERS: User[] = [
  { id: "1", name: "Amina", lat: 40.7128, lng: -74.006, distance: 120, battery: 84, status: "live" },
  { id: "2", name: "Marcus", lat: 40.758, lng: -73.9855, distance: 340, battery: 67, status: "live" },
];

export default function MapPage() {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const { location, isActive, start, stop } = useGeolocation();

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;
    const L = require("leaflet"); // eslint-disable-line @typescript-eslint/no-require-imports
    require("leaflet/dist/leaflet.css"); // eslint-disable-line @typescript-eslint/no-require-imports

    const map = L.map(mapRef.current).setView([40.7128, -74.006], 13);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OSM &copy; CARTO",
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    DEMO_USERS.forEach((user) => {
      if (user.lat === undefined || user.lng === undefined) return;
      const icon = L.divIcon({
        className: "marker",
        html: `<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:bold;border:2px solid white;box-shadow:0 0 10px rgba(99,102,241,0.5);">${user.name[0]}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      L.marker([user.lat, user.lng], { icon }).addTo(map).bindPopup(`<b>${user.name}</b><br/>${user.distance}m away`);
    });

    if (location) {
      const pulseIcon = L.divIcon({
        className: "pulse",
        html: `<div style="position:relative;"><div style="width:20px;height:20px;border-radius:50%;background:#00f0ff;box-shadow:0 0 20px rgba(0,240,255,0.8);position:absolute;inset:0;"></div><div style="position:absolute;inset:-10px;border-radius:50%;border:2px solid rgba(0,240,255,0.4);animation:pulse-ring 2s infinite;"></div></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      L.marker([location.lat, location.lng], { icon: pulseIcon }).addTo(map);
      map.setView([location.lat, location.lng], 15);
    }

    return () => { map.remove(); };
  }, [location]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <TopNav currentPage="map" onNavigate={(p) => router.push(p === "map" ? "/main/map" : `/main/${p}`)} />
      <div className="h-[calc(100vh-64px)] relative">
        <div ref={mapRef} className="w-full h-full" />
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button className="glass rounded-xl p-3 hover:bg-white/10"><Crosshair className="w-5 h-5 text-cyan-400" /></button>
          <button className="glass rounded-xl p-3 hover:bg-white/10"><Radio className="w-5 h-5 text-text-secondary" /></button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-semibold">{isActive ? "Tracking Active" : "Not Tracking"}</p>
                {location && <p className="text-xs text-cyan-400">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>}
              </div>
              <button
                onClick={() => {
                  if (isActive) {
                    stop();
                  } else {
                    start();
                  }
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors cursor-pointer"
              >
                {isActive ? "Stop" : "Start"}
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
