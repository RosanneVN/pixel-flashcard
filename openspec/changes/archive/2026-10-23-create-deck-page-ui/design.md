## Context

See proposal.md (Why) for motivation and specs/deck-page/spec.md for behavior contract. Current state: `src/pages/app/deck.astro` and `src/types/types.ts` are empty files; `src/components/decks/` is an empty directory. Established patterns: Astro pages use `Layout.astro` + `src/components/ui/8bit/*` pixel-art wrappers (see `src/pages/login.astro`); path alias `@` maps to `./src`; Base-UI primitives under `src/components/ui/*` with 8-bit wrappers under `src/components/ui/8bit/*`; icons via `lucide-react`.

## Goals / Non-Goals

**Goals:**

- Deliver static, UI-only Deck page matching the three-block layout with mock-driven list.
- Establish reusable `DeckCard` island and typed deck model usable by future study/manage flows.
- Stay consistent with login page pixel-art visual language.

**Non-Goals:**

- No study-session behavior, deck CRUD, routing, data fetching, or persistence.
- No auth gating, responsive redesign beyond Tailwind stacking, or new design system tokens.
- No backend/API or `src/pages/api` work.

## Decisions

### 1. Astro page owns layout; React island owns interactivity

`deck.astro` renders static shell (Layout, avatar header, action buttons, list container) and maps mock data to `<DeckCard client:load deck={...} />`. `DeckCard` is React (`src/components/decks/DeckCard.tsx`) because only the 3-dots popover needs client state; everything else stays server-rendered Astro.

- Alternative considered: pure-Astro card with inline script for popover — rejected because Base-UI `Popover` React primitive already exists and keeps behavior consistent without custom JS.

### 2. Follow 8-bit wrapper convention

Use `src/components/ui/8bit/card`, `button`, and pixel `avatar` wrappers so the Deck page inherits the pixel-art theme proven on login. The header avatar uses the 8bitcn pixel `Avatar` (`Avatar`, `AvatarImage`, `AvatarFallback` from `src/components/ui/8bit/avatar.tsx`, `variant="pixel"` default) composed inside the `UserAvatar` island (`src/components/decks/UserAvatar.tsx`, `client:load`). Compound avatar parts MUST live in that single island file: Astro renders each framework tag in `.astro` as an isolated tree, so nesting `AvatarImage`/`AvatarFallback` across `deck.astro` tags breaks provider context (proven by `AvatarRootContext is missing` / `must be used within Avatar` SSR crashes during implementation). `DeckCard` popover uses Base-UI `src/components/ui/popover` because `8bit/popover.tsx` is broken (missing `@radix-ui/react-popover` module, nonexistent `PopoverAnchor` export). Plain `div` + Tailwind progress bar for the progress fill (no new progress dependency).

- Alternative considered: Base-UI `src/components/ui/avatar` in the island (plain round avatar, verified working) — rejected; diverges from the pixel-art language. Kept as fallback if the 8bitcn avatar fails island composition (see Risks).

### 3. Types in `src/types/types.ts`, mock data co-located

Define `DeckIcon` (union of lucide icon names or `string` + optional `iconComponent` mapping), `Deck { id, name, icon, totalCards, studiedCards }`, and `export const mockDecks: Deck[]` with ≥3 entries (0%, ~40-60%, 100%) directly in `src/types/types.ts` or `src/types/types.ts` + `src/lib/mock-decks.ts` re-exported. Single source keeps UI-only change small; future backend work replaces the import.

- Alternative considered: JSON file or API endpoint — rejected; overkill for UI-only scope and violates no-backend constraint.

### 4. Popover items as disabled-safe placeholder buttons

Popover content uses two plain menu buttons (`edit` with `Pencil` icon, `delete` with `Trash2` icon, `MoreVertical` trigger). `onClick` is a no-op in this change; props include optional `onEdit`/`onDelete` callbacks defaulting to no-op so future wiring needs no prop-shape change.

### 5. Empty state + accessibility defaults

Empty mock array renders a text empty-state (`No decks yet`). Avatar gets `alt`/fallback, icon containers `aria-hidden`, popover trigger `aria-label="Deck options"`, progress bar uses `role="progressbar"` with `aria-valuenow/min/max`.

## Risks / Trade-offs

- [Risk] Base-UI Popover inside Astro island hydration mismatch → Mitigation: use `client:load` on `DeckCard` only, keep page shell static; verify with `astro build`.
- [Risk] 8bitcn Avatar Radix context mismatch inside the island → Mitigation: checked `radix-ui/avatar` resolves to the `radix-ui@1.8.1` dist with no top-level `@radix-ui/react-avatar` copy, so Root/Image/Fallback share one instance; if `/app/deck` SSR still throws `must be used within Avatar` after the swap, fall back to Base-UI `src/components/ui/avatar` inside `UserAvatar` (verified working) and revisit.
- [Risk] 8-bit card border wrapper clips popover overflow → Mitigation: render popover via `Portal` (default in existing `popover.tsx`), keep card `overflow-visible` where needed; visual check.
- [Risk] Icon-as-string vs component mismatch → Mitigation: type icon as constrained union mapped to lucide components inside `DeckCard`; single mapping function.
- [Trade-off] Mock data in types file mixes concerns — accepted for UI-only speed; documented as throwaway replaced by API layer later.

## Migration Plan

No migration. Static addition only: new page, new component, additive types. Rollback = delete added files / revert `types.ts`. Verify with `astro build` (and `astro check` for types).

## Open Questions

- None blocking. Visual polish (pixel vs smooth progress bar, exact button variants) resolved during implementation within spec bounds.
