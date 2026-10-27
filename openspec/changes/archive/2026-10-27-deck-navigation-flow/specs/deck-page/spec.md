## MODIFIED Requirements

### Requirement: UI-only scope
The system SHALL source all Deck page and `DeckCard` content from local mock data with no data fetching, persistence, or auth, but SHALL allow client-side navigation when a deck or box card is activated.

#### Scenario: No backend side effects
- **WHEN** a user views the Deck page or opens any DeckCard popover
- **THEN** no network request is made and no stored data changes

#### Scenario: Card activation navigates
- **WHEN** a user activates a deck card body or a review-box card (excluding popover/menu controls)
- **THEN** the system performs only a client-side route change with no network request and no stored data change

### Requirement: DeckCard popover menu
The system SHALL open a popover from the DeckCard 3-dots button showing `edit` and `delete` menu items.

#### Scenario: Popover opens with edit and delete
- **WHEN** a user activates the 3-dots button on a `DeckCard`
- **THEN** a popover appears containing an `edit` item and a `delete` item

#### Scenario: Popover items are UI-only placeholders
- **WHEN** a user activates `edit` or `delete` in the DeckCard popover
- **THEN** no rename, deletion, navigation, or network request occurs in this change

## ADDED Requirements

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
