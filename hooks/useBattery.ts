"use client";

import { useState, useEffect, useRef } from "react";

export function useBattery() {
  const [level, setLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState<boolean | null>(null);
  const [chargingTime, setChargingTime] = useState<number | null>(null);
  const [dischargingTime, setDischargingTime] = useState<number | null>(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if ("getBattery" in navigator) {
      (navigator as unknown as { getBattery: () => Promise<{ level: number; charging: boolean; chargingTime: number | null; dischargingTime: number | null }> }).getBattery()
        .then((battery) => {
          setAvailable(true);
          setLevel(battery.level * 100);
          setCharging(battery.charging);
          setChargingTime(battery.chargingTime);
          setDischargingTime(battery.dischargingTime);

          battery.level !== undefined && typeof battery.level === "number" && setLevel(battery.level * 100);
          if ("chargingchange" in battery) {
            (battery as unknown as { addEventListener: (s: string, f: () => void) => void }).addEventListener?.("chargingchange", () => setCharging(battery.charging));
          }
        })
        .catch(() => setAvailable(false));
    }
  }, []);

  return { level, charging, chargingTime, dischargingTime, available };
}
