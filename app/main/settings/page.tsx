"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { TopNav } from "@/components/dashboard/TopNav";
import {
  Moon,
  Globe,
  Shield,
  Bell,
  Volume2,
  Save,
  ChevronRight,
  MapPin,
  Key,
  CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [googleMapsKey, setGoogleMapsKey] = useState("");
  const [mapProvider, setMapProvider] = useState("carto");

  useEffect(() => {
    const existingKey = localStorage.getItem("neontrace_google_maps_key") || "";
    setGoogleMapsKey(existingKey);
    const existingProvider = localStorage.getItem("neontrace_map_provider") || "carto";
    setMapProvider(existingProvider);
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("neontrace_google_maps_key", googleMapsKey);
      localStorage.setItem("neontrace_map_provider", mapProvider);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sections = [
    {
      title: "Map & Navigation Providers",
      icon: MapPin,
      items: [
        {
          icon: MapPin,
          label: "Active Map Engine",
          desc: "CartoDB Dark Matter (Cyberpunk) or Google Maps Satellite / Hybrid",
        },
      ],
    },
    {
      title: "Appearance",
      icon: Moon,
      items: [
        { icon: Moon, label: "Dark Mode (NEON Dark)", desc: "Default dark theme with neon accents" },
        { icon: Globe, label: "Language", desc: "English, Urdu, Arabic, Spanish, French, German, Turkish" },
        { icon: Volume2, label: "Sound Effects", desc: "Button clicks, radar audio chimes" },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        { icon: Shield, label: "Privacy Center", desc: "Control who sees your location, precision, history" },
        { icon: Shield, label: "Two-Factor Auth", desc: "Extra security for your account" },
        { icon: Bell, label: "Notifications", desc: "Sharing updates, geofence alerts, reminders" },
      ],
    },
    {
      title: "Data & Account",
      icon: Save,
      items: [
        { icon: Save, label: "Data Management", desc: "Export or purge location telemetry data" },
        { icon: ChevronRight, label: "Delete Account", desc: "Permanently remove all data" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary pb-24 text-text-primary">
      <TopNav currentPage="settings" onNavigate={(p) => router.push(p === "settings" ? "/main/settings" : `/main/${p}`)} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl font-bold">System Settings</h1>
              <p className="text-xs text-text-muted mt-1">Configure maps, security, and telemetry preferences</p>
            </div>
          </div>

          {/* Google Maps API Key Card */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <Key className="w-3.5 h-3.5" /> Google Maps API Configuration
            </h3>
            <GlassCard className="p-5 border border-cyan-500/20 bg-bg-card/90">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                    Google Maps API Key
                  </label>
                  <input
                    type="password"
                    value={googleMapsKey}
                    onChange={(e) => setGoogleMapsKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-4 py-2.5 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 text-sm font-mono text-cyan-300 placeholder:text-text-muted"
                  />
                  <p className="text-[11px] text-text-muted mt-1.5">
                    Provide your Google Maps API Key to enable official Google Roads & Satellite tiles. You can also configure this in your environment as <code className="text-cyan-400">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setMapProvider("carto")}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      mapProvider === "carto"
                        ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300"
                        : "bg-white/5 border-white/10 text-text-muted hover:text-white"
                    }`}
                  >
                    <p className="text-xs font-bold">CartoDB Dark Matter</p>
                    <p className="text-[10px] opacity-80 mt-0.5">Neon Cyberpunk Vector Style</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMapProvider("google")}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      mapProvider === "google"
                        ? "bg-purple-500/10 border-purple-500/40 text-purple-300"
                        : "bg-white/5 border-white/10 text-text-muted hover:text-white"
                    }`}
                  >
                    <p className="text-xs font-bold">Google Maps Satellite</p>
                    <p className="text-[10px] opacity-80 mt-0.5">High-Res Satellite & Roads</p>
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Standard Settings Sections */}
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">{section.title}</h3>
                <GlassCard className="divide-y divide-white/5 !p-0">
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-bg-primary flex items-center justify-center border border-white/10">
                        <Icon className="w-5 h-5 text-text-muted" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-text-muted">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </GlassCard>
              </div>
            );
          })}

          <NeonButton variant="primary" size="lg" className="w-full cursor-pointer" onClick={handleSave}>
            {saved ? (
              <span className="flex items-center gap-2 text-green-300">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> Settings & API Key Saved
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Preferences
              </span>
            )}
          </NeonButton>
        </motion.div>
      </main>
    </div>
  );
}
