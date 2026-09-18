"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { TopNav } from "@/components/dashboard/TopNav";
import { MapPin, Mail, Phone, Edit3, LogOut, ChevronRight, Settings, Shield, Bell, Moon } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  const user = {
    name: "Alex Chen",
    username: "@alexchen",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    avatar: undefined,
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="profile" onNavigate={(p) => router.push(p === "profile" ? "/main/profile" : `/main/${p}`)} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-white">AC</span>
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-bg-card border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">{user.name}</h1>
              <p className="text-text-muted">{user.username}</p>
            </div>
          </div>

          <GlassCard className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
              <Mail className="w-5 h-5 text-cyan-400" />
              <div className="flex-1">
                <p className="text-sm text-text-muted">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
              <Phone className="w-5 h-5 text-green-400" />
              <div className="flex-1">
                <p className="text-sm text-text-muted">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
              <MapPin className="w-5 h-5 text-purple-400" />
              <div className="flex-1">
                <p className="text-sm text-text-muted">Location</p>
                <p className="font-medium">Private</p>
              </div>
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <GlassCard className="flex items-center gap-3 cursor-pointer hover:border-white/15" onClick={() => router.push("/main/settings")}>
              <Settings className="w-5 h-5 text-text-muted" />
              <span className="font-medium">Settings</span>
              <ChevronRight className="w-4 h-4 text-text-muted ml-auto" />
            </GlassCard>
            <GlassCard className="flex items-center gap-3 cursor-pointer hover:border-white/15" onClick={() => router.push("/main/privacy")}>
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="font-medium">Privacy</span>
              <ChevronRight className="w-4 h-4 text-text-muted ml-auto" />
            </GlassCard>
            <GlassCard className="flex items-center gap-3 cursor-pointer hover:border-white/15" onClick={() => router.push("/main/notifications")}>
              <Bell className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Notifications</span>
              <ChevronRight className="w-4 h-4 text-text-muted ml-auto" />
            </GlassCard>
            <GlassCard className="flex items-center gap-3 cursor-pointer hover:border-white/15">
              <Moon className="w-5 h-5 text-purple-400" />
              <span className="font-medium">Appearance</span>
              <ChevronRight className="w-4 h-4 text-text-muted ml-auto" />
            </GlassCard>
          </div>

          <GlassCard className="mt-6">
            <NeonButton variant="danger" className="w-full" onClick={() => router.push("/auth/login")}>
              <LogOut className="w-4 h-4" /> Sign Out
            </NeonButton>
          </GlassCard>
        </motion.div>
      </main>
    </div>
  );
}
