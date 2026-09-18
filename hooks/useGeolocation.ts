"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LOCATION_MODES } from "@/lib/constants";
import type { LocationData } from "@/types";

export interface GeolocationCustomError {
  code: number;
  message: string;
}

interface UseGeolocationOptions {
  mode?: keyof typeof LOCATION_MODES;
  enableHighAccuracy?: boolean;
  onLocationChange?: (location: LocationData) => void;
  onError?: (error: GeolocationCustomError) => void;
}

interface UseGeolocationReturn {
  location: LocationData | null;
  isLoading: boolean;
  error: GeolocationCustomError | null;
  isActive: boolean;
  start: () => void;
  stop: () => void;
}

export function useGeolocation(
  options: UseGeolocationOptions = {}
): UseGeolocationReturn {
  const { mode = "BALANCED", onLocationChange, onError } = options;
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<GeolocationCustomError | null>(null);
  const [isActive, setIsActive] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  const lastPositionRef = useRef<{ lat: number; lng: number } | null>(null);

  const getConfig = useCallback(() => {
    const configs: Record<string, { enableHighAccuracy: boolean; maximumAge: number; timeout: number }> = {
      BATTERY_SAVER: { enableHighAccuracy: false, maximumAge: 10000, timeout: 15000 },
      BALANCED: { enableHighAccuracy: false, maximumAge: 5000, timeout: 10000 },
      REAL_TIME: { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
    };
    return configs[mode] || configs.BALANCED;
  }, [mode]);

  const handleSuccess = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy, altitude, heading, speed } = position.coords;
      const newPos = { lat: latitude, lng: longitude };

      if (
        lastPositionRef.current &&
        Math.abs(latitude - lastPositionRef.current.lat) < 0.00001 &&
        Math.abs(longitude - lastPositionRef.current.lng) < 0.00001
      ) {
        return;
      }

      lastPositionRef.current = newPos;
      const locData: LocationData = {
        lat: latitude,
        lng: longitude,
        accuracy,
        altitude: altitude ?? undefined,
        heading: heading ?? undefined,
        speed: speed ?? undefined,
        timestamp: position.timestamp,
      };
      setLocation(locData);
      setError(null);
      onLocationChange?.(locData);
    },
    [onLocationChange]
  );

  const handleError = useCallback(
    (err: GeolocationPositionError) => {
      const customErr: GeolocationCustomError = {
        code: err.code,
        message: err.message || "Location access denied or unavailable",
      };
      setError(customErr);
      onError?.(customErr);
    },
    [onError]
  );

  const start = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      const err: GeolocationCustomError = {
        code: 2,
        message: "Geolocation is not supported by your browser",
      };
      setError(err);
      onError?.(err);
      return;
    }

    setIsLoading(true);
    const config = getConfig();
    try {
      watchIdRef.current = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        config
      );
      setIsActive(true);
    } catch {
      setError({ code: 0, message: "Failed to start location tracking" });
    } finally {
      setIsLoading(false);
    }
  }, [getConfig, handleSuccess, handleError, onError]);

  const stop = useCallback(() => {
    if (watchIdRef.current !== null && typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsActive(false);
    lastPositionRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null && typeof window !== "undefined" && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    location,
    isLoading,
    error,
    isActive,
    start,
    stop,
  };
}

