"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Search } from "lucide-react";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { Map, Users, Activity, User, Settings, Zap, Shield, Star, Compass } from "lucide-react";

interface TopNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: Compass },
  { key: "map", label: "Map", icon: Map },
  { key: "people", label: "People", icon: Users },
  { key: "activity", label: "Activity", icon: Activity },
  { key: "profile", label: "Profile", icon: User },
];

export function TopNav({ currentPage, onNavigate }: TopNavProps) {
  const palette = useCommandPalette();

  return (
    <nav className="glass-strong sticky top-0 z-50 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("map")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg hidden sm:inline">NEONTRACE</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={palette.open}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-text-muted text-sm hover:bg-white/10 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-white/10">⌘K</span>
          </button>
          <NeonButton size="sm" variant="secondary" onClick={() => onNavigate("share")}>
            <Shield className="w-4 h-4" /> Share
          </NeonButton>
        </div>
      </div>

      <div className="md:hidden flex items-center justify-center gap-2 mt-3 pb-1">
        <span className="text-xs text-text-muted">Press</span>
        <button onClick={palette.open} className="text-xs text-cyan-400 font-medium">
          ⌘K to search
        </button>
      </div>

      {palette.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh]">
          <div className="absolute inset-0 bg-black/60" onClick={palette.close} />
          <div className="relative w-full max-w-lg glass-strong rounded-2xl p-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-3">
              <Search className="w-5 h-5 text-text-muted" />
              <input
                ref={palette.inputRef}
                value={palette.query}
                onChange={(e) => palette.setQuery(e.target.value)}
                placeholder="Search NEONTRACE"
                className="flex-1 bg-transparent outline-none text-lg placeholder:text-text-muted"
              />
              <button onClick={palette.close} className="text-text-muted hover:text-text-primary">
                ✕
              </button>
            </div>
            <div className="text-sm text-text-muted px-2">
              {palette.query ? `Results for "${palette.query}"` : "Try: Home, Sarah, Office"}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
