---
name: Mobile screenshot verification gate
description: Why screenshots of inner mobile screens show the intro, and how to verify them
---

# Verifying inner mobile screens via screenshot

The RDR2 mobile app renders a full-screen `WelcomeScene` intro overlay from the
root layout on every load. It is gated by an **in-memory** flag (not persisted),
so it re-shows on every web-preview reload, and it dismisses only on a tap
(full-screen `Pressable`) — it does **not** auto-dismiss.

**Consequence:** the `screenshot` tool cannot tap, so any screenshot of an inner
route (e.g. `/map`) just captures the intro, no matter how long you wait.

**How to apply:** to visually verify an inner screen, temporarily force the intro
off in `app/_layout.tsx` (set the welcome flag to `false`), restart the expo
workflow, screenshot, then **revert** the change and restart again. Always revert
— the flag must stay `true` in committed code.
