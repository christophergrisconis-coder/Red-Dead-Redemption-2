# RDR2 Interactive Guide

A premium mobile companion app for Red Dead Redemption 2 -- mission walkthroughs, completion checklists, an offline interactive world map, and progress tracking, styled with a cinematic western theme.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/mobile run dev` — run the Expo mobile app
- `pnpm --filter @workspace/rdr2-video run dev` — run the promo video artifact
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: Expo 54 + React Native 0.81 + expo-router
- API: Express 5 (backend with OpenAPI codegen)
- DB: PostgreSQL + Drizzle ORM
- Video: React + Vite + Framer Motion (promo clip)

## Where things live

| File | Purpose |
|---|---|
| `artifacts/mobile/data/rdr2Data.ts` | Source of truth -- all checklist categories, items, and sections |
| `artifacts/mobile/data/walkthroughs.ts` | Expanded mission walkthroughs (Ch. 1-6 + Epilogues) |
| `artifacts/mobile/constants/colors.ts` | Cinematic western palette tokens |
| `artifacts/mobile/app/(tabs)/map.tsx` | Offline interactive world map (real bundled RDR2 map image + town pins) |
| `artifacts/mobile/assets/images/rdr2-map.jpg` | Bundled official RDR2 atlas image (1000x753) used as the map base layer |
| `artifacts/mobile/components/WelcomeScene.tsx` | Native animated 3-scene intro |
| `artifacts/mobile/hooks/useColors.ts` | Theme hook (light palette, future dark mode ready) |

## Architecture decisions

- **Offline-first map**: Replaced external WebView map with a self-contained world map (pan, zoom, town pins, drawing) to satisfy App Store requirements and avoid network dependency. The base layer is a bundled official RDR2 atlas image (`rdr2-map.jpg`, 1000x753) rendered inside an SVG `viewBox="0 0 1000 753"`; town pins and drawing strokes are positioned in image/viewBox coordinates.
- **Contract-first API**: OpenAPI spec generates React Query hooks and Zod schemas via Orval.
- **Native animated intro**: `react-native-reanimated` drives a cinematic 15-second intro matching the promo video.
- **45 checklist categories** organized into 9 sections, covering missions, collectibles, challenges, hunting, treasure, activities, and hideouts -- cross-referenced against the official Piggyback guide.
- **Progress tracking** uses `AsyncStorage` with export/import backup codes.

## Product

The RDR2 Interactive Guide helps players achieve 100% game completion with:
- **Mission walkthroughs** with gold tips, honor notes, missables, and step-by-step guidance
- **Interactive completion checklist** with 9 sections and 45 categories
- **Offline world map** rendering the real RDR2 atlas image with zoom, pan, tappable town pins, and drawing tools
- **Progress stats** with backup/restore codes
- **Cinematic western UI** with parchment textures, gold accents, and atmospheric shadows

## User preferences

- App Store publication target (Apple Developer Program, $99/year)
- Cinematic western visual theme (no bright/neon colors)
- Offline-first functionality where possible
- Piggyback official guide used as primary reference for accuracy

## Gotchas

- `react-native-webview` was removed -- the map is now fully offline, rendering a bundled RDR2 atlas image as the SVG base layer.
- Town pins are eyeballed against the bundled map image in viewBox coords; nudge `MARKERS` coords if alignment looks off. Other marker layers (collectibles/hunting/treasure/graves/hideouts) were dropped because the old coords were for a fictional 800x1000 layout and accurate placement on the real map is unreliable.
- The map uses `Animated.Value` for pan/zoom; avoid setting values directly outside the event handlers.
- Expo Go web preview sometimes fails with Metro bundler issues -- restart the workflow if the bundle stalls.
- `pnpm run typecheck` passes clean from CLI; editor/LSP may lag behind.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
