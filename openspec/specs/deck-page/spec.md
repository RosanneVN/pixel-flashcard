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

The system SHALL source all Deck page and `DeckCard` content from local mock data with no data fetching, persistence, or auth, but SHALL allow client-side navigation when a deck or box card is activated.

#### Scenario: No backend side effects

- **WHEN** a user views the Deck page or opens any DeckCard popover
- **THEN** no network request is made and no stored data changes

#### Scenario: Card activation navigates

- **WHEN** a user activates a deck card body or a review-box card (excluding popover/menu controls)
- **THEN** the system performs only a client-side route change with no network request and no stored data change

### Requirement: Boxes page layout

The system SHALL render the Deck page (`src/pages/app/deck.astro`) as a title header with text `Boxes`, followed by an action row with `review today cards` and `create new card` buttons, followed by the review-box grid.

#### Scenario: Title, actions, and grid render in order

- **WHEN** a user visits the Deck page
- **THEN** a `Boxes` title appears first, followed by the action row, followed by the box grid top-to-bottom

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

The system SHALL navigate to `/app/review` when the user activates the `review today cards` button on the Deck page, with no data fetching, mutation, or other network request.

#### Scenario: Review button navigates to review

- **WHEN** a user activates the `review today cards` button on `/app/deck`
- **THEN** the system navigates to `/app/review` with no network request and no stored data change

### Requirement: Create new card entry on Boxes page

The system SHALL open the `ModalCard` chooser modal when the user activates the `create new card` button on the Deck page, and the chooser SHALL open the `CreateNewCard` form when `type your own cards` is activated.

#### Scenario: Boxes create new card opens chooser

- **WHEN** a user activates `create new card` on `/app/deck`
- **THEN** the `ModalCard` chooser modal opens and no navigation, mutation, or network request occurs

#### Scenario: Chooser opens card form

- **WHEN** a user activates `type your own cards` in the chooser opened from the Boxes page
- **THEN** the `CreateNewCard` modal appears with title `create a new flashcard`

### Requirement: Deck card navigates to Boxes page

The system SHALL navigate to the Deck Boxes page at `/app/deck` when the user activates a `DeckCard` body on the dashboard, excluding activation of the 3-dots popover trigger and popover items.

#### Scenario: DeckCard body click navigates to deck page

- **WHEN** a user activates a `DeckCard` body (icon, name, counts, progress, or card background) without activating the 3-dots menu
- **THEN** the system navigates to `/app/deck`

#### Scenario: Popover activation does not navigate

- **WHEN** a user activates the DeckCard 3-dots button or any popover item
- **THEN** the system does not navigate and only the popover behavior occurs

### Requirement: Box card navigates to deck detail

The system SHALL navigate to `/app/deck/[id]` for the selected review box when the user activates a box card on the Deck Boxes page.

#### Scenario: Box card click navigates to detail

- **WHEN** a user activates a review-box card on `/app/deck`
- **THEN** the system navigates to `/app/deck/[id]` matching that box's deck id

### Requirement: Deck page top navigation header

The system SHALL render the shared back navigation header at the top of the Deck Boxes page.

#### Scenario: Deck page shows back header

- **WHEN** a user visits `/app/deck`
- **THEN** a top header with a `back` arrow button is visible above the page content
