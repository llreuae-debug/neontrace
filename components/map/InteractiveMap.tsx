"use client";

import { useEffect, useRef, useState } from "react";
import type { User } from "@/types";
import { Loader2 } from "lucide-react";

interface InteractiveMapProps {
  users?: User[];
  location?: { lat: number; lng: number; accuracy?: number } | null;
  selectedUser?: User | null;
  onSelectUser?: (user: User) => void;
  mapLayer?: "dark" | "streets" | "google" | "satellite";
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export function InteractiveMap({
  users = [],
  location,
  onSelectUser,
  mapLayer = "dark",
  center = [40.7128, -74.006],
  zoom = 13,
  className = "w-full h-full",
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    if (typeof window === "undefined" || !mapContainerRef.current) return;

    // Asynchronously import Leaflet
    import("leaflet").then((L) => {
      if (isCancelled || !mapContainerRef.current) return;

      // Clean up previous map instance if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      if ((mapContainerRef.current as any)._leaflet_id) {
        (mapContainerRef.current as any)._leaflet_id = null;
      }

      const initialLat = location?.lat || center[0];
      const initialLng = location?.lng || center[1];

      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
      }).setView([initialLat, initialLng], zoom);

      mapInstanceRef.current = map;

      // Check for Google Maps Key from env or localStorage
      const googleKey =
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
        (typeof window !== "undefined" ? localStorage.getItem("neontrace_google_maps_key") : "") ||
        "";

      let tileUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
      let subdomains = "abcd";
      let attribution = "&copy; OpenStreetMap contributors &copy; CARTO";

      if (mapLayer === "streets") {
        tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        attribution = "&copy; OpenStreetMap contributors";
      } else if (mapLayer === "google" || mapLayer === "satellite") {
        const keyParam = googleKey ? `&key=${googleKey}` : "";
        if (mapLayer === "satellite") {
          tileUrl = `https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}${keyParam}`;
        } else {
          tileUrl = `https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}${keyParam}`;
        }
        subdomains = "0123";
        attribution = "&copy; Google Maps";
      }

      L.tileLayer(tileUrl, {
        attribution,
        subdomains,
        maxZoom: 20,
      }).addTo(map);

      // Create a layer group for contacts
      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;

      renderContactMarkers(L, markersGroup);

      setIsMapReady(true);
    });

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapLayer]);

  const renderContactMarkers = (L: any, group: any) => {
    group.clearLayers();

    users.forEach((user) => {
      if (user.lat === undefined || user.lng === undefined) return;
      const colors: Record<string, { bg: string; border: string; glow: string }> = {
        live: { bg: "rgba(34,197,94,0.25)", border: "#22c55e", glow: "rgba(34,197,94,0.5)" },
        away: { bg: "rgba(250,204,21,0.25)", border: "#facc15", glow: "rgba(250,204,21,0.4)" },
        ghost: { bg: "rgba(168,85,247,0.25)", border: "#a855f7", glow: "rgba(168,85,247,0.5)" },
        offline: { bg: "rgba(100,116,139,0.25)", border: "#64748b", glow: "rgba(100,116,139,0.3)" },
      };
      const c = colors[user.status] || colors.offline;

      const icon = L.divIcon({
        className: "contact-marker",
        html: `<div style="position:relative;width:38px;height:38px;cursor:pointer;">
          <div style="position:absolute;inset:0;border-radius:50%;background:${c.bg};border:2px solid ${c.border};box-shadow:0 0 14px ${c.glow};display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);">
            <span style="color:white;font-size:12px;font-weight:bold;font-family:system-ui;">${user.name[0]}</span>
          </div>
          <div style="position:absolute;bottom:-1px;right:-1px;width:10px;height:10px;border-radius:50%;background:${c.border};border:2px solid #050508;"></div>
        </div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      const marker = L.marker([user.lat, user.lng], { icon });
      marker.bindPopup(
        `<div style="background:#0a0b10;color:#fff;padding:6px 8px;border-radius:8px;font-family:system-ui;font-size:12px;min-width:120px;">
          <b style="font-size:13px;display:block;margin-bottom:2px;">${user.name}</b>
          <span style="color:#00f0ff;">${user.distance ?? 0}m away</span>
          ${user.battery !== undefined ? ` &bull; 🔋 ${user.battery}%` : ""}
        </div>`
      );

      if (onSelectUser) {
        marker.on("click", () => onSelectUser(user));
      }

      group.addLayer(marker);
    });
  };

  // Re-render markers if users change
  useEffect(() => {
    if (!isMapReady || !markersGroupRef.current) return;
    import("leaflet").then((L) => {
      if (markersGroupRef.current) {
        renderContactMarkers(L, markersGroupRef.current);
      }
    });
  }, [users, isMapReady]);

  // Update user location marker
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !location) return;

    import("leaflet").then((L) => {
      if (!mapInstanceRef.current || !location) return;

      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([location.lat, location.lng]);
      } else {
        const pulseIcon = L.divIcon({
          className: "user-pulse-marker",
          html: `<div style="position:relative;width:40px;height:40px;">
            <div style="width:18px;height:18px;border-radius:50%;background:#00f0ff;border:2px solid #ffffff;box-shadow:0 0 18px rgba(0,240,255,0.9);position:absolute;top:11px;left:11px;z-index:2;"></div>
            <div style="position:absolute;inset:0;border-radius:50%;border:2px solid rgba(0,240,255,0.7);animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
          </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
        userMarkerRef.current = L.marker([location.lat, location.lng], { icon: pulseIcon }).addTo(
          mapInstanceRef.current
        );
      }
      mapInstanceRef.current.setView([location.lat, location.lng], 14, { animate: true });
    });
  }, [location, isMapReady]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full bg-[#050508]" />
      {!isMapReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050508] text-cyan-400 gap-3 z-10">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-xs text-text-muted font-mono tracking-widest uppercase">
            Loading Satellite Telemetry...
          </p>
        </div>
      )}
    </div>
  );
}
