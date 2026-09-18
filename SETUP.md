# NEONTRACE Setup Guide

## Quick Start

\`\`\`bash
# Clone and install
cd neontrace
npm install

# Copy environment
cp .env.example .env.local

# Run dev server
npm run dev
\`\`\`

## Required Environment Variables

\`\`\`env
# Supabase backend (required for multi-user features)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## Database Setup

1. Create Supabase project
2. Run SQL schema from DOCS.md
3. Configure Supabase Auth (Email/Password)
4. Enable Realtime on \`current_locations\`

## Feature Toggles

| Feature | Backend Required | Notes |
|---------|-----------------|-------|
| Live tracking | No (demo mode) | Full requires Supabase |
| Multi-user map | Yes | Supabase + Realtime |
| Sharing sessions | Yes | Supabase |
| Auth | Optional | Demo mode works without |
| PWA install | No | Add icons for full support |

## Common Issues

**Map not loading**: CORS issue? Ensure you're serving over HTTP/HTTPS, not file://

**Location permission denied**: Chrome requires HTTPS for Geolocation API

**Build fails**: Clear .next folder and retry \`npm run build\`

**No TypeScript errors but runtime issues**: Check \`node_modules/.cache\` and rebuild
