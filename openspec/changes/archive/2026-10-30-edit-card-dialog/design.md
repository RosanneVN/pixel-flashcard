## Context

See proposal.md Why. Current state: `src/pages/app/deck/[id].astro` maps `mockFlashcards` to one `FlashcardItem` per card with no `onEdit` wired, so the `edit` kebab item calls nothing. `FlashcardItem` (`src/components/flashcards/FlashcardItem.tsx`) already accepts `onEdit?: (id: string) => void` and fires it from the popover `edit` item. `CreateNewCard` (`src/components/flashcards/CreateNewCard.tsx`) is the established dialog pattern: 8-bit `Dialog` + `DialogContent` (aria-label), `DialogHeader`/`DialogTitle`, four `Input` fields (`question`/`answer` required, `example`/`notes` optional), `DialogFooter` with `cancel` (secondary, closes) / `save` (submit). Constraints: Astro 7 SSR + React 19 islands + Tailwind v4, `@` maps to `./src`; React only for interactive islands; dialog state must live in a React island because the Astro page cannot hold client state.

## Goals / Non-Goals

**Goals:**
- Reusable `EditCard` dialog visually and structurally identical to `CreateNewCard`, pre-filled from the selected card.
- `edit` on any detail-page card opens `EditCard` for that card; `cancel`/`save` close with no persistence.
- Single dialog instance shared across the card list.

**Non-Goals:**
- Persistence, validation API, or list mutation (still mock; `save` closes like `CreateNewCard`).
- `delete` behavior changes, search/filter, or detail-page layout changes.

## Decisions

### 1. New `EditCard.tsx` mirroring `CreateNewCard` line-for-line plus pre-fill

Props: `{ card: Flashcard | null; open: boolean; onOpenChange: (open: boolean) => void }`. Same 8-bit `Dialog`/`Input`/`Button` structure and lowercase title style (`edit flashcard`), same four placeholders, `required` on `question`/`answer`. Pre-fill via `defaultValue` per field plus `key={card?.id}` on the form so switching cards remounts with fresh defaults — no controlled inputs or `useEffect` sync needed for UI-only scope.

Alternative considered: controlled inputs synced by `useEffect` — rejected; unnecessary complexity when nothing persists.

### 2. Single list-level island owns dialog state

New small island (e.g. `DeckDetailCards` under `src/components/flashcards/`) renders the `mockFlashcards` list, holds `selectedId` state, passes `onEdit={setSelectedId}` into each `FlashcardItem`, and renders one `EditCard` with the selected card. The Astro page replaces its inline `<ul>` mapping with this island.

Alternative considered: per-`FlashcardItem` dialog state — rejected; N dialog instances and duplicated open state. Alternative considered: extending `DeckDetailActions` — rejected; that island owns header actions (`study all`), not the list.

### 3. UI-only save/cancel semantics unchanged

`cancel` calls `onOpenChange(false)`; submit `preventDefault()` then closes (and clears selection). No prop drilling beyond the list island; `delete` untouched.

## Risks / Trade-offs

- [Risk] `defaultValue` + `key` remount loses in-progress edits when switching cards → Mitigation: acceptable for UI-only placeholder; dialog closes on selection change path anyway.
- [Risk] Title wording (`edit flashcard` vs `edit card`) drifts from spec → Mitigation: tasks pin the exact title string and verify it in review.
- [Risk] Astro island boundary: passing `mockFlashcards` from `.astro` to island vs importing in island → Mitigation: import mock data inside the island (same as `CreateNewDeck` self-containment), keeping the page a thin shell; verify with `astro build`.

## Migration Plan

No migration. Additive change: one new dialog component + one list island + page wiring swap. Rollback = revert commit. Verify with `astro build`.

## Open Questions

- None. Exact title and field placeholders are pinned in specs/tasks.
