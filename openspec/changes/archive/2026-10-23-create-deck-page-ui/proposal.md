## Why

The app has an empty `src/pages/app/deck.astro` route and no deck-browsing UI, so users cannot see, study, or manage their flashcard decks. A UI-only Deck page establishes the visual foundation before study flows and backend wiring.

## What Changes

- Build UI-only Deck page at `src/pages/app/deck.astro` with three stacked blocks: avatar header (top-left), action row ("study all" + "create new deck"), flashcard/deck list.
- Create reusable `DeckCard` component (`src/components/decks/DeckCard.tsx` as React island) displaying icon, name, total cards, progress bar, and 3-dots button with popover (Edit, Delete).
- Render Deck page list from mock data with static placeholder actions (no navigation, no mutations, no backend).
- Define shared deck types in `src/types/types.ts` (`Deck`, `DeckIcon`, popover action types) and mock deck array.
- Style with existing Tailwind v4 + shadcn/Base-UI primitives (Avatar, Button, Card, Popover) and lucide-react icons.

## Capabilities

### New Capabilities

- `deck-page`: Deck browsing page layout, DeckCard component contract, deck types + mock data, UI-only interaction rules.

### Modified Capabilities

- None.

## Impact

- Adds: `src/pages/app/deck.astro`, `src/components/decks/DeckCard.tsx` (new), deck types in `src/types/types.ts` (currently empty), mock deck data co-located or in `src/lib/`/`src/api/`.
- Uses existing UI primitives (`avatar.tsx`, `button.tsx`, `card.tsx`, `popover.tsx`), Tailwind v4, lucide-react; no new dependencies.
- No API, auth, routing, or persistence changes; all buttons/popover items are visual-only placeholders.
