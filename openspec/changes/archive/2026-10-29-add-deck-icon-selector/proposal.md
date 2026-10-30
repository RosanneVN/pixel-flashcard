## Why

Deck creation currently only asks for a name and offers no visual identity choice, while existing decks already display subject icons (`DeckCard` supports 5 `DeckIcon` values). Adding an icon picker at creation time lets users assign a meaningful subject icon from the start.

## What Changes

- Add a reusable `DeckIconSelector` React island component: a fixed-size card containing a horizontally scrollable icon grid.
- Provide 15–20 subject icons (lucide-react) covering common deck subjects (languages, math, science, code, geography, history, art, music, etc.).
- Integrate single-select behavior: click / keyboard selection with visible selected state, exposed via controlled `value` + `onChange` props.
- Wire the selector into the existing `CreateNewDeck` dialog on `/app/dashboard` so the chosen icon is part of the new-deck form state.
- Extend the `DeckIcon` union in `src/types/types.ts` and the `DeckCard` icon map so newly selectable icons render on cards.
- Use the 8bitcn `ScrollArea` (`src/components/ui/8bit/scroll-area.tsx`) with horizontal scrollbar for the scroll container; no new scrolling dependency.

## Capabilities

### New Capabilities

- `deck-icon-selector`: reusable horizontally-scrollable single-select icon picker card used during deck creation.

### Modified Capabilities

- `deck-creation`: `CreateNewDeck` form gains an icon selection step backed by the new selector; save/cancel remain UI-only placeholders.

## Impact

- Affected code: `src/components/decks/CreateNewDeck.tsx` (new), new `src/components/decks/DeckIconSelector.tsx` (or similar), `src/types/types.ts`, `src/components/decks/DeckCard.tsx` (icon map), `src/pages/app/dashboard.astro` (no structural change — dialog already mounted via `DashboardActions` island).
- Dependencies: existing `lucide-react` icons, existing `@radix-ui/react-scroll-area` via 8bitcn `ScrollArea`/`ScrollBar`; no new packages.
- No API, persistence, or routing changes; creation remains UI-only mock until backend wiring.
