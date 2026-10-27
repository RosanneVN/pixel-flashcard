## Context

See proposal.md Why for motivation. Current state: `src/pages/login.astro`, `src/pages/app/dashboard.astro`, `src/pages/app/deck.astro`, `src/pages/app/deck/[id].astro`, and `src/pages/app/review.astro` render in isolation with UI-only buttons (specs explicitly forbid navigation). `DeckCard` is a React island (`client:load`) with a 3-dots popover; box cards on `deck.astro` are static Astro markup; `study all` lives in the React `DeckDetailActions` island. No shared navigation component exists. Constraints: Astro 7 SSR + React 19 islands + Tailwind v4, `@` maps to `./src`, prefer Astro pages/endpoints for navigation over React state, verify with `astro build`.

## Goals / Non-Goals

**Goals:**
- Wire the linear click-through flow with plain route changes over existing mock data.
- Provide one reusable top back header used identically on all four app pages.
- Keep popover/modal/flip/grading behavior untouched.

**Non-Goals:**
- Auth, sessions, form validation, data fetching, or persistence.
- Real box-to-deck id mapping (mock boxes use `box-*` ids, mock decks use `deck-*` ids).
- Visual redesign of pages beyond the new header and clickable affordances.

## Decisions

### 1. Shared `FlowNav` as a static Astro component with a plain anchor
Create `src/components/navigation/FlowNav.astro` taking `backHref?: string`. Renders `<nav aria-label="Flow navigation" class="flex items-center justify-start">` with a `back` arrow link (8-bit pixel styling, `ArrowLeft` icon, accessible name `back`). Missing href hides the button (first flow page). Alternatives considered: React island header — rejected because navigation needs no client JS and Astro anchors work MPA-style with zero hydration; per project guidance React is reserved for interactive islands.

### 2. Login navigation via form/href, not fetch
Change the `Login` button in `login.astro` to navigate to `/app/dashboard` (anchor-styled button or `onclick="location.href=..."`; no form submit, no endpoint). Alternative (POST to `/api/login`) rejected — no auth backend exists and specs require no network side effects.

### 3. Dashboard `DeckCard` click handled in React with popover guard
Dashboard wraps each `DeckCard` in a container that navigates to `/app/deck` on card-body activation, while `stopPropagation` / trigger guard on the 3-dots `PopoverTrigger` and popover items prevents navigation. Keyboard: card container is focusable (`tabindex`, `role="link"` or inner link) so Enter/Space navigates. Alternative (wrap `<li>` in `<a>`) rejected — nesting the popover `<button>`s inside an anchor is invalid HTML and breaks accessibility.

### 4. Box-card click as Astro anchors to a known deck id
Wrap each box `Card` in `deck.astro` with `<a href="/app/deck/<id>">`. Because mock box ids (`box-*`) do not resolve in `[id].astro` (which looks up `mockDecks`), all boxes link to the first mock deck id (`deck-japanese-basics`) for this slice, keeping the flow demonstrable. Alternative (extend `[id]` lookup to boxes) rejected for now — it would change the detail data contract; record as follow-up.

### 5. `study all` navigates via anchor in `DeckDetailActions`
Add `href="/app/review"` behavior to the `study all` button (render as link-styled 8-bit button or `window.location` assign), leaving `create new card` modal chain untouched. `FlashcardItem` rows stay non-navigating. Alternative (Astro-only button on the page) rejected — the button currently lives in the React island, so the smallest change stays there.

### 6. Flow map is hardcoded per page, not a router
Each page passes explicit `backHref`: dashboard (back `/login`) → deck (back `/app/dashboard`) → detail (back `/app/deck`) → review (back `/app/deck`). No global router state; no forward navigation state is kept.

## Risks / Trade-offs

- [Risk] Nested-interactive conflict on `DeckCard` (click vs popover) → Mitigation: explicit propagation guard plus scenarios testing popover-does-not-navigate; verify keyboard path.
- [Risk] Box→deck id mismatch confuses users (all boxes land on same deck) → Mitigation: document as temporary mock mapping in design/tasks; follow-up task to define real mapping.
- [Risk] Anchor-styled 8-bit buttons diverge visually from React buttons → Mitigation: reuse existing retro classes/tokens; visual check in `astro build` + manual pass.
- [Trade-off] Full-page MPA navigation instead of SPA transitions — accepted for simplicity and SSR consistency; no View Transitions in this slice.

## Migration Plan

No migration needed (UI-only, no data). Rollback: revert the five page edits plus new `FlowNav` component; specs remain UI-only. Verify with `astro build` (and `astro check` if types touched).
