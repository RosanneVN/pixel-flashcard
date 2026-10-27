## 1. Shared navigation header

- [x] 1.1 Create `src/components/navigation/FlowNav.astro` with `backHref`/`nextHref` props rendering `back`/`next` arrow links in a `flex justify-between` nav and verify it renders both links with accessible names in isolation.
- [x] 1.2 Style `FlowNav` with 8-bit pixel theme and keyboard-focusable links and verify visual consistency and Tab + Enter activation in the browser.

## 2. Page flow wiring

- [x] 2.1 Wire login `Login` button to navigate to `/app/dashboard` with no backend call and verify clicking it lands on the dashboard.
- [x] 2.2 Make dashboard `DeckCard` body navigate to `/app/deck` while the 3-dots popover does not navigate and verify both click paths plus keyboard activation.
- [x] 2.3 Add `FlowNav` to `dashboard.astro` (`back=/login`, `next=/app/deck`) and verify header sits above the deck list with space-between layout.
- [x] 2.4 Wrap deck Boxes cards in links to `/app/deck/deck-japanese-basics` and add `FlowNav` (`back=/app/dashboard`, `next=/app/deck/deck-japanese-basics`) and verify box click lands on detail and header renders on top.
- [x] 2.5 Wire deck detail `study all` to navigate to `/app/review`, keep `create new card` modal chain intact, and add `FlowNav` (`back=/app/deck`, `next=/app/review`) and verify study-all navigates and modal still opens.
- [x] 2.6 Add `FlowNav` to `review.astro` (`back=/app/deck`, no `next`) without changing flip/grading/progress and verify header renders and grading flow still advances cards.

## 3. Verification

- [x] 3.1 Walk the full flow `login → dashboard → deck → deck/[id] → review` plus back buttons and verify each step lands on the expected route with no console errors.
- [x] 3.2 Run `astro build` (and `astro check` if types were touched) and verify the build succeeds with no new type errors.
