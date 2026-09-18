"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { Users, Activity, Bell, FileText, Settings, LogOut } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();

  const sections = [
    { title: "User Management", icon: Users, desc: "Manage user accounts, roles, and permissions" },
    { title: "Content", icon: FileText, desc: "Manage blog posts, pages, and media" },
    { title: "Analytics", icon: Activity, desc: "View user engagement and activity metrics" },
    { title: "Notifications", icon: Bell, desc: "Configure notification templates and delivery" },
    { title: "System Settings", icon: Settings, desc: "Configure application-wide settings" },
  ];

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="admin" onNavigate={(p) => router.push(p === "admin" ? "/admin" : p)} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-text-muted">Manage your NEONTRACE instance</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-400" />
            </div>
          </div>

          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <GlassCard key={section.title} className="flex items-center gap-4 cursor-pointer hover:border-white/15">
                  <div className="w-12 h-12 rounded-xl bg-bg-primary flex items-center justify-center border border-white/10">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold">{section.title}</h3>
                    <p className="text-xs text-text-muted">{section.desc}</p>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <GlassCard className="mt-6 border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-red-400">Danger Zone</h3>
                <p className="text-xs text-text-muted">Delete all data and reset the instance</p>
              </div>
              <button className="px-4 py-2 text-xs font-medium rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors">
                Reset
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </main>
    </div>
  );
}
