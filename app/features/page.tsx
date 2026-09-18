"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Users,
  MapPin,
  Zap,
  Clock,
  Lock,
  Eye,
  Battery,
  Radio,
  Star,
} from "lucide-react";

const FEATURES = [
  { icon: Shield, title: "Privacy First", desc: "End-to-end encrypted location sharing. Nobody sees your data but the people you choose.", color: "cyan" },
  { icon: Users, title: "Trust Circle", desc: "Share with the people you trust. Granular control over who sees what.", color: "purple" },
  { icon: MapPin, title: "Live Map", desc: "Real-time location on a beautiful dark map with neon markers and pulsing indicators.", color: "pink" },
  { icon: Zap, title: "Battery Smart", desc: "Three tracking modes — Battery Saver, Balanced, and Real-Time — to match your needs.", color: "green" },
  { icon: Lock, title: "Ghost Mode", desc: "Go invisible. Stop all sharing and hide your status from everyone instantly.", color: "purple" },
  { icon: Radio, title: "Emergency Share", desc: "One-tap sharing with emergency contacts. Confirm and your location goes live immediately.", color: "red" },
  { icon: Eye, title: "Precision Control", desc: "Choose exact or approximate location. Share precise coordinates only when you want to.", color: "cyan" },
  { icon: Clock, title: "Temporary Sessions", desc: "Share for 15 minutes, 1 hour, or until you stop. Sessions auto-expire for safety.", color: "yellow" },
  { icon: Battery, title: "Battery Display", desc: "See your contacts' battery levels so you know when to check in on them.", color: "green" },
  { icon: Star, title: "Safe Arrival", desc: "Set a destination and expected time. Trusted contacts get notified when you arrive safely.", color: "cyan" },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  cyan: { bg: "bg-cyan-500/5", text: "text-cyan-400", border: "border-cyan-500/20" },
  purple: { bg: "bg-purple-500/5", text: "text-purple-400", border: "border-purple-500/20" },
  pink: { bg: "bg-pink-500/5", text: "text-pink-400", border: "border-pink-500/20" },
  green: { bg: "bg-green-500/5", text: "text-green-400", border: "border-green-500/20" },
  red: { bg: "bg-red-500/5", text: "text-red-400", border: "border-red-500/20" },
  yellow: { bg: "bg-yellow-500/5", text: "text-yellow-400", border: "border-yellow-500/20" },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-bg-primary noise-bg">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Everything you need for <span className="text-cyan-400">secure location sharing</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            A complete toolkit for staying connected without compromising your privacy.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const c = colorMap[f.color];
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className={`p-6 rounded-2xl border ${c.border} bg-bg-card hover:bg-white/[0.03] transition-all`}>
                  <Icon className={`w-8 h-8 ${c.text} mb-4`} />
                  <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-text-secondary">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
