## 1. Modal components

- [x] 1.1 Create `ModalCard` controlled dialog island with flexbox column layout (`type your own cards`, `or`, `import your cards`) and verify both buttons plus separator render vertically via `astro build`.
- [x] 1.2 Create `CreateNewCard` controlled modal form with `create a new flashcard` header, required `question`/`answer` plus optional `example`/`notes` fields, and `cancel`/`save` footer, and verify required-field blocking plus UI-only save via manual form check and `astro check`.
- [x] 1.3 Create deck detail actions state-owner island wiring `create new card` trigger to `ModalCard` and `type your own cards` to `CreateNewCard` with `cancel` dismissal, and verify the full trigger chain opens and dismisses without navigation or network calls.

## 2. Integration and verification

- [x] 2.1 Wire the actions island into `src/pages/app/deck/[id].astro` preserving the deck header and card list, and verify known deck renders trigger plus unknown id still shows the not-found state.
- [x] 2.2 Verify coexistence and types with `astro build` (plus `astro check` when types change) and confirm no persistence, API, or shared-primitive changes.
