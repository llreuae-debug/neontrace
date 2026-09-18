import { LOCATION_MODES } from "@/lib/constants";

export interface User {
  id: string;
  name: string;
  username?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  lat?: number;
  lng?: number;
  distance?: number;
  battery?: number;
  status: "live" | "away" | "offline" | "ghost";
  isTrusted?: boolean;
  isBlocked?: boolean;
  lastUpdated?: number;
  speed?: number;
  heading?: number;
}

export interface LocationData {
  lat: number;
  lng: number;
  accuracy: number;
  altitude?: number;
  heading?: number;
  speed?: number;
  timestamp: number;
}

export interface LocationSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: number;
  createdAt: number;
  mode: "battery-saver" | "balanced" | "real-time";
  recipients: string[];
  isActive: boolean;
}

export interface SharingSession {
  id: string;
  token: string;
  userId: string;
  expiresAt: number;
  createdAt: number;
  isActive: boolean;
  mode: "permanent" | "temporary";
  duration?: number;
  recipients?: string[];
}

export interface TrustContact {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  status: "live" | "away" | "offline" | "ghost";
  distance?: number;
  battery?: number;
  lastUpdated?: number;
  isBlocked: boolean;
  isSharedWith: boolean;
}

export interface SavedPlace {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: "home" | "work" | "school" | "custom";
  radius?: number;
}

export interface Geofence {
  id: string;
  placeId: string;
  lat: number;
  lng: number;
  radius: number;
  label: string;
  enabled: boolean;
}

export interface ActivityItem {
  id: string;
  type: "sharing_started" | "sharing_stopped" | "sharing_expired" | "location_viewed" | "arrived" | "ghost_mode" | "session_created" | "session_ended";
  description: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface NotificationData {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  body?: string;
  timestamp: number;
  read: boolean;
}

export interface PrivacySettings {
  locationSharing: boolean;
  shareWith: "everyone" | "selected" | "nobody";
  precision: "exact" | "approximate";
  locationHistory: boolean;
  autoExpiry: boolean;
  backgroundLocation: boolean;
  visibility: "invisible" | "approximate" | "exact";
  soundEffects: boolean;
  batteryDisplay: boolean;
}

export interface SafeArrivalData {
  id: string;
  destination: string;
  destinationLat: number;
  destinationLng: number;
  expectedArrival: number;
  trustedContact: string;
  radius: number;
  isActive: boolean;
  hasArrived: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isSelected: boolean;
}

export type DemoUser = {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
  distance?: number;
  battery?: number;
  status: "live" | "away" | "offline" | "ghost";
};

export type LocationMode = keyof typeof LOCATION_MODES;