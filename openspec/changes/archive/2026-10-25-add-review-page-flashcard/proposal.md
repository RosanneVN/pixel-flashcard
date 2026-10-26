## Why

Users need a dedicated Review Page to study due flashcards outside the Boxes overview. The empty `src/pages/app/review.astro` route currently shows nothing, so there is no place to render the review queue or preview the two-sided Flashcard UI. Users also need visible session progress and a quick self-grading step to move through the queue.

## What Changes

- Add `Review` page at `src/pages/app/review.astro` rendering a review flashcard list from local mock data (UI-only, no fetching or persistence).
- Add reusable `Flashcard` component with flippable front and back sides controlled by a `reverse` action.
- Front side: header badge (`production` or `recognition`), body card with `question` label + question text, footer `reverse` button showing the back side.
- Back side: header badge (`production` or `recognition`), body card with `answer`, `example`, and optional `note` fields each with labels; omit `note` block when null; footer with 5 grading buttons (purple, red, yellow, green, blue) with subtext `not at all` below purple and `easy` below blue.
- Review session flow: activating any grading button marks the current card reviewed and advances to the next card's front side (ephemeral client state, no persistence).
- Progress bar on `src/pages/app/review.astro` showing reviewed count (e.g. `X of N reviewed`) plus a proportion bar.
- Add TypeScript types for flashcards in `src/types/types.ts` and mock flashcard array in `src/mocks/` (e.g. `src/mocks/flashcards.ts`).

## Capabilities

### New Capabilities
- `review-page`: Review Page list UI, reusable two-sided Flashcard component, flashcard TS types and mock data.

### Modified Capabilities
- None.

## Impact

- Affected code: new `src/pages/app/review.astro` content (currently empty) including progress header, new component under `src/components/flashcards/` (Flashcard + session island for index/reviewed count), extensions to `src/types/types.ts`, new file under `src/mocks/`.
- No API, routing, auth, or persistence changes; all content from local mocks.
- Follows existing patterns: `deck-page` spec (DeckCard + mocks + UI-only scope), 8-bit `Card`/`Badge`/`Button` primitives, `Layout.astro` page shell.
