## Why

The Deck page (`src/pages/app/deck.astro`) is currently empty after its previous UI moved to the dashboard, so there is no spaced-repetition overview. A UI-only Boxes view gives users a visual summary of review intervals and due cards before any review-session or backend work.

## What Changes

- Build UI-only Boxes view in `src/pages/app/deck.astro`: header title `Boxes`, 2-column grid of 5 interval boxes, and a `review 50 cards` button below the grid.
- Each box shows an icon, its review interval (`1 day`, `3 days`, `1 week`, `2 weeks`, `4 weeks`), and its total card count, each box in a distinct color (purple, red, yellow, green, blue in interval order).
- Define shared box types plus mock box data in `src/mocks/` (new files, outside the page component); all actions are static placeholders with no navigation, mutation, or backend.
- Style with 8bitcn wrappers (`src/components/ui/8bit/*`: Card, Button, Badge) + Tailwind v4 + lucide-react icons.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `deck-page`: replaces the previous 3-block layout (avatar header, `study all` / `create new deck` actions, deck-card list) with the Boxes overview (title header, 5 interval boxes in a 2-column grid, `review 50 cards` button), plus box types and mock data contract. The old layout now lives on the dashboard page and is out of this change's scope.

## Impact

- Adds: Boxes markup in `src/pages/app/deck.astro` (currently empty), new type + mock files under `src/mocks/` (directory exists, empty).
- Untouched: `src/pages/app/dashboard.astro`, `src/components/decks/DeckCard.tsx`, `src/types/types.ts` (`mockDecks`), existing 8bitcn primitives; no new dependencies.
- No API, routing, persistence, or review-session behavior; button and boxes are visual-only placeholders.
