# Design

## Context

`src/styles/global.css` is Tailwind v4 + shadcn: `@theme inline` maps `--color-*` to runtime `--*` vars; `:root`/`.dark` hold oklch neutral defaults. Only file in scope. See proposal.md Why. Current tokens use hex-equivalent grays; target roles are hex (`#da6c81`, `#f5e9d0`, `#bf2b54`, `#3e2723`).

## Goals / Non-Goals

**Goals:**

- Map the four brand hex roles onto the shadcn token surface with minimal edits.
- Keep light and dark themes coherent; preserve `@theme inline`, radius, font, and base layer wiring.
- Guarantee readable foreground pairs (cream-on-rose/crimson, brown-on-cream).

**Non-Goals:**

- New components, layout, or per-component color overrides.
- Full shade scales (50–900) per role; derived muted/border/ring tones only.
- Dark-mode redesign beyond hue-consistent adjustments.

## Decisions

- **Hex tokens in `:root`/`.dark`, keep oklch elsewhere only if untouched.** Rationale: request specifies hex; Tailwind v4 accepts any CSS color. Alternative (convert to oklch) rejected — adds conversion noise, harder to review against approved hex.
  - Mapping: `--primary: #da6c81`; `--background/--secondary: #f5e9d0` family; `--accent: #bf2b54`; `--foreground: #3e2723`; `--primary-foreground: #f5e9d0` (cream on rose); `--accent-foreground: #f5e9d0`; `--secondary-foreground: #3e2723`; `--muted: color-mix(cream, white)`-style derived; `--border/--input`: brown-tinted neutral from `#3e2723` at low alpha; `--ring: #da6c81`; `--card/--popover: #f5e9d0` with `--card-foreground/--popover-foreground: #3e2723`; `--destructive: #bf2b54`.
- **Dark theme = same hues, inverted luminance.** Rationale: no separate dark palette requested; keeps brand. `--background: #3e2723`-derived dark brown; `--foreground: #f5e9d0`; `--primary: #da6c81` (holds on dark); `--accent: #bf2b54` brightened only if contrast fails; card/popover track background.
- **No `@theme` hue additions (e.g. `--color-tertiary`).** Rationale: tertiary maps to existing `--accent`/`--destructive` roles so shadcn primitives pick it up with zero component edits. Alternative (custom `--color-tertiary` token) rejected — requires touching every consumer.
- **Sidebar/chart tokens follow suit minimally.** Sidebar primary → `#da6c81`, sidebar background → cream/brown per theme; chart-1 → tertiary, chart-2 → primary, rest brown-scale. Rationale: avoids stray gray surfaces.

## Risks / Trade-offs

- [Risk] Cream `#f5e9d0` as `--secondary` and `--background` flattens hierarchy → Mitigation: differentiate card vs background via brown-tinted border (`#3e2723` at ~12%) and subtle shadow, not gray.
- [Risk] Cream text on rose `#da6c81` may miss AA for small text → Mitigation: verify contrast; fall back to `#3e2723` or darkened rose for `primary-foreground` if it fails.
- [Risk] Hex breaks oklch-only tooling assumptions → Mitigation: none needed; Tailwind v4 + modern browsers handle mixed color spaces; verify with `astro build`.
