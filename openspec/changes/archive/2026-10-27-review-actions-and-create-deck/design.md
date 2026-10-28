## Context

See proposal.md Why for motivation. Current state: `review today cards` on `deck.astro` is a plain UI-only `Button` with no handler; `study all` in `DeckDetailActions` already navigates to `/app/review` via `window.location.assign`; `create new card` exists as a static button on `deck.astro` but the `ModalCard` → `CreateNewCard` chain is only wired in `DeckDetailActions` (whose chooser state is now orphaned); `create new deck` on `dashboard.astro` is a plain button with no handler. Established patterns: 8-bit `Dialog`/`Input`/`Button` wrappers, `CreateNewCard` as the modal-form reference, React islands (`client:load`) for anything with `useState`, plain anchors / `window.location.assign` for navigation. Constraints: Astro 7 SSR + React 19 islands + Tailwind v4, `@` maps to `./src`, React only for interactive islands, verify with `astro build`.

## Goals / Non-Goals

**Goals:**
- Wire both review entry points to `/app/review` with no backend calls.
- Make the Boxes page the single card-creation entry and remove the orphaned chooser wiring from detail actions.
- Add a `CreateNewDeck` modal mirroring `CreateNewCard` and open it from the dashboard.

**Non-Goals:**
- Real persistence for decks or cards (both saves stay UI-only placeholders).
- Validation beyond required-field blocking; deck-name uniqueness checks.
- Visual redesign of pages beyond wiring and the new modal.

## Decisions

### 1. `review today cards` navigates like `study all`
Wire the Boxes `review today cards` button with the same mechanism as detail `study all` (`window.location.assign("/app/review")` in the island, or an Astro-level navigation for the static Boxes button). Rationale: consistency with the proven pattern, zero hydration cost. Alternative (shared review-link component) rejected — two call sites do not justify the abstraction yet.

### 2. Card-creation island moves to the Boxes page
Introduce a small React island on `deck.astro` (e.g. `BoxesActions`) owning `chooserOpen`/`formOpen` and rendering `create new card` + `ModalCard` + `CreateNewCard`, reusing the existing components unchanged. Strip the orphaned `ModalCard`/`CreateNewCard` state from `DeckDetailActions`, leaving it a pure `study all` navigation button. Alternative (keep triggers on both pages) rejected — the request assigns card creation to the Boxes page, and dual entries would double the modal-state surface.

### 3. `CreateNewDeck` mirrors `CreateNewCard`
New `src/components/.../CreateNewDeck.tsx` following `CreateNewCard.tsx` line-for-line: 8-bit `Dialog` + `DialogContent` (aria-label), `DialogHeader`/`DialogTitle` `Create a new deck`, single required `Input` (label `name`, placeholder `type your deck name`), `DialogFooter` with `cancel` (secondary, closes) and `save` (submit, `preventDefault`, closes). Dashboard hosts it via a tiny island holding open state, same as the Boxes action island. Alternative (one generic modal component) rejected — the two forms have different fields/titles and the codebase favors one-purpose components.

### 4. UI-only saves, no API routes
Both `save` actions only close the modal. Rationale: no backend exists and project guidance reserves Astro endpoints for real mutations; adding a stub endpoint now would imply persistence that does not exist.

## Risks / Trade-offs

- [Risk] Orphaned chooser state left in `DeckDetailActions` if cleanup is missed → Mitigation: tasks explicitly remove `ModalCard`/`CreateNewCard` imports and state from detail actions; `astro build` + unused-import check catches leftovers.
- [Risk] Static Boxes buttons need an island for state; adding `client:load` increases JS → Mitigation: single small island per page reusing existing dialog components; no new dependencies.
- [Trade-off] `save` silently discards input — accepted for this UI-only slice; a persistence follow-up will change the spec.

## Migration Plan

No migration needed (UI-only, no data). Rollback: revert the three page edits plus the new component/islands; specs remain UI-only. Verify with `astro build` (and `astro check` if types touched).
