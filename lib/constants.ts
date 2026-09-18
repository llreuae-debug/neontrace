export const APP_NAME = "NEONTRACE";
export const APP_TAGLINE = "Your people. Your places. Your world — live.";
export const APP_URL = "https://neontrace.app";

export const LOCATION_MODES = {
  BATTERY_SAVER: { label: "Battery Saver", interval: 10000, accuracy: "balanced" },
  BALANCED: { label: "Balanced", interval: 5000, accuracy: "balanced" },
  REAL_TIME: { label: "Real-Time", interval: 1000, accuracy: "high" },
} as const;

export const SHARE_DURATIONS = [
  { label: "15 minutes", seconds: 900 },
  { label: "30 minutes", seconds: 1800 },
  { label: "1 hour", seconds: 3600 },
  { label: "4 hours", seconds: 14400 },
  { label: "Until stopped", seconds: 0 },
] as const;

export const VANISH_DURATIONS = [
  { label: "15 MIN", seconds: 900 },
  { label: "30 MIN", seconds: 1800 },
  { label: "1 HR", seconds: 3600 },
  { label: "4 HR", seconds: 14400 },
] as const;

export const DEMO_USERS = [
  { id: "1", name: "Amina", lat: 40.7128, lng: -74.006, distance: 120, battery: 84, status: "live" },
  { id: "2", name: "Marcus", lat: 40.758, lng: -73.9855, distance: 340, battery: 67, status: "live" },
  { id: "3", name: "Sofia", lat: 40.7484, lng: -73.9857, distance: 890, battery: 45, status: "away" },
  { id: "4", name: "Kai", lat: 40.7614, lng: -73.9776, distance: 1200, battery: 92, status: "live" },
] as const;

export const DEMO_PLACES = [
  { id: "1", name: "Home", address: "123 Main St, New York", lat: 40.7128, lng: -74.006 },
  { id: "2", name: "Office", address: "456 Park Ave, New York", lat: 40.758 },
  { id: "3", name: "Cafe", address: "789 Broadway, New York", lat: 40.7484 },
] as const;

export const PRIVACY_SCORES = {
  max: 100,
  sharingOn: 25,
  trustedCircle: 20,
  approximateLocation: 20,
  historyEnabled: 15,
  autoExpiry: 20,
};
