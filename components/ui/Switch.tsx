"use client";

import { useState } from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function Switch({ checked, onChange, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`w-10 h-6 rounded-full transition-all duration-200 relative ${checked ? "bg-cyan-500" : "bg-white/10"} ${className || ""}`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${checked ? "translate-x-4" : "translate-x-0.5"}`}
      />
    </button>
  );
}
