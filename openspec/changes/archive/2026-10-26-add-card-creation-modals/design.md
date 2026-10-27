## Context

See proposal.md Why for motivation. Current state: `src/pages/app/deck/[id].astro` is a static Astro shell with a no-op `create new card` 8bit `Button`; card islands live in `src/components/flashcards/` (`FlashcardItem`, `Flashcard`, `ReviewSession`); 8bit `Dialog`/`Input`/`Button` wrappers exist but are unused in pages; `Flashcard` types in `src/types/types.ts` define question/answer/example/note. Constraints: Astro 7 SSR + React 19 islands + Tailwind v4, `@` maps to `./src`; React only for interactive islands; verify with `astro build` (`astro check` when adding types).

## Goals / Non-Goals

**Goals:**
- Open `ModalCard` from `create new card` and `CreateNewCard` from `type your own cards` with local client state only.
- Reusable controlled-dialog islands matching 8bit styling and `Flashcard` field contracts.

**Non-Goals:**
- No persistence, API endpoints, validation beyond required-field blocking, file import handling, or changes to `study all`, card list, or shared UI primitives.

## Decisions

- **Controlled 8bit `Dialog` islands + one state-owner wrapper:** `ModalCard` (`open`, `onOpenChange`, `onTypeOwn`) and `CreateNewCard` (`open`, `onOpenChange`) are controlled dialogs; a small `DeckDetailActions`-style client island in `src/components/flashcards/` owns both open states and renders the existing `create new card` trigger. Alternative (uncontrolled `DialogTrigger` per modal) rejected because the `ModalCard` → `CreateNewCard` handoff needs shared state.
- **Native required-field blocking:** `question`/`answer` use 8bit `Input` with `required`; `example`/`notes` optional; `save` is a submit that stays UI-only. Alternative (custom validation library) rejected as overkill for a UI-only step.
- **Stack, don't replace, the chooser:** opening `CreateNewCard` keeps `ModalCard` mounted underneath (or closes it only on explicit dismiss), so `cancel` returns to a coherent state. Alternative (single dialog swapping content) rejected to keep each component independently testable.

## Risks / Trade-offs

- [Risk] Nested dialogs can trap focus or stack overlays → Mitigation: only one modal requires action at a time; `cancel` closes topmost first; verify with keyboard + `astro build`.
- [Risk] Astro static button vs React state ownership mismatch → Mitigation: trigger moves into the state-owner island; page keeps layout/static header only.
- [Risk] `notes` (plural, per request) vs `Flashcard.note` (singular) naming drift → Mitigation: component prop/placeholder uses `notes`, mapping to `note` documented in tasks; real type alignment comes with backend wiring.
