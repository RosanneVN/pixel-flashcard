## MODIFIED Requirements

### Requirement: Detail header shows deck title and actions

The system SHALL render a header containing an `h1` with text `deck: <deck_name>` followed by two action buttons labeled `study all` and `create new card` displayed side by side.

#### Scenario: Title shows deck name

- **WHEN** a user views the detail page for a deck named `Japanese Basics`
- **THEN** an `h1` with text `deck: Japanese Basics` is visible in the header

#### Scenario: Action buttons sit side by side

- **WHEN** a user views the detail header
- **THEN** a `study all` button and a `create new card` button appear in the same row (side by side)

#### Scenario: Create new card opens chooser modal

- **WHEN** a user activates `create new card` on the deck detail page
- **THEN** the `ModalCard` chooser modal opens and no navigation, mutation, or network request occurs in this change

#### Scenario: Action buttons are UI-only placeholders

- **WHEN** a user activates `study all` or `create new card`
- **THEN** no navigation, mutation, or network request occurs in this change

#### Scenario: Study all remains a UI-only placeholder

- **WHEN** a user activates `study all`
- **THEN** no navigation, mutation, or network request occurs in this change
