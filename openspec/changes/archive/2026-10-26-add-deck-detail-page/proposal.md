## Why

Users can see deck overviews on the dashboard but have no per-deck view to scan its cards or find study and card-creation entry points. A dedicated `deck/[id]` detail page closes that gap with a UI-only, mock-driven view before backend wiring.

## What Changes

- Add dynamic Astro route `src/pages/app/deck/[id].astro` rendering a single deck's detail view from local mock data (no fetching or persistence).
- Render header with title `deck: <deck_name>` resolved from the route `id` param against mock decks, plus side-by-side `study all` and `create new card` action buttons (UI-only placeholders).
- Render main section as a vertically stacked list of that deck's cards using a new reusable `FlashcardItem` React island.
- Add `src/components/flashcards/FlashcardItem.tsx` showing each card's question text plus a kebab (3-dots) menu with `edit` and `delete` items (UI-only placeholders, no mutation).
- Reuse existing `Flashcard` / `Deck` types from `src/types/types.ts` and `mockFlashcards` from `src/mocks/flashcards.ts`; reuse 8bit UI primitives (`Card`, `Button`, `Popover`) consistent with `DeckCard`.

## Capabilities

### New Capabilities

- `deck-detail-page`: per-deck detail route, header with deck title plus study/create actions, vertical card list, and `FlashcardItem` (question + kebab edit/delete) backed by mock data.

### Modified Capabilities

- None. Existing `deck-page` (Boxes grid) and dashboard specs are untouched; the new `[id]` route coexists with `src/pages/app/deck.astro`.

## Impact

- Affected code: new `src/pages/app/deck/[id].astro`, new `src/components/flashcards/FlashcardItem.tsx`; reads (no edits) `src/types/types.ts`, `src/mocks/flashcards.ts`, `src/components/ui/*`, `src/layouts/Layout.astro`.
- Routing: introduces dynamic segment under `app/deck/`; coexistence with static `deck.astro` must be verified via `astro build`.
- No API, auth, persistence, or dependency changes; all buttons and menu items are UI-only placeholders in this change.
