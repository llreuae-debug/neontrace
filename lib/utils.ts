import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: Date | number | string): string {
  const now = new Date();
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

export function generateId(length = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function formatSpeed(speedMs: number | null): string {
  if (!speedMs) return "—";
  return `${(speedMs * 3.6).toFixed(1)} km/h`;
}

export function formatHeading(degrees: number | null): string {
  if (!degrees && degrees !== 0) return "—";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(((degrees % 360) / 45)) % 8;
  return directions[index];
}
