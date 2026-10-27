## 1. FlashcardItem component

- [x] 1.1 Create `src/components/flashcards/FlashcardItem.tsx` rendering question text plus kebab `MoreVertical` button with `Popover` containing `edit` and `delete` items (mirroring `DeckCard`), and verify it type-checks with `Flashcard` from `src/types/types.ts` via `astro check`.
- [x] 1.2 Verify kebab popover opens with `edit` and `delete` and both are UI-only (no navigation/mutation/network) by rendering the component in isolation.

## 2. Deck detail route

- [x] 2.1 Create `src/pages/app/deck/[id].astro` resolving `Astro.params.id` against mock decks, rendering `Layout` with `h1` `deck: <deck_name>` plus side-by-side `study all` and `create new card` buttons, and verify known id (e.g. `deck-japanese-basics`) shows the correct title.
- [x] 2.2 Render main card list as a vertical stack mapping `mockFlashcards` to `FlashcardItem client:load` in order with empty-state and unknown-id not-found handling, and verify list order, empty state, and not-found message by visual/manual check.
- [x] 2.3 Verify coexistence of `deck.astro` (`/app/deck`) and `deck/[id].astro` (`/app/deck/<id>`) plus full build via `astro build` (and `astro check` for types).
