# Proposal

## Why

The app currently ships shadcn default neutral tokens (oklch grays) in `src/styles/global.css`, with no brand identity. Defining the approved palette (rose primary, cream background, crimson tertiary, brown text) establishes the visual foundation all UI work builds on.

## What Changes

- Define brand palette roles in `src/styles/global.css`: primary `#da6c81`, background/secondary `#f5e9d0`, tertiary `#bf2b54`, text `#3e2723`.
- Map palette roles onto existing shadcn/Tailwind v4 token surface (`--primary`, `--secondary`, `--background`, `--foreground`, plus derived `--primary-foreground`, `--accent`, `--muted`, `--border`, `--ring`, `--card`) so `bg-primary`, `bg-secondary`, `bg-background`, `text-foreground` utilities resolve to brand colors.
- Keep `.dark` variant coherent with the same brand hues (no separate palette requested).
- No component, layout, or API changes.

## Capabilities

### New Capabilities

- `theme-palette`: brand color roles and token mappings for light/dark themes in global.css.

### Modified Capabilities

None — no existing specs (greenfield spec inventory).

## Impact

- Affected: `src/styles/global.css` only (Tailwind v4 `@theme inline` + `:root`/`.dark` tokens).
- All components using `bg-background`, `text-foreground`, `bg-primary`, `bg-secondary`, shadcn `ui/*` primitives pick up new colors automatically.
- Risk: low; visual change only. Contrast of rose-on-cream and cream-on-crimson must be verified.
