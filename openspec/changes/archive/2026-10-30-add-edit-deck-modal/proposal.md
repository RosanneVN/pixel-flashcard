## Why

Dashboard deck cards already expose an `edit` menu action via `DeckCard`, but it has no handler wired on `/app/dashboard`, so users cannot review or adjust a deck's name and icon. Adding a UI-only `EditDeck` modal now unblocks deck management parity with card editing before backend wiring.

## What Changes

- Add a new `EditDeck` React modal dialog mirroring `CreateNewDeck` (title, `name` field, icon selector, `cancel`/`save` footer), pre-filled from the selected deck.
- Open `EditDeck` when the user activates the `edit` item in a dashboard `DeckCard` options menu; close on `cancel` or `save` with no persistence (UI-only, matching create behavior).
- Wire dashboard deck list so each `DeckCard` `onEdit` opens the modal with that deck's current `name` and `icon`; switching decks re-initializes form state.

## Capabilities

### New Capabilities
- `deck-editing`: pre-filled edit-deck dialog structure, open/dismiss behavior, and dashboard edit trigger for existing decks.

### Modified Capabilities
- None (dashboard wiring is covered as the trigger requirement inside the new `deck-editing` capability to avoid splitting one behavior across specs).

## Impact

- New file `src/components/decks/EditDeck.tsx` reusing 8bit `Dialog`, `Input`, `Button`, and existing `DeckIconSelector`.
- Dashboard deck-list area (`src/pages/app/dashboard.astro` + `DashboardActions` / new list island): wire `DeckCard onEdit` to modal state; no nav, API, or mock-data changes.
- No dependencies, breaking changes, or persistence changes.
