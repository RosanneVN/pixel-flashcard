## Context

See proposal.md Why. Current state: `CreateNewDeck.tsx` is a controlled 8bit `Dialog` with local `icon` state + `DeckIconSelector`; `DashboardActions.tsx` owns its `open` state as a React island. `DeckCard.tsx` already emits `onEdit(deck.id)` / `onDelete(deck.id)` from its popover menu and guards navigation via `data-deck-menu`. `dashboard.astro` renders the deck list statically in Astro from `mockDecks` with no `onEdit` wiring, so there is no React state owner for an edit modal yet.

Constraints: Astro 7 + React 19 islands; `@` maps to `./src`; prefer Astro/server endpoints for mutations, React only for interactive islands; UI-only change (no persistence), mirroring create/edit-card behavior.

## Goals / Non-Goals

**Goals:**
- Reuse the create-deck dialog pattern for a pre-filled `EditDeck` with correct open/dismiss/reset semantics.
- Give the dashboard list a React state owner so `DeckCard onEdit` opens the modal without navigation.

**Non-Goals:**
- Persistence, API wiring, mock-data mutation, validation library changes, delete flow, deck-detail page changes.

## Decisions

1. **New `src/components/decks/EditDeck.tsx` mirroring `CreateNewDeck`, with `deck` prop.**
   - Props: `{ deck: Deck | null; open: boolean; onOpenChange: (open: boolean) => void; }`. Internal `name` + `icon` state sync from `deck` via `useEffect` on `[deck?.id]` (or `key={deck?.id}` remount alternative); reset on close.
   - Rationale: keeps create untouched; prop-sync handles "switching decks re-initializes" scenario. Alternative (single shared form component for create+edit) rejected: larger refactor of a working component for one reuse.
   - `aria-label="Edit deck"`, title `Edit deck`, same `Input`/`DeckIconSelector`/`DialogFooter` layout; submit is UI-only `onOpenChange(false)` like create.

2. **Dashboard list becomes a small React island (e.g. `DashboardDeckList.tsx`) owning `editingDeck` state.**
   - Island renders `DeckCard` list from `mockDecks` (prop-drilled from Astro for now), passes `onEdit={(id) => setEditingDeck(decks.find(...))}`, renders `<EditDeck deck={editingDeck} open={!!editingDeck} onOpenChange={...} />`; clear selection on close.
   - Rationale: Astro static markup cannot hold modal state or pass callbacks; island is the minimal interactive boundary, consistent with `DashboardActions client:load`. Alternative (lifting edit state into `DashboardActions`) rejected: actions bar is not the list owner and would couple unrelated islands via DOM events.
   - `DeckCard` popover already stops propagation and guards `[data-deck-menu]`, so no navigation change needed.

3. **No data-layer change.**
   - Continue importing `mockDecks`; save/cancel close only. Rationale: matches `deck-creation` UI-only contract and `card-editing` precedent; persistence arrives as a separate change.

## Risks / Trade-offs

- [Risk] Stale form state when reopening for another deck → Mitigation: sync effect on `deck.id` + controlled `Input` value; scenario covered in spec.
- [Risk] Two dialogs (create + edit) drifting in style → Mitigation: copy 8bit dialog structure tokens verbatim; no new primitives.
- [Risk] Astro island hydration scope creep → Mitigation: island owns only list + edit modal; `DashboardActions` untouched.

## Migration Plan

No migration. UI-only addition; rollback is revert of new component + island wiring. Verify with `astro build` (and `astro check` for new props).

## Open Questions

None. Title copy (`Edit deck`) and placeholder reuse are recorded as assumptions in the spec; adjustable during apply without changing behavior shape.
