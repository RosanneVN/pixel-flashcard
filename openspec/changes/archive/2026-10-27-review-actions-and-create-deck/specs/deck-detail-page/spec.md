## MODIFIED Requirements

### Requirement: Detail header shows deck title and actions
The system SHALL render a header containing an `h1` with text `deck: <deck_name>` followed by a single action button labeled `study all`.

#### Scenario: Title shows deck name
- **WHEN** a user views the detail page for a deck named `Japanese Basics`
- **THEN** an `h1` with text `deck: Japanese Basics` is visible in the header

#### Scenario: Study all action present
- **WHEN** a user views the detail header
- **THEN** a `study all` button is visible below the title

#### Scenario: Study all navigates to review
- **WHEN** a user activates `study all` on `/app/deck/[id]`
- **THEN** the system navigates to `/app/review`

#### Scenario: No card creation on detail page
- **WHEN** a user views the deck detail page
- **THEN** no `create new card` button is shown in the detail header
