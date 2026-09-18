"use client";

import { useState, useEffect } from "react";

export function useBattery() {
  const [level, setLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState<boolean | null>(null);
  const [chargingTime, setChargingTime] = useState<number | null>(null);
  const [dischargingTime, setDischargingTime] = useState<number | null>(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "getBattery" in navigator) {
      (navigator as unknown as { getBattery: () => Promise<{ level: number; charging: boolean; chargingTime: number | null; dischargingTime: number | null; addEventListener?: (s: string, f: () => void) => void }> }).getBattery()
        .then((battery) => {
          setAvailable(true);
          if (typeof battery.level === "number") {
            setLevel(battery.level * 100);
          }
          setCharging(battery.charging);
          setChargingTime(battery.chargingTime);
          setDischargingTime(battery.dischargingTime);

          if (battery.addEventListener) {
            battery.addEventListener("chargingchange", () => setCharging(battery.charging));
            battery.addEventListener("levelchange", () => {
              if (typeof battery.level === "number") setLevel(battery.level * 100);
            });
          }
        })
        .catch(() => setAvailable(false));
    }
  }, []);

  return { level, charging, chargingTime, dischargingTime, available };
}

