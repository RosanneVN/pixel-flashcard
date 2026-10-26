## Context

`src/pages/app/review.astro` is currently empty and `src/components/flashcards/` is empty. Existing patterns to follow: `src/pages/app/dashboard.astro` renders `Layout` + mock-data list with `client:load` React islands; `DeckCard.tsx` is the reference reusable card using 8-bit `Card`/`Badge`/`Button` primitives; deck types live in `src/types/types.ts` while box types/mocks live in `src/mocks/`. Project constraints: Astro 7 SSR + React 19 islands, Tailwind v4, `@` alias to `./src`, React only for interactive islands, verify with `astro build` (`astro check` when adding types). See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Render the Review Page list from local mocks in a way that matches the spec's front/back structure and conditional `note`.
- Keep flip, grading, and progress state ephemeral in a React session island, consistent with existing `client:load` usage.
- Place types/mocks where developers already look for them (`types.ts` + `src/mocks/`).

**Non-Goals:**
- No fetching, persistence, spaced-repetition scheduling, navigation, or auth.
- No flip-back, animations, or accessibility overhaul beyond labels already in specs.
- No new dependencies or global state.

## Decisions

### 1. `Flashcard` as React island with local `flipped` state
- **What:** New `src/components/flashcards/Flashcard.tsx` (`props: { card: Flashcard }`) holding `useState(false)`; `reverse` button sets `flipped=true` and swaps front markup for back markup. Page uses `<Flashcard card={c} client:load />`.
- **Why:** `reverse` requires per-card client state; matches `DeckCard` + `DashboardAvatar` `client:load` pattern and project rule to use React only for interactive islands.
- **Alternatives considered:** Pure Astro + inline `<script>` toggling hidden divs — rejected: duplicates state logic per card, harder to reuse/test, diverges from `DeckCard.tsx` precedent.

### 2. Types in `src/types/types.ts`, mocks in `src/mocks/flashcards.ts`
- **What:** Add `export type FlashcardType = "production" | "recognition"` and `export interface Flashcard { id: string; type: FlashcardType; question: string; answer: string; example: string; note: string | null }`; add `export const mockFlashcards: Flashcard[]` in new `src/mocks/flashcards.ts` with ≥4 entries covering both types and both note states.
- **Why:** Follows `deck-page` precedent (deck contract in `types.ts`, box contract + array in `src/mocks/`); keeps page and component imports stable.
- **Alternatives considered:** Co-locating types inside the mock file — rejected: breaks discoverability set by `Deck` in `types.ts`.

### 3. Reuse 8-bit primitives with header / body-card / footer slots
- **What:** Outer `Card` + `CardHeader` (top-left `Badge` with `card.type`), `CardContent` containing an inner bordered block for labeled fields (`question` on front; `answer`/`example`/conditional `note` on back), `CardFooter` with `Button type="button"` labeled `reverse` on the front.
- **Why:** Matches existing `deck.astro` and `DeckCard.tsx` use of `Card`/`Badge`/`Button` and gives the requested header / section-inside-card / footer anatomy without new styling system.
- **Alternatives considered:** Raw divs with custom CSS — rejected: inconsistent with pixel theme and retro CSS already wired in 8-bit components.

### 4. One-way flip plus grading advance in this change
- **What:** Front → back via `reverse`; back footer holds 5 grading buttons that mark the card reviewed and advance to the next card's front side. Back has no other flip-back control.
- **Why:** Specs require front footer `reverse` plus back footer grading that advances the session; keeping both one-way avoids inventing toggle behavior.
- **Alternatives considered:** Toggle button on both sides — rejected as scope creep; can be added later as a modified requirement.

### 5. Session island owns index and reviewed count
- **What:** New `ReviewSession.tsx` (or `ReviewList` island) holds `activeIndex` and `reviewedCount`; renders `Progress` header (`X of N reviewed` + bar) and the active `Flashcard`; passes `onGrade: (level: 1-5) => void` to `Flashcard`. `Flashcard` keeps local `flipped` but resets to front when its `card.id` changes (via `key={card.id}` or effect).
- **Why:** Progress and advance require shared session state above the card; matches project rule to isolate client state in React islands while `review.astro` stays a thin shell.
- **Alternatives considered:** Per-card independent counters without session — rejected: cannot compute `X of N` or implement next-card advance coherently.

### 6. Grading footer styling via fixed color order
- **What:** Back `CardFooter` renders 5 `Button type="button"` in order purple, red, yellow, green, blue (e.g. `bg-purple-500` etc. following `mockReviewBoxes` palette); caption `not at all` under purple and `easy` under blue only; middle three have no caption.
- **Why:** Directly implements the requested visual order and minimal subtexts without inventing labels for the middle grades.
- **Alternatives considered:** 8-bit `Badge` variants for grades — rejected: buttons need press affordance and existing `Button` already carries pixel styling.

## Risks / Trade-offs

- [Risk] `note: string | null` vs `undefined` mismatch with future API → Mitigation: spec fixes on `null`; normalize at fetch boundary later.
- [Risk] Per-card React islands plus session state increase JS for long lists → Mitigation: acceptable for UI-only mock list (single-digit cards); single active-card render keeps DOM small; virtualize or paginate when wired to real data.
- [Risk] Grade-level semantics (1-5) currently advance only, no scheduling → Mitigation: `onGrade` receives the level but this change only uses it to advance; mapping to intervals is explicitly out of scope.
- [Risk] 8-bit `Badge` visual-class filtering may drop custom colors → Mitigation: use default badge variant with text-only type, as `deck.astro` does with interval labels, and verify visually in `astro build` preview.

## Migration Plan

No migration needed. Pure addition: new page content, new component directory, additive types, new mock file. Rollback by deleting those additions.

## Open Questions

None. Badge vocabulary (`production` / `recognition`) is taken as given from the request; wording can be revisited in a follow-up without changing this design.
