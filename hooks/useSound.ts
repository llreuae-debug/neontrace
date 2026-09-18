"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useSound() {
  const [enabled, setEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback(
    (type: "click" | "activate" | "share" | "expire" | "arrive" | "alert") => {
      if (!enabled) return;
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const sounds = {
          click: { freq: 600, duration: 0.08, type: "sine" as const },
          activate: { freq: 880, duration: 0.2, type: "sine" as const },
          share: { freq: 523, duration: 0.3, type: "triangle" as const },
          expire: { freq: 330, duration: 0.4, type: "sawtooth" as const },
          arrive: { freq: 659, duration: 0.5, type: "sine" as const },
          alert: { freq: 440, duration: 0.15, type: "square" as const },
        };

        const s = sounds[type];
        osc.type = s.type;
        osc.frequency.setValueAtTime(s.freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + s.duration);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + s.duration);
      } catch {
        // Silently fail
      }
    },
    [enabled, getAudioContext]
  );

  const initSound = useCallback(() => {
    setEnabled(true);
    getAudioContext();
  }, [getAudioContext]);

  return { enabled, setEnabled, playSound, initSound };
}
