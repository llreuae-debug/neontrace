"use client";

import { useState, useEffect } from "react";

export function useConnectionStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof window !== "undefined" ? navigator.onLine : true
  );
  const [effectiveType, setEffectiveType] = useState<string>("4g");

  useEffect(() => {
    const updateOnline = () => setIsOnline(navigator.onLine);
    const updateConnection = () => {
      const conn = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
      if (conn?.effectiveType) setEffectiveType(conn.effectiveType);
    };

    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    const conn = (navigator as unknown as { connection?: { addEventListener: (s: string, f: () => void) => void } }).connection;
    conn?.addEventListener?.("change", updateConnection);

    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  const status: "live" | "connecting" | "offline" = isOnline ? "live" : "offline";

  return { isOnline, effectiveType, status };
}

