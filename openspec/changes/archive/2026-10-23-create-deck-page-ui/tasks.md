## 1. Types and Mock Data

- [x] 1.1 Define `Deck`, `DeckIcon`, and `mockDecks` (≥3 entries: 0%, partial, 100%) in `src/types/types.ts` and verify `astro check` type-checks the new exports.
- [x] 1.2 Verify mock entries expose id, name, icon, totalCards, studiedCards used by the card contract.

## 2. DeckCard Component

- [x] 2.1 Create `src/components/decks/DeckCard.tsx` React island rendering icon, name, total-cards label, progress bar (`role="progressbar"` with studied/total ratio), and 3-dots trigger, and verify it renders with mock props in isolation.
- [x] 2.2 Add Base-UI/8bit `Popover` to DeckCard with `edit` and `delete` placeholder items (no-op callbacks, `aria-label="Deck options"`) and verify popover opens and shows both items.
- [x] 2.3 Style DeckCard with 8-bit Card/Button wrappers + Tailwind + lucide-react (`MoreVertical`, `Pencil`, `Trash2`) and verify pixel-art styling matches login page language.

## 3. Deck Page

- [x] 3.1 Swap `UserAvatar` island inner import to the 8bitcn pixel `Avatar` (`src/components/ui/8bit/avatar.tsx`, `variant="pixel"` default) keeping single-island composition, keep block 2 buttons unchanged, and verify `/app/deck` returns 200 with the top-left avatar and no Avatar context errors in server logs.
- [x] 3.2 Render block 3 deck list mapping `mockDecks` to `<DeckCard client:load />` plus `No decks yet` empty state and verify N cards render in mock order.
- [x] 3.3 Confirm UI-only scope (no fetch, routing, or mutations from page or card) and verify no network calls occur on page view and popover interactions.

## 4. Verification

- [x] 4.1 Run `astro check` (types) and `astro build` and verify both succeed without errors.
