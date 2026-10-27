## Why

The deck detail page has a `create new card` button that currently does nothing, so users cannot start card creation. Adding a chooser modal and a creation form gives that button a UI-only next step before backend wiring.

## What Changes

- Add `ModalCard` React island rendered from `src/pages/app/deck/[id].astro` when `create new card` is triggered; flexbox column layout with `type your own cards` and `import your cards` buttons separated by `or` text (UI-only, no navigation or persistence yet).
- Add `CreateNewCard` modal form React island opened from `ModalCard`'s `type your own cards` button; header title `create a new flashcard`; main section with required `question` and `answer` text fields (placeholders `question`, `answer`) plus optional `example` and `notes` fields (placeholders `example`, `notes`); footer with `cancel` and `save` buttons (UI-only, no persistence yet).
- Wire `create new card` → `ModalCard` → (`type your own cards` → `CreateNewCard`) with local client state only; `import your cards` remains a UI-only placeholder.
- Reuse `Flashcard` types from `src/types/types.ts` for field contracts and 8bit `Dialog`/`Input`/`Button` primitives consistent with existing islands.

## Capabilities

### New Capabilities

- `card-creation`: chooser modal (`ModalCard`) and creation form modal (`CreateNewCard`) with fields, validation states, and cancel/save behavior.

### Modified Capabilities

- `deck-detail-page`: `create new card` button now opens `ModalCard` instead of being a no-op placeholder (`study all` remains UI-only).

## Impact

- New files: `ModalCard` and `CreateNewCard` components (under `src/components/flashcards/`); edits: `src/pages/app/deck/[id].astro` to host modal state and render islands.
- Reads (no edits): `src/types/types.ts`, `src/mocks/flashcards.ts`, `src/components/ui/8bit/*`.
- No API, persistence, auth, or dependency changes; all save/import paths are UI-only placeholders in this change.
