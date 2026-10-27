## Context

See proposal.md Why for motivation. Current state: `src/pages/app/deck.astro` is a static Boxes page; `src/pages/app/dashboard.astro` lists decks via `DeckCard` (React island with 8bit `Card`/`Button` + base `Popover` kebab menu for `edit`/`delete`); card data lives in `mockFlashcards` (`src/mocks/flashcards.ts`) with `Flashcard`/`Deck` types in `src/types/types.ts`; review flow uses `ReviewSession` island. Constraints: Astro 7 SSR + React 19 islands + Tailwind v4, `@` → `./src`; Astro pages for static rendering, React only for interactive islands; verify with `astro build` (`astro check` when adding types). The new `deck/[id]` route must coexist with the existing `deck.astro` file.

## Goals / Non-Goals

**Goals:**
- Dynamic per-deck detail route resolving `id` from mock decks with the specified header, side-by-side actions, and vertical card list.
- Reusable `FlashcardItem` island mirroring `DeckCard` kebab/Popover UX for question + `edit`/`delete`.

**Non-Goals:**
- No study-session navigation, create/edit/delete mutations, API endpoints, persistence, auth, filtering, or pagination — all actions are UI-only placeholders.
- No changes to `deck.astro` Boxes page, dashboard, review page, or shared UI primitives.

## Decisions

- **Route file `src/pages/app/deck/[id].astro` with `getStaticPaths` off / SSR lookup:** Astro SSR resolves `Astro.params.id` at request time and finds the deck in `mockDecks`; unknown `id` renders a not-found block. Alternative (static prerender of mock ids) rejected because the project uses `output: server` and mock ids are illustrative, not exhaustive.
- **Static Astro shell + `FlashcardItem` React island (`client:load`):** Page renders header/buttons/list statically like `dashboard.astro`; only `FlashcardItem` hydrates for the `Popover` kebab menu, following the `DeckCard` precedent. Alternative (pure Astro list rows) rejected because the Radix-based `Popover` needs client JS.
- **Mirror `DeckCard` popover pattern in `FlashcardItem`:** Reuse 8bit `Card` + `Button` and base `Popover`/`PopoverTrigger`/`PopoverContent` with `MoreVertical`, `Pencil`, `Trash2` icons; props `{ card: Flashcard; onEdit?: (id: string) => void; onDelete?: (id: string) => void }` unwired in the page. Alternative (custom dropdown) rejected to keep UX and styling consistent.
- **Mock wiring without new types:** Import `mockDecks`-equivalent from `src/types/types.ts` and `mockFlashcards` from `src/mocks/flashcards.ts` directly; no deck→card relation modeled yet — page shows all mock cards for the resolved deck. Alternative (adding `deckId` to `Flashcard`) rejected as premature data modeling for a UI-only change.

## Risks / Trade-offs

- [Risk] `src/pages/app/deck.astro` file vs new `src/pages/app/deck/` directory may confuse routing/tooling → Mitigation: verify `astro build` serves both `/app/deck` and `/app/deck/<id>`; if conflict arises, rename Boxes page in a follow-up (out of scope here).
- [Risk] Showing all mock cards for every deck is inaccurate once real data arrives → Mitigation: accepted UI-only simplification, documented in spec and tasks; real filtering comes with backend wiring.
- [Risk] `getStaticPaths` expectations under SSR vs prerender → Mitigation: no `getStaticPaths`, pure SSR param read; build verification covers it.

## Migration Plan

No migration. Additive files only (`[id].astro`, `FlashcardItem.tsx`); rollback is file deletion. Verify with `astro build` and `astro check`.
