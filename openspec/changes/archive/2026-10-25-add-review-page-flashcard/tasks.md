## 1. Types and mock data

- [x] 1.1 Add `FlashcardType` and `Flashcard` types to `src/types/types.ts` and verify `astro check` type-checks the new exports.
- [x] 1.2 Create `src/mocks/flashcards.ts` with `mockFlashcards` covering production/recognition and note/null-note cases and verify the array imports and type-checks.

## 2. Flashcard component

- [x] 2.1 Implement front side in `src/components/flashcards/Flashcard.tsx` (top-left type `Badge`, inner card with `question` label + text, footer `reverse` `Button`) and verify front renders badge, question, and reverse button from mock data.
- [x] 2.2 Implement back side (top-left type `Badge`, inner card with `answer`/`example` labels + texts, conditional `note` block omitted when null, footer with 5 grading buttons purple/red/yellow/green/blue plus `not at all`/`easy` subtexts) and verify note renders when present, is absent when null, and all 5 buttons with correct colors and subtexts are visible.
- [x] 2.3 Wire `reverse` flip state (front → back, ephemeral, no persistence) and verify activating `reverse` swaps that card to its back content.
- [x] 2.4 Wire grading advance (`onGrade` from any of the 5 buttons marks reviewed and shows next card front side, ephemeral) and verify grading advances index, resets to front side, and increments reviewed count.

## 3. Review page

- [x] 3.1 Render `src/pages/app/review.astro` list from `mockFlashcards` in order with empty-state message and verify N cards render in order and empty array shows the empty state.
- [x] 3.2 Implement progress header (`X of N reviewed` + proportion bar via session island) and verify `0 of N` initially, `R of N` after R grades, and full bar after the last card.
- [x] 3.3 Verify UI-only scope: no fetch, persistence, routing, or auth added; flip, grading, and progress are ephemeral, confirmed by code inspection.

## 4. Verification

- [x] 4.1 Run `astro check` (types) and `astro build` and verify both succeed.
