# Proposal

## Why

The `/login` route exists but renders an empty page (`src/pages/login.astro` is blank), so the app has no entry point for users to identify themselves. A UI-only login form unblocks visual review and later auth wiring without committing to any backend yet.

## What Changes

- Build the login page UI in `src/pages/login.astro`: illustration image on top, username text input (`placeholder: "type your user name"`), password input (`placeholder: "type your password"`), and a `Login` button — stacked in a single column flex layout, built with the 8bitcn pixel-art components (`Card`, `Input`, `Button` from `src/components/ui/8bit/`) rendered statically from Astro.
- Illustration loads from a placeholder image service (user-confirmed choice) with descriptive `alt` text.
- Page uses the brand theme tokens (cream background, brown text, rose primary button); UI-only, so the button submits nothing and no auth/session/API code is added.

## Capabilities

### New Capabilities

- `login-page`: visual structure and elements of the login page (illustration, username/password inputs, login button, column layout).

### Modified Capabilities

None — `theme-palette` requirements are unchanged; the page only consumes existing tokens.

## Impact

- Affected: `src/pages/login.astro` (currently empty; no existing content to preserve), consuming (not modifying) `src/components/ui/8bit/` (`Card`, `Input`, `Button`).
- No changes to components, styles, APIs, auth, or routing.
- New runtime dependency on a placeholder image service (illustration hotlink; requires internet to render the picture).
