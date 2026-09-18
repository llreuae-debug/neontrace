"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { formatTimeAgo, formatDistance } from "@/lib/utils";
import type { User } from "@/types";

export function useLiveUpdates(users: User[]) {
  const [updatedUsers, setUpdatedUsers] = useState<User[]>(() => users);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setUpdatedUsers((prev) =>
        prev.map((u) => ({
          ...u,
          distance: Math.max(50, (u.distance || 100) + Math.floor(Math.random() * 40 - 20)),
          battery: Math.max(1, (u.battery || 50) + Math.floor(Math.random() * 3 - 1)),
        }))
      );
      setLastUpdate(Date.now());
    }, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getTimeAgo = useCallback(
    (timestamp: number) => formatTimeAgo(Date.now() - timestamp),
    []
  );

  const getDistance = useCallback(
    (meters: number) => formatDistance(meters),
    []
  );

  return { updatedUsers, lastUpdate, getTimeAgo, getDistance };
}


