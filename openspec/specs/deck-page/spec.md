# deck-page Specification

## Purpose

Presents the user's flashcard decks in a browsable UI-only page with a reusable deck card, so users can visually scan decks, see progress, and discover study and management entry points before backend wiring.

## Requirements

### Requirement: DeckCard content

The system SHALL provide a reusable `DeckCard` component that displays for each deck: an icon, the deck name, the total card count, a progress bar, and a 3-dots menu button.

#### Scenario: DeckCard shows all fields

- **WHEN** a `DeckCard` is rendered with mock deck data
- **THEN** its icon, deck name, total-cards label, progress bar, and 3-dots button are all visible

#### Scenario: Progress bar reflects studied ratio

- **WHEN** a `DeckCard` is rendered with studied and total counts
- **THEN** the progress bar fill proportion corresponds to studied divided by total (0 when nothing studied, full when all studied)

#### Scenario: Total cards label is explicit

- **WHEN** a `DeckCard` is rendered
- **THEN** the total number of cards is shown as text alongside or beneath the deck name

### Requirement: DeckCard popover menu

The system SHALL open a popover from the DeckCard 3-dots button showing `edit` and `delete` menu items.

#### Scenario: Popover opens with edit and delete

- **WHEN** a user activates the 3-dots button on a `DeckCard`
- **THEN** a popover appears containing an `edit` item and a `delete` item

#### Scenario: Popover items are UI-only placeholders

- **WHEN** a user activates `edit` or `delete` in the DeckCard popover
- **THEN** no rename, deletion, navigation, or network request occurs in this change

### Requirement: Deck types and mock data

The system SHALL define shared deck types in `src/types/types.ts` covering deck identity, display icon, card counts, and progress, plus an exported mock deck array with at least three entries spanning zero, partial, and complete progress.

#### Scenario: Types cover card contract

- **WHEN** a developer imports deck types from `src/types/types.ts`
- **THEN** a `Deck` type with id, name, icon, total/reviewed (or equivalent studied) counts, and a mock deck array are available and type-check

#### Scenario: Mock data spans progress states

- **WHEN** a developer inspects the mock deck array
- **THEN** it contains at least one not-started, one in-progress, and one completed deck

### Requirement: UI-only scope

The system SHALL NOT perform data fetching, persistence, routing, or auth from the Deck page or `DeckCard` in this change; all content comes from local mock data.

#### Scenario: No backend side effects

- **WHEN** a user views the Deck page or opens any DeckCard popover
- **THEN** no network request is made and no stored data changes

### Requirement: Boxes page layout

The system SHALL render the Deck page (`src/pages/app/deck.astro`) as a title header with text `Boxes`, followed by a 2-column grid of 5 review boxes, followed by a button labeled `review 50 cards` below the grid.

#### Scenario: Title, grid, and button render in order

- **WHEN** a user visits the Deck page
- **THEN** a `Boxes` title appears first, followed by the box grid, followed by the `review 50 cards` button top-to-bottom

#### Scenario: Grid uses two columns

- **WHEN** a user visits the Deck page
- **THEN** the 5 boxes are arranged in a 2-column grid (last row holds the fifth box)

### Requirement: Review box content

The system SHALL display for each review box: an icon, its review interval label, its total card count, and a distinct color per box (purple, red, yellow, green, blue in interval order).

#### Scenario: Box shows icon, interval, and count

- **WHEN** a review box is rendered with mock box data
- **THEN** its icon, interval label, and total-cards count are all visible

#### Scenario: Intervals cover five spans

- **WHEN** a user views the box grid
- **THEN** the boxes show `1 day`, `3 days`, `1 week`, `2 weeks`, and `4 weeks` in that order

#### Scenario: Each box has a distinct color

- **WHEN** a user views the box grid
- **THEN** the five boxes are visually distinguished by purple, red, yellow, green, and blue coloring respectively

### Requirement: Box grid renders from mock data

The system SHALL render one box per entry in the review-box mock data array in `src/mocks/` on the Deck page.

#### Scenario: Grid matches mock entries

- **WHEN** the mock data contains 5 boxes
- **THEN** exactly 5 boxes appear in the grid in mock-data order

#### Scenario: Empty mock list shows empty state

- **WHEN** the mock data array is empty
- **THEN** the grid block shows an empty-state message instead of boxes

### Requirement: Review box types and mock data

The system SHALL define shared review-box types in `src/mocks/` covering box identity, display icon, interval label, color, and total card count, plus an exported mock array with the 5 interval entries.

#### Scenario: Types cover box contract

- **WHEN** a developer imports review-box types from `src/mocks/`
- **THEN** a box type with id, interval label, icon, color, and total count, plus a mock box array, are available and type-check

### Requirement: Review button is UI-only placeholder

The system SHALL display a button labeled `review 50 cards` below the box grid that performs no navigation, mutation, or network request in this change.

#### Scenario: Review button has no side effects

- **WHEN** a user activates the `review 50 cards` button
- **THEN** no navigation occurs, no network request is made, and no stored data changes
