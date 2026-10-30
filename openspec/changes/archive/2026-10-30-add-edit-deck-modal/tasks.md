## 1. EditDeck component

- [x] 1.1 Create `src/components/decks/EditDeck.tsx` mirroring `CreateNewDeck` with `Edit deck` title, pre-filled `name` field, `DeckIconSelector`, and `cancel`/`save` footer, and verify it renders the passed deck's name and icon.
- [x] 1.2 Add deck-switch state sync (`useEffect` on `deck.id` or `key` remount) plus empty-name blocking and UI-only submit/close, and verify switching decks resets fields and save/cancel close with no persistence.

## 2. Dashboard wiring

- [x] 2.1 Create dashboard deck-list React island owning `editingDeck` state, rendering `DeckCard` items with `onEdit` opening `EditDeck` pre-filled, and verify clicking `edit` opens the dialog without navigating to `/app/deck`.
- [x] 2.2 Update `src/pages/app/dashboard.astro` to use the new island instead of the static list (keeping empty state), and verify empty and populated states still render correctly.

## 3. Verification

- [x] 3.1 Run `astro check` (when types changed) and `astro build` and verify both succeed with no new warnings.
