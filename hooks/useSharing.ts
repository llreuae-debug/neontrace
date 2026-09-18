"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { generateId } from "@/lib/utils";
import type { SharingSession } from "@/types";

interface UseSharingReturn {
  session: SharingSession | null;
  isSharing: boolean;
  isCreating: boolean;
  createSession: (options: { duration?: number; mode?: string; recipients?: string[] }) => Promise<SharingSession>;
  endSession: () => void;
  remainingTime: number;
}

export function useSharing(onShare?: (session: SharingSession) => void): UseSharingReturn {
  const [session, setSession] = useState<SharingSession | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const endSessionInternal = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setSession((prev) => (prev ? { ...prev, isActive: false } : null));
    setIsSharing(false);
    setRemainingTime(0);
  }, []);

  const createSession = useCallback(
    async (options: { duration?: number; mode?: string; recipients?: string[] }) => {
      setIsCreating(true);
      await new Promise((r) => setTimeout(r, 500));

      const newSession: SharingSession = {
        id: generateId(),
        token: generateId(12),
        userId: "demo-user",
        expiresAt: options.duration ? Date.now() + options.duration * 1000 : Date.now() + 3600000,
        createdAt: Date.now(),
        isActive: true,
        mode: (options.mode as SharingSession["mode"]) || "temporary",
        duration: options.duration,
      };

      setSession(newSession);
      setIsSharing(true);
      if (onShare) onShare(newSession);

      if (options.duration && options.duration > 0) {
        setRemainingTime(options.duration);
        intervalRef.current = setInterval(() => {
          setRemainingTime((prev) => {
            if (prev <= 1) {
              endSessionInternal();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      setIsCreating(false);
      return newSession;
    },
    [onShare, endSessionInternal]
  );

  const endSession = useCallback(() => {
    endSessionInternal();
  }, [endSessionInternal]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { session, isSharing, isCreating, createSession, endSession, remainingTime };
}

