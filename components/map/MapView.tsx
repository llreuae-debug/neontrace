"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { Loader2 } from "lucide-react";

interface MapViewProps {
  users?: User[];
  currentUserLat?: number;
  currentUserLng?: number;
  center?: [number, number];
  zoom?: number;
  showCurrentLocation?: boolean;
  className?: string;
}

export function MapView({
  users = [],
  currentUserLat,
  currentUserLng,
  center = [40.7128, -74.006],
  zoom = 13,
  showCurrentLocation = true,
  className,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    if (typeof window === "undefined" || !mapRef.current) return;

    import("leaflet").then((L) => {
      if (isCancelled || !mapRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if ((mapRef.current as any)._leaflet_id) {
        (mapRef.current as any)._leaflet_id = null;
      }

      const map = L.map(mapRef.current, { zoomControl: false }).setView(center, zoom);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OSM &copy; CARTO",
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      if (showCurrentLocation && currentUserLat !== undefined && currentUserLng !== undefined) {
        const pulseIcon = L.divIcon({
          className: "pulse",
          html: `<div style="position:relative;width:40px;height:40px;"><div style="position:absolute;inset:-8px;border-radius:50%;border:2px solid rgba(0,240,255,0.4);animation:pulse-ring 2s infinite;"></div><div style="position:absolute;inset:8px;border-radius:50%;background:#00f0ff;box-shadow:0 0 20px rgba(0,240,255,0.6);"></div></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
        L.marker([currentUserLat, currentUserLng], { icon: pulseIcon }).addTo(map);
      }

      users.forEach((user) => {
        if (user.lat === undefined || user.lng === undefined) return;
        const avatarIcon = L.divIcon({
          className: "avatar-marker",
          html: `<div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;"><div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:bold;border:2px solid white;box-shadow:0 0 12px rgba(99,102,241,0.5);">${user.name[0]}</div></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });
        L.marker([user.lat, user.lng], { icon: avatarIcon }).addTo(map).bindPopup(`<b>${user.name}</b>`);
      });

      setIsLoaded(true);
    });

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [users, currentUserLat, currentUserLng, center, zoom, showCurrentLocation]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div ref={mapRef} className="w-full h-full bg-[#050508]" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050508] text-cyan-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}
    </div>
  );
}
