## MODIFIED Requirements

### Requirement: Boxes page layout
The system SHALL render the Deck page (`src/pages/app/deck.astro`) as a title header with text `Boxes`, followed by an action row with `review today cards` and `create new card` buttons, followed by the review-box grid.

#### Scenario: Title, actions, and grid render in order
- **WHEN** a user visits the Deck page
- **THEN** a `Boxes` title appears first, followed by the action row, followed by the box grid top-to-bottom

#### Scenario: Grid uses two columns
- **WHEN** a user visits the Deck page
- **THEN** the 5 boxes are arranged in a 2-column grid (last row holds the fifth box)

### Requirement: Review button is UI-only placeholder
The system SHALL navigate to `/app/review` when the user activates the `review today cards` button on the Deck page, with no data fetching, mutation, or other network request.

#### Scenario: Review button navigates to review
- **WHEN** a user activates the `review today cards` button on `/app/deck`
- **THEN** the system navigates to `/app/review` with no network request and no stored data change

## ADDED Requirements

### Requirement: Create new card entry on Boxes page
The system SHALL open the `ModalCard` chooser modal when the user activates the `create new card` button on the Deck page, and the chooser SHALL open the `CreateNewCard` form when `type your own cards` is activated.

#### Scenario: Boxes create new card opens chooser
- **WHEN** a user activates `create new card` on `/app/deck`
- **THEN** the `ModalCard` chooser modal opens and no navigation, mutation, or network request occurs

#### Scenario: Chooser opens card form
- **WHEN** a user activates `type your own cards` in the chooser opened from the Boxes page
- **THEN** the `CreateNewCard` modal appears with title `create a new flashcard`
