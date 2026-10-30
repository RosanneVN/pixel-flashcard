## Why

The deck detail page (`src/pages/app/deck/[id].astro`) lists cards with an `edit` kebab item that is currently a UI-only no-op placeholder. Users cannot inspect or adjust a card's content in place, breaking the expected edit loop on the detail view.

## What Changes

- Add a reusable `EditCard` dialog component mirroring `CreateNewCard` (8-bit `Dialog`, `question`/`answer` required + `example`/`notes` optional fields, `cancel`/`save` footer, UI-only with no persistence).
- Pre-fill the dialog fields from the selected `Flashcard` when opened for editing.
- Wire the `FlashcardItem` `edit` kebab item on `/app/deck/[id]` to open `EditCard` for that card; `cancel`/`save` close the dialog with no persistence, navigation, or network request.
- Leave `delete` as the existing UI-only placeholder (no behavior change).

## Capabilities

### New Capabilities

- `card-editing`: EditCard dialog form structure (pre-filled fields mirroring `CreateNewCard`) and UI-only open/save/cancel behavior on the deck detail page.

### Modified Capabilities

- `deck-detail-page`: `FlashcardItem` `edit` menu item now opens the `EditCard` dialog for the selected card instead of being a no-op placeholder.

## Impact

- New: `src/components/flashcards/EditCard.tsx` (React island, mirrors `CreateNewCard.tsx`).
- Modified: deck detail wiring (`src/pages/app/deck/[id].astro` via `FlashcardItem` `onEdit` or a small cards-list island holding dialog state); reuses `Flashcard` type and existing 8-bit `Dialog`/`Input`/`Button` primitives.
- No backend, persistence, routing, or auth changes; `astro build` verification.
