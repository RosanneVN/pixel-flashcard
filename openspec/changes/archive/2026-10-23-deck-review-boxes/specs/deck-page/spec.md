## ADDED Requirements

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

## REMOVED Requirements

### Requirement: Deck page three-block layout
**Reason**: Deck page now shows the Boxes spaced-repetition overview; the previous avatar/actions/deck-list layout lives on the dashboard page.
**Migration**: None (UI-only, no API or data migration).

### Requirement: Deck page action buttons
**Reason**: Replaced by the single `review 50 cards` button of the Boxes view; `study all` / `create new deck` remain on the dashboard page.
**Migration**: None (UI-only, no API or data migration).

### Requirement: Deck list renders from mock data
**Reason**: Replaced by the box grid rendering from `src/mocks/` review-box data; the `DeckCard` list remains on the dashboard page.
**Migration**: None (UI-only, no API or data migration).
