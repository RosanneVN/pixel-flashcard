## 1. Types and Mock Data

- [x] 1.1 Define `ReviewBox` type (id, interval label, icon, color, totalCards) and `mockReviewBoxes` with the 5 interval entries (`1 day`, `3 days`, `1 week`, `2 weeks`, `4 weeks`) in a new file under `src/mocks/` and verify `astro check` type-checks the new exports.
- [x] 1.2 Verify mock entries expose the box contract (icon, interval label, purple/red/yellow/green/blue colors in order, total counts) used by the page.

## 2. Deck Boxes Page

- [x] 2.1 Build `src/pages/app/deck.astro` header (`Boxes` title) and 2-column grid rendering one 8bitcn Card per mock box (icon, interval label via 8bitcn Badge, total count, per-box color) with no `client:*` directives, and verify all 5 boxes render in mock order.
- [x] 2.2 Add the `review 50 cards` 8bitcn Button below the grid as a UI-only placeholder (no handler, no navigation) plus a `No boxes yet` empty state for an empty mock array, and verify the button label and empty state render.
- [x] 2.3 Confirm UI-only scope and dashboard isolation (no fetch, routing, or mutations; dashboard, `DeckCard`, and `src/types/types.ts` untouched) and verify no network calls occur on page view.

## 3. Verification

- [x] 3.1 Run `astro check` (types) and `astro build` and verify both succeed without errors, then request `/app/deck` and verify 200 with title, grid, and button present.
