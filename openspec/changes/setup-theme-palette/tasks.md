# Tasks

## 1. Light-theme token mapping

- [x] 1.1 Rewrite `:root` tokens in `src/styles/global.css` to brand roles (primary `#da6c81`, background/secondary `#f5e9d0`, accent `#bf2b54`, foreground `#3e2723`, derived muted/border/ring/card/popover/sidebar/chart) and verify `bg-background`, `bg-primary`, `bg-secondary`, `text-foreground` render the approved hex values in the dev server.
- [x] 1.2 Verify cream-on-rose/crimson and brown-on-cream pairs for AA contrast (adjust `primary-foreground`/`accent-foreground` fallback if needed) and verify checks pass with a contrast tool report.

## 2. Dark-theme coherence

- [x] 2.1 Rewrite `.dark` tokens with the same brand hues (dark-brown background, cream foreground, rose primary, crimson accent) and verify toggling `.dark` never shows neutral gray surfaces.
- [x] 2.2 Verify sidebar and chart tokens track the brand in both themes and verify no gray remnants via visual pass over components using `ui/*` primitives.

## 3. Integration verification

- [x] 3.1 Run `astro build` and verify the build succeeds with the new tokens, fixing any Tailwind v4 token errors.
