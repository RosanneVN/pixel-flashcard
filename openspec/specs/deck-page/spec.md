# deck-page Specification

## Purpose

Presents the user's flashcard decks in a browsable UI-only page with a reusable deck card, so users can visually scan decks, see progress, and discover study and management entry points before backend wiring.

## Requirements

### Requirement: Deck page three-block layout

The system SHALL render the Deck page (`src/pages/app/deck.astro`) as three vertically stacked blocks: (1) avatar header at top-left, (2) action row with "study all" and "create new deck" buttons, (3) deck list below.

#### Scenario: Three blocks render in order

- **WHEN** a user visits the Deck page
- **THEN** an avatar appears at the top-left, followed by the two action buttons, followed by the deck list in top-to-bottom order

#### Scenario: Avatar block positioned top-left

- **WHEN** a user visits the Deck page
- **THEN** the first block shows a user avatar aligned to the left at the top of the page

### Requirement: Deck page action buttons

The system SHALL display two buttons in the second block labeled `study all` and `create new deck`.

#### Scenario: Both action buttons visible

- **WHEN** a user visits the Deck page
- **THEN** a button labeled `study all` and a button labeled `create new deck` are both shown in the action row

#### Scenario: Action buttons are UI-only placeholders

- **WHEN** a user activates `study all` or `create new deck`
- **THEN** no navigation, mutation, or network request occurs in this change (visual affordance only)

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

### Requirement: Deck list renders from mock data

The system SHALL render one `DeckCard` per entry in the deck mock data array on the Deck page.

#### Scenario: List matches mock entries

- **WHEN** the mock data contains N decks
- **THEN** exactly N `DeckCard` items appear in the third block in mock-data order

#### Scenario: Empty mock list shows empty state

- **WHEN** the mock data array is empty
- **THEN** the list block shows an empty-state message instead of deck cards

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
