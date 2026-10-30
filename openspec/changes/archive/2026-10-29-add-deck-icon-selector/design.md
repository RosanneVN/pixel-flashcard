## Context

See proposal.md Why. Current state: `CreateNewDeck` (`src/components/decks/CreateNewDeck.tsx`) is a React island dialog with only a `name` `Input`; it closes on submit with no persistence. `DeckCard` (`src/components/decks/DeckCard.tsx`) maps 5 `DeckIcon` values (`src/types/types.ts`) to lucide-react icons. Dashboard (`src/pages/app/dashboard.astro`) mounts the dialog via `DashboardActions` island (`client:load`). The 8bitcn `ScrollArea` (`src/components/ui/8bit/scroll-area.tsx`) wraps Radix `ScrollAreaPrimitive` with a vertical `ScrollBar` by default and accepts `orientation="horizontal"`. Styling is Tailwind v4 + 8bitcn `Card`. React is allowed here because the selector needs client selection state.

## Goals / Non-Goals

**Goals:**
- Reusable controlled icon picker card with fixed dimensions and horizontal scroll.
- 15–20 subject icons that also render on `DeckCard`.
- Wire picker into `CreateNewDeck` form state without changing UI-only save/cancel semantics.

**Non-Goals:**
- Backend persistence, validation API, or deck-list mutation (still mock).
- Vertical scrolling, multi-select, search/filter, custom icon upload.
- New routing or dashboard layout changes.

## Decisions

### 1. New `DeckIconSelector.tsx` React island under `src/components/decks/`

Controlled component with `value: DeckIcon` + `onChange: (icon: DeckIcon) => void` (plus optional `defaultValue` for standalone use). Renders 8bitcn `Card` + `CardContent` as fixed-size shell (e.g. `w-full max-w-md h-28`), with 8bitcn `ScrollArea` inside and explicit `<ScrollBar orientation="horizontal" />` (the default `ScrollArea` only renders a vertical bar, so the horizontal bar must be added). Inner row is `flex gap-2 w-max` of icon buttons so overflow scrolls horizontally.

Alternative considered: Astro component — rejected because selection needs client state; project context mandates React islands for interactive state.

### 2. Icon catalog: ~18 lucide-react icons, single source of truth

Define `DECK_ICON_OPTIONS: { value: DeckIcon; label: string; Icon: LucideIcon }[]` in the selector module (or shared `src/components/decks/deck-icons.ts` if `DeckCard` imports it too). Keep existing 5 values (`languages`, `calculator`, `flask`, `globe`, `code`) and add ~13: e.g. `history` (Landmark), `art` (Palette), `music` (Music), `biology` (Dna), `physics` (Atom), `chemistry` (already flask — use TestTube for extra), `literature` (BookOpen), `sports` (Trophy), `tech` (Cpu), `design` (PenTool), `medicine` (Stethoscope), `food` (ChefHat), `travel` (Plane). Verify each name exists in the installed lucide-react version before finalizing.

Alternative considered: 15 vs 20 — 18 balances scroll length vs subject coverage; exact list is an implementation detail as long as spec range holds.

### 3. Extend `DeckIcon` union + reuse map in `DeckCard`

Add new string literals to `DeckIcon` in `src/types/types.ts`, then extend `deckIconMap` in `DeckCard.tsx` (or import the shared catalog map). Fallback `?? Languages` stays. This keeps old mock decks rendering unchanged.

Alternative considered: separate icon type for selector — rejected; divergence would break card rendering of newly created decks.

### 4. Selection UX: radiogroup pattern on buttons

Container uses `role="radiogroup"` + label; each option is a `<button type="button" role="radio" aria-checked>` with `aria-label` = subject label. Selected style: `bg-primary text-primary-foreground` (or 8bitcn `border-foreground` emphasis); unselected: `bg-muted`. Focus-visible ring preserved. Keyboard works natively via buttons (Enter/Space).

### 5. `CreateNewDeck` integration with local state

Add `const [icon, setIcon] = useState<DeckIcon>(defaultIcon)` in `CreateNewDeck`; render `<DeckIconSelector value={icon} onChange={setIcon} />` between name field and footer with a `<span id>` label. Reset to default on dialog close/submit (existing `onOpenChange(false)` path). No prop drilling to `DashboardActions` needed.

## Risks / Trade-offs

- [Risk] Horizontal `ScrollBar` styling in 8bitcn is minimal (`h-1.5`) and may be hard to see → Mitigation: keep fixed height with bottom padding for the bar; verify visually via `astro dev`.
- [Risk] Chosen lucide icon names may not exist in installed version → Mitigation: grep `node_modules/lucide-react` exports during implementation; swap missing names.
- [Risk] `DeckIcon` union growth touches `DeckCard` map — missing entry falls back silently → Mitigation: exhaustive map + `astro check` type error if a value lacks a mapping (use `Record<DeckIcon, LucideIcon>`).
- [Risk] Fixed-size card + retro 8bit borders may clip icons → Mitigation: fixed `size-10` option buttons, `p-3` content padding, test at 320px width.

## Migration Plan

No migration. Additive change: new file + extended union + dialog field. Rollback = revert commit. Verify with `astro build` (and `astro check` for type changes); manual check on `/app/dashboard` → `create new deck` → scroll row → select icon → save closes dialog.

## Open Questions

- None. Exact final icon list (15–20) is left to implementation within the spec range.
