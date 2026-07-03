---
name: Expo Go tunnel mode in Replit
description: Why --tunnel (ngrok) fails in Replit and what the stable alternative is
---

# Expo Go connection in Replit

## The stable setup (--localhost + Replit proxy)

```
EXPO_PACKAGER_PROXY_URL=https://$REPLIT_EXPO_DEV_DOMAIN \
EXPO_PUBLIC_DOMAIN=$REPLIT_DEV_DOMAIN \
EXPO_PUBLIC_REPL_ID=$REPL_ID \
REACT_NATIVE_PACKAGER_HOSTNAME=$REPLIT_EXPO_DEV_DOMAIN \
pnpm exec expo start --localhost --port $PORT
```

Key: `REACT_NATIVE_PACKAGER_HOSTNAME` must be `$REPLIT_EXPO_DEV_DOMAIN` (not `$REPLIT_DEV_DOMAIN`).

**Why:** `EXPO_PACKAGER_PROXY_URL` tells Expo what URL to advertise in QR codes. Replit proxies Metro through the expo-specific subdomain. The Replit proxy endpoint returns HTTP 200 and is publicly reachable.

**How to apply:** Always use this pattern for the Expo mobile artifact dev script. Do NOT switch to `--tunnel`.

## Do NOT use --tunnel (ngrok)

`expo start --tunnel` crashes in Replit with:
```
CommandError: TypeError: Cannot read properties of undefined (reading 'body')
Check the Ngrok status page for outages: https://status.ngrok.com/
```

Ngrok is unreliable/blocked in Replit's container environment. Even when it works briefly it fails on subsequent restarts.

## Expo Go "hostname not found" error

If the user sees "A server with the specified hostname could not be found" in Expo Go, it is a phone-side DNS/network issue, not a server issue. The Replit proxy IS publicly reachable (confirmed via curl returning HTTP 200). Advice:
- Try mobile data instead of WiFi
- Re-scan the QR from Replit's mobile preview button (not the terminal)
- The hostname advertised in the QR is `exp://REPLIT_EXPO_DEV_DOMAIN` — this resolves fine on most networks
