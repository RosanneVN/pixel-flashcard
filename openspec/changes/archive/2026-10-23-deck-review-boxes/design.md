## Context

See proposal.md (Why) for motivation and specs/deck-page/spec.md for the behavior contract. Current state: `src/pages/app/deck.astro` is an empty file (its previous UI now lives in `src/pages/app/dashboard.astro` with `DeckCard` + `mockDecks` from `src/types/types.ts`, both untouched by this change); `src/mocks/` exists but is empty. Established patterns: Astro pages use `Layout.astro` + `src/components/ui/8bit/*` pixel-art wrappers; 8bit `Badge`/`Card` accept `bg-*`/`border-*`/`text-*` class overrides via `className`; icons via `lucide-react`; path alias `@` maps to `./src`.

## Goals / Non-Goals

**Goals:**

- Render the static Boxes overview (title, 2-column box grid, review button) from `src/mocks/` data in the 8bitcn pixel-art language.
- Establish a box type + mock contract that a future review session can consume.

**Non-Goals:**

- No review-session behavior, scheduling logic, deck CRUD, routing, data fetching, or persistence.
- No changes to dashboard, `DeckCard`, `src/types/types.ts`, or shared UI primitives.
- No new design tokens; box colors reuse Tailwind palette classes.

## Decisions

### 1. Static Astro page, no React island

`deck.astro` renders title, grid, and button server-side from the mock import with no `client:*` directives: nothing on this page needs client state (no popover, no menu). Keeps the page free of hydration cost and sidesteps the proven compound-component island constraint entirely.

- Alternative considered: `ReviewBox` React island per box — rejected; no interactivity justifies hydration JS in a UI-only change.

### 2. Box types + mocks in `src/mocks/`

Define `ReviewBox { id, intervalLabel, icon, color, totalCards }` with `icon` as a constrained lucide-name union mapped inside the page (same pattern as `DeckCard`'s icon map) and `export const mockReviewBoxes` with the 5 interval entries, in a new file under `src/mocks/` (e.g. `review-boxes.ts`), outside the page component as requested. Single source, throwaway when the backend arrives.

- Alternative considered: extending `src/types/types.ts` — rejected; user explicitly wants mocks outside the main component, and it keeps the review-box domain separate from the deck domain.

### 3. 8bitcn Card + Badge with Tailwind color overrides

Each box uses 8bit `Card`/`CardContent` with the interval as title, lucide icon, total count, and an 8bit `Badge` for the interval label; per-box color (purple, red, yellow, green, blue in interval order) via `bg-*` classes passed through `className`, which 8bit `Badge`/`Card` forward to their visual layers (verified in their sources). The `review 50 cards` action uses the 8bit `Button` as a `type="button"` placeholder with no handler.

- Alternative considered: custom colored divs — rejected; loses the pixel-art borders and diverges from the login/dashboard language.

## Risks / Trade-offs

- [Risk] 8bit Card pixel-border wrapper clips colored backgrounds at edges → Mitigation: color accents via Badge + icon container first, card body stays `bg-card`; visual check with `astro build` + page view.
- [Risk] Grid orphan (5th box alone in row 3) looks unbalanced → Mitigation: accepted per 2-column request; last box spans one cell, order preserved; revisit only if user asks.
- [Trade-off] Fixed `review 50 cards` label is not derived from mock totals — accepted; label is a static placeholder until review logic exists.

## Migration Plan

No migration. Additive page content + new files under `src/mocks/`. Rollback = revert `deck.astro` to empty and delete the new mock file(s). Verify with `astro build` (and `astro check` for the new types).

## Open Questions

- None blocking. Exact per-box icons and which Tailwind shade per color resolved during implementation within spec bounds.
