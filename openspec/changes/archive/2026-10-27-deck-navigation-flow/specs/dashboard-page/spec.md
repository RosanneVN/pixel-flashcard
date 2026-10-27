## Purpose

Presents the user's deck collection on the dashboard with click-through to the Boxes page and consistent top-level back navigation.

## ADDED Requirements

### Requirement: Dashboard deck list renders from mock data
The system SHALL render the dashboard page at `/app/dashboard` as a list of decks sourced from the local mock deck array in mock-data order, with an empty-state message when the array is empty.

#### Scenario: Dashboard lists mock decks in order
- **WHEN** a user visits `/app/dashboard` with N mock decks
- **THEN** exactly N `DeckCard` items appear in mock-data order

#### Scenario: Empty dashboard shows empty state
- **WHEN** the mock deck array is empty
- **THEN** the dashboard shows an empty-state message instead of deck cards

### Requirement: Dashboard DeckCard click navigates to deck page
The system SHALL navigate to `/app/deck` when the user activates a dashboard `DeckCard`, excluding popover controls.

#### Scenario: Dashboard card click moves to deck page
- **WHEN** a user clicks any deck card on `/app/dashboard`
- **THEN** the system navigates to `/app/deck`

#### Scenario: Dashboard popover does not navigate
- **WHEN** a user activates the DeckCard 3-dots menu or its items on the dashboard
- **THEN** the system does not navigate away from `/app/dashboard`

### Requirement: Dashboard top navigation header
The system SHALL render the shared back navigation header at the top of the dashboard page.

#### Scenario: Dashboard shows back header
- **WHEN** a user visits `/app/dashboard`
- **THEN** a top header with a `back` arrow button is visible above the deck list
