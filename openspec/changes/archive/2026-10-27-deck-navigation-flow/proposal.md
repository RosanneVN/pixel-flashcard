## Why

Users can view login, dashboard, deck (Boxes), deck detail, and review pages in isolation, but there is no connected flow between them. Wiring click-through navigation plus a consistent back control makes the core study journey testable end-to-end with mock data.

## What Changes

- Login `Login` button navigates to the dashboard (`/app/dashboard`) on activation (still no backend/auth).
- Dashboard `DeckCard` click (card body, excluding the 3-dots popover) navigates to the deck Boxes page (`/app/deck`).
- Deck (Boxes) page box-card click navigates to the deck detail page (`/app/deck/[id]`); `review 50 cards` remains UI-only for now.
- Deck detail `study all` button navigates to the review page (`/app/review`); card rows remain non-navigating.
- Add a shared top navigation header with a `back` arrow button on dashboard, deck, deck detail, and review pages.
- Back follows the reverse linear flow `review → deck/[id] → deck → dashboard → login` (hidden on the first flow page, no wrap-around).

## Capabilities

### New Capabilities

- `dashboard-page`: dashboard deck-list page click-through and top back header (no existing spec covers `src/pages/app/dashboard.astro`).
- `app-navigation`: shared back header behavior and linear flow order reused across app pages.

### Modified Capabilities

- `login-page`: `Login` button gains navigation to dashboard (replaces UI-only no-navigation requirement).
- `deck-page`: `DeckCard`/box cards gain navigation; top back header added.
- `deck-detail-page`: `study all` gains navigation to review; top back header added.
- `review-page`: top back header added (no change to flip/grading behavior).

## Impact

- Affected: `src/pages/login.astro`, `src/pages/app/dashboard.astro`, `src/pages/app/deck.astro`, `src/pages/app/deck/[id].astro`, `src/pages/app/review.astro`, `DeckCard`, box cards, `DeckDetailActions`, plus a new shared navigation component (Astro or React island).
- No backend, persistence, or auth changes; all navigation is client-side route changes over existing mock data.
- Existing UI-only specs for popovers, modals, flip/grading stay unchanged.
