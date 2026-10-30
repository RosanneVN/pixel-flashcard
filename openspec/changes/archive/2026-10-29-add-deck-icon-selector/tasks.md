## 1. Icon model and catalog

- [x] 1.1 Extend `DeckIcon` union in `src/types/types.ts` with 13 new subject values and verify `astro check` passes with no type errors
- [x] 1.2 Create shared icon catalog (e.g. `src/components/decks/deck-icons.ts`) with 15–20 entries mapping each `DeckIcon` to a verified lucide-react export and label, and verify every import resolves via `astro check`

## 2. DeckIconSelector component

- [x] 2.1 Implement `DeckIconSelector.tsx` as a controlled React island (`value`/`onChange`) rendering a fixed-size 8bitcn `Card` with `ScrollArea` plus explicit horizontal `ScrollBar` and a `w-max flex` icon row, and verify it renders without vertical growth in isolation
- [x] 2.2 Implement single-select behavior with one pre-selected default and distinct selected styling, and verify clicking a different icon leaves exactly one selected option
- [x] 2.3 Add radiogroup keyboard/a11y semantics (`role="radiogroup"`, `role="radio"`, `aria-checked`, `aria-label`, focus-visible styles) and verify full keyboard operation (Tab + Enter/Space changes selection)

## 3. Deck creation integration

- [x] 3.1 Wire `DeckIconSelector` into `CreateNewDeck.tsx` form state between name field and footer with reset-on-close, and verify the dialog shows title, name field, selector with pre-selection, and cancel/save buttons
- [x] 3.2 Extend `DeckCard.tsx` icon map to cover all new `DeckIcon` values (exhaustive `Record`) and verify existing mock decks still render their original icons
- [x] 3.3 Confirm dashboard flow needs no structural change (`dashboard.astro` + `DashboardActions` island already mount the dialog) and verify `create new deck` still opens the updated modal on `/app/dashboard`

## 4. Verification

- [x] 4.1 Run `astro check` and `astro build` and verify both succeed with no new warnings
- [x] 4.2 Manually verify on `/app/dashboard`: open `create new deck`, horizontally scroll the icon card, select icons via pointer and keyboard, submit with a name and confirm the dialog closes with no persistence or navigation (existing UI-only behavior)
