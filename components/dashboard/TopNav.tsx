"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { NeonButton } from "@/components/ui/NeonButton";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { Map, Users, Activity, User, Search, Zap, Shield, Compass } from "lucide-react";

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
  const { isOpen, query, setQuery, open, close } = useCommandPalette();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  return (
    <nav className="glass-strong sticky top-0 z-50 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("map")} className="flex items-center gap-2 cursor-pointer">
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
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
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
            onClick={open}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-text-muted text-sm hover:bg-white/10 transition-colors cursor-pointer"
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
        <button onClick={open} className="text-xs text-cyan-400 font-medium cursor-pointer">
          ⌘K to search
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh] px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <div className="relative w-full max-w-lg glass-strong rounded-2xl p-4 border border-white/15 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-3">
              <Search className="w-5 h-5 text-text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search NEONTRACE..."
                className="flex-1 bg-transparent outline-none text-base text-text-primary placeholder:text-text-muted"
              />
              <button onClick={close} className="text-text-muted hover:text-text-primary px-1.5 py-0.5 rounded hover:bg-white/10 text-sm">
                ✕
              </button>
            </div>
            <div className="text-sm text-text-muted px-2">
              {query ? `Results for "${query}"` : "Try searching: Home, Sarah, Office, Battery Saver"}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

