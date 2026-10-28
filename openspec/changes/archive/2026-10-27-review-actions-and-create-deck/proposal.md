## Why

The Boxes page `review today cards` button is a dead UI-only placeholder, card creation is entered from the wrong page (deck detail instead of the Boxes overview), and the dashboard `create new deck` button does nothing. Wiring review entry points and adding a deck-creation modal completes the core loop: create deck → create cards → review.

## What Changes

- Boxes page (`src/pages/app/deck.astro`) `review today cards` button navigates to `/app/review` on activation (still no backend; replaces UI-only placeholder behavior).
- Deck detail page (`src/pages/app/deck/[id].astro`) keeps `study all` → `/app/review` (already wired; verify only, no change).
- Card creation entry moves to the Boxes page: `create new card` on `deck.astro` opens the existing `ModalCard` chooser → `CreateNewCard` form chain; the detail page no longer hosts card creation (detail header keeps `study all` only).
- New `CreateNewDeck` modal: header title `Create a new deck`, one text field (label `name`, placeholder `type your deck name`), footer with `cancel` and `save` buttons. UI-only: `cancel` closes without persisting, `save` closes without persisting in this slice.
- Dashboard (`src/pages/app/dashboard.astro`) `create new deck` button opens the `CreateNewDeck` modal.

Assumptions: the review button label is `review today cards` as rendered in code (the `deck-page` spec still names it `review 50 cards` and is updated here); `save` in `CreateNewDeck` is a UI-only placeholder like `CreateNewCard`'s save.

## Capabilities

### New Capabilities

- `deck-creation`: `CreateNewDeck` modal (title, name field, cancel/save, UI-only, opened from dashboard).

### Modified Capabilities

- `deck-page`: `review today cards` navigates to `/app/review`; Boxes page gains the `create new card` entry point.
- `deck-detail-page`: detail page loses the `create new card` entry (keeps `study all` → review).
- `card-creation`: card-creation trigger entry point is the Boxes page (detail page no longer triggers it).
- `dashboard-page`: `create new deck` button opens the `CreateNewDeck` modal.

## Impact

- Affected: `src/pages/app/deck.astro`, `src/pages/app/deck/[id].astro` (via `DeckDetailActions`), `src/pages/app/dashboard.astro`, new `CreateNewDeck` component (React island under `src/components/` mirroring `CreateNewCard`), plus `ModalCard`/`CreateNewCard` trigger wiring.
- No backend, persistence, or auth changes; all navigation is client-side route changes and all modal saves are UI-only over existing mock data.
- Existing popover, flip/grading, and back-header behavior stays unchanged.
