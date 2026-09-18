# NEONTRACE — Project Documentation

## Overview
NEONTRACE is a production-ready, mobile-first real-time location tracking and sharing PWA with a futuristic Gen-Z aesthetic. It combines Google Maps utility, Life360-style trusted sharing, Snap-style visual identity, and cyberpunk 3D interface with privacy-first controls.

## Tech Stack
- **Frontend**: React 19 + TypeScript + Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion + CSS animations
- **Maps**: Leaflet.js (open-source, no API key required)
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## Project Structure
```
neontrace/
├── app/                      # Next.js App Router pages
│   ├── auth/                 # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── verify-email/
│   ├── main/                 # Main application pages
│   │   ├── dashboard/
│   │   ├── map/
│   │   ├── people/
│   │   ├── activity/
│   │   ├── profile/
│   │   ├── settings/
│   │   ├── privacy/
│   │   ├── share/
│   │   ├── journey/
│   │   ├── trust-circle/
│   │   ├── ghost-mode/
│   │   ├── safe-arrival/
│   │   ├── notifications/
│   │   └── emergency/
│   ├── admin/                # Admin dashboard
│   ├── features/             # Static pages
│   ├── privacy/
│   ├── security/
│   ├── how-it-works/
│   ├── download/
│   └── contact/
├── components/
│   ├── ui/                   # Basic UI components
│   ├── map/                  # Map-related components
│   ├── sections/             # Page sections
│   └── dashboard/            # Dashboard components
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities and constants
├── types/                    # TypeScript types
├── public/                   # Static assets
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service worker
│   └── icons/                # App icons (add PNGs)
└── middleware.ts             # Next.js middleware
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
cd neontrace
npm install
```

### Running Locally
```bash
npm run dev        # Development server on port 3000
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Environment Variables Required

Create a `.env.local` file:

```env
# Supabase (recommended backend)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Mapbox (optional, for enhanced map styles)
# NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token

# App Configuration
NEXT_PUBLIC_APP_URL=https://neontrace.app
NEXT_PUBLIC_APP_NAME=NEONTRACE
```

## Database Schema (Supabase/PostgreSQL)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  password_hash TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES users(id),
  phone TEXT,
  location_privacy TEXT DEFAULT 'private',
  battery_display BOOLEAN DEFAULT true,
  sound_effects BOOLEAN DEFAULT false,
  dark_mode BOOLEAN DEFAULT true,
  language TEXT DEFAULT 'en'
);

-- Trusted Contacts
CREATE TABLE trusted_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, contact_id)
);

-- Location Sessions
CREATE TABLE location_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT true,
  mode TEXT DEFAULT 'balanced',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Current Locations
CREATE TABLE current_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES location_sessions(id),
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  accuracy REAL,
  altitude REAL,
  heading REAL,
  speed REAL,
  timestamp BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Location History
CREATE TABLE location_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  accuracy REAL,
  timestamp BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved Places
CREATE TABLE saved_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  type TEXT DEFAULT 'custom',
  radius REAL DEFAULT 100
);

-- Geofences
CREATE TABLE geofences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  place_id UUID REFERENCES saved_places(id),
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  radius REAL NOT NULL DEFAULT 100,
  label TEXT,
  enabled BOOLEAN DEFAULT true
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Privacy Settings
CREATE TABLE privacy_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  location_sharing BOOLEAN DEFAULT true,
  share_with TEXT DEFAULT 'trusted',
  precision TEXT DEFAULT 'exact',
  location_history BOOLEAN DEFAULT false,
  auto_expiry BOOLEAN DEFAULT true,
  background_location BOOLEAN DEFAULT false,
  visibility TEXT DEFAULT 'live',
  sound_effects BOOLEAN DEFAULT false,
  UNIQUE(user_id)
);

-- Device Sessions
CREATE TABLE device_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_token TEXT,
  platform TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  metadata JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Supabase Configuration

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key to `.env.local`
3. Run the SQL schema above in the Supabase SQL Editor
4. Enable Email/Password authentication in Supabase Auth settings
5. Set up Row Level Security (RLS) on all tables
6. Configure Realtime subscriptions for `current_locations` table

### RLS Example
```sql
ALTER TABLE current_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own location" ON current_locations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Recipients can read shared location" ON current_locations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM trusted_contacts WHERE user_id = current_location.user_id AND contact_id = auth.uid())
  );
```

## Map Configuration

NEONTRACE uses Leaflet.js with CARTO dark map tiles by default. No API key required.

To use Mapbox GL JS instead (optional):
1. Get a Mapbox token at [mapbox.com](https://mapbox.com)
2. Set `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local`
3. Replace Leaflet with Mapbox in `MapView.tsx`

## PWA Configuration

- **Manifest**: `public/manifest.json` — configure icons, colors, display mode
- **Service Worker**: `public/sw.js` — caches static assets for offline use
- **Icons**: Add PNG icons (192px and 512px minimum) to `public/icons/`
- **Theme**: Dark mode by default with `#050508` background

## Production Deployment

### Vercel (Recommended)
```bash
# Connect your GitHub repo to Vercel
npm i -g vercel
vercel --prod
```

### Docker
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npx", "serve", "-s", "."]
```

### Self-hosted
```bash
npm run build
npm run start
# Server runs on port 3000
# Use nginx or similar as reverse proxy with HTTPS
```

## Security Checklist

- [ ] HTTPS enforced in production
- [ ] All API endpoints use authentication
- [ ] Location data encrypted at rest
- [ ] Row Level Security enabled on all database tables
- [ ] Rate limiting on location update endpoints
- [ ] Input validation on all user inputs
- [ ] CSRF protection enabled
- [ ] XSS prevention headers set
- [ ] Content Security Policy configured
- [ ] No location data exposed without authorization
- [ ] Session tokens expire appropriately
- [ ] Admin endpoints require admin authentication
- [ ] Audit logging enabled for sensitive actions
- [ ] Server-side permission checks on all shared data

## Known Browser Limitations for Background Location

- **Chrome**: Requires HTTPS and a service worker with `background-sync` permission. Geolocation stops when tab is closed.
- **Safari (iOS)**: Does not support background geolocation in web apps. Only works while app is in foreground or via PWA with limitations.
- **Firefox**: Supports limited background location in PWA mode.
- **Chrome (Android)**: Best support for background location via PWA with foreground service notification.

**Recommendation**: For true background location tracking, consider building a native app or using a PWA with a foreground service notification. Browser-based geolocation has inherent limitations.

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

## Accessibility
- Full keyboard navigation support
- ARIA labels on interactive elements
- Sufficient color contrast (WCAG AA)
- Respects `prefers-reduced-motion`
- Focus states on all interactive elements
- Information not conveyed by color alone

## RTL/Language Support
Prepared for: English, Urdu, Arabic, Spanish, French, German, Turkish
- Arabic and Urdu use RTL layout
- Language preference persisted in localStorage

## Known Limitations
- Background location tracking is limited by browser capabilities
- Geofencing requires browser support and is not universally available
- Sound effects are disabled by default on mobile (autoplay policy)
- Real-time location requires Supabase Realtime or WebSocket backend for multi-user
- Map rendering performance may vary on low-end devices
