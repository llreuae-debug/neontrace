"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LOCATION_MODES } from "@/lib/constants";
import type { LocationData } from "@/types";

interface UseGeolocationOptions {
  mode?: keyof typeof LOCATION_MODES;
  enableHighAccuracy?: boolean;
  onLocationChange?: (location: LocationData) => void;
  onError?: (error: GeolocationPositionError) => void;
}

interface UseGeolocationReturn {
  location: LocationData | null;
  isLoading: boolean;
  error: GeolocationPositionError | null;
  isActive: boolean;
  start: () => void;
  stop: () => void;
}

export function useGeolocation(
  options: UseGeolocationOptions = {}
): UseGeolocationReturn {
  const { mode = "balanced", onLocationChange, onError } = options;
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
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
      onLocationChange?.(locData);
    },
    [onLocationChange]
  );

  const handleError = useCallback(
    (err: GeolocationPositionError) => {
      setError(err);
      onError?.(err);
    },
    [onError]
  );

  const start = useCallback(() => {
    if (!("geolocation" in navigator)) {
      const err = new GeolocationPositionError();
      (err as unknown as { code: number; message: string }).code = 2;
      (err as unknown as { code: number; message: string }).message = "Geolocation not available";
      setError(err);
      return;
    }

    setIsLoading(true);
    const config = getConfig();
    watchIdRef.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      config
    );
    setIsActive(true);
    setIsLoading(false);
  }, [getConfig, handleSuccess, handleError]);

  const stop = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsActive(false);
    lastPositionRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
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
