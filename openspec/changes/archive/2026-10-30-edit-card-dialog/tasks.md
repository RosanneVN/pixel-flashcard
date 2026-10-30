## 1. EditCard dialog component

- [x] 1.1 Create `src/components/flashcards/EditCard.tsx` as a controlled React island (`card`, `open`, `onOpenChange`) mirroring `CreateNewCard` (8-bit `Dialog`, title `edit flashcard`, `question`/`answer` required + `example`/`notes` optional, `cancel`/`save` footer) with fields pre-filled via `defaultValue` and `key={card?.id}` remount, and verify it renders the title, four pre-filled fields, and both buttons in isolation
- [x] 1.2 Implement UI-only dismiss (submit `preventDefault` + close, `cancel` closes, required-field blocking) with no persistence, navigation, or network calls, and verify `cancel`/`save` close the dialog and empty required fields block submit

## 2. Deck detail wiring

- [x] 2.1 Create list island (e.g. `DeckDetailCards`) rendering one `FlashcardItem` per `mockFlashcards` entry in order with `onEdit` selecting the card and a single shared `EditCard`, and verify N rows render in mock order
- [x] 2.2 Wire the island into `src/pages/app/deck/[id].astro` replacing the inline card mapping (keeping header, `study all`, empty-state, and not-found branches), and verify `edit` opens `EditCard` pre-filled for that card while `delete` remains a no-op placeholder with no navigation

## 3. Verification

- [x] 3.1 Run `astro build` and verify it succeeds with no new warnings, then manually verify on `/app/deck/deck-japanese-basics`: open `edit` via keyboard and pointer, confirm pre-filled values, and confirm `cancel`/`save` close with no persistence or navigation
