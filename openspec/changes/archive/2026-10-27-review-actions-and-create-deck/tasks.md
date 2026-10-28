## 1. Review entry points

- [x] 1.1 Wire Boxes `review today cards` to navigate to `/app/review` with no backend call and verify clicking it lands on the review page.
- [x] 1.2 Verify detail `study all` still navigates to `/app/review` and `create new card` is gone from the detail header, and verify both observations in the browser.

## 2. Card creation on Boxes page

- [x] 2.1 Add a Boxes action island hosting `create new card` + existing `ModalCard` → `CreateNewCard` chain and verify the chooser and form open with correct titles.
- [x] 2.2 Remove orphaned `ModalCard`/`CreateNewCard` state from `DeckDetailActions` leaving a pure `study all` button and verify detail page builds with no unused imports.

## 3. Create deck modal

- [x] 3.1 Create `CreateNewDeck` modal (title `Create a new deck`, `name` field with placeholder `type your deck name`, `cancel`/`save` UI-only) and verify all elements render in isolation.
- [x] 3.2 Wire dashboard `create new deck` to open `CreateNewDeck` and verify open, cancel-dismiss, and save-close with no persistence or network calls.

## 4. Verification

- [x] 4.1 Walk `dashboard → create new deck modal`, `deck → review today cards → review`, `deck/[id] → study all → review`, and `deck → create new card → chooser → form`, and verify each lands or opens as expected with no console errors.
- [x] 4.2 Run `astro build` (and `astro check` if types were touched) and verify the build succeeds with no new type errors.
