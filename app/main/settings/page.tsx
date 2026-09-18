"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [, setSaved] = useState(false);

  const sections = [
    {
      title: "Appearance",
      icon: Moon,
      items: [
        { icon: Moon, label: "Dark Mode (NEON Dark)", desc: "Default dark theme with neon accents" },
        { icon: Globe, label: "Language", desc: "English, Urdu, Arabic, Spanish, French, German, Turkish" },
        { icon: Volume2, label: "Sound Effects", desc: "Button clicks, notifications (disabled on mobile by default)" },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        { icon: Shield, label: "Privacy Center", desc: "Control who sees your location, precision, history" },
        { icon: Shield, label: "Two-Factor Auth", desc: "Extra security for your account" },
        { icon: Bell, label: "Notifications", desc: "Sharing updates, alerts, reminders" },
      ],
    },
    {
      title: "Data & Account",
      icon: Save,
      items: [
        { icon: Save, label: "Data Management", desc: "Export, delete location data" },
        { icon: ChevronRight, label: "Delete Account", desc: "Permanently remove all data" },
        { icon: ChevronRight, label: "Logout", desc: "Sign out of all devices" },
      ],
    },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="settings" onNavigate={(p) => router.push(p === "settings" ? "/main/settings" : `/main/${p}`)} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold mb-8">Settings</h1>

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
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs text-text-muted">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </GlassCard>
              </div>
            );
          })}

          <NeonButton variant="secondary" className="w-full" onClick={handleSave}>
            <Save className="w-4 h-4" /> Save Changes
          </NeonButton>
        </motion.div>
      </main>
    </div>
  );
}
