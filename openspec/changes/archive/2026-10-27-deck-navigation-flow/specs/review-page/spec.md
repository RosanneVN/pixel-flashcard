## MODIFIED Requirements

### Requirement: UI-only scope
The system SHALL NOT perform data fetching, persistence, or auth from the Review page or `Flashcard` in this change; all content comes from local mock data and flip, grading, and progress state are ephemeral, except for client-side navigation via the shared back header.

#### Scenario: No backend side effects
- **WHEN** a user views the Review page or activates `reverse` or any grading button on any Flashcard
- **THEN** no network request is made and no stored data changes

#### Scenario: Header navigation has no backend effects
- **WHEN** a user activates the Review page `back` header button
- **THEN** only a client-side route change occurs with no network request and no stored data change

## ADDED Requirements

### Requirement: Review page top navigation header
The system SHALL render the shared back navigation header at the top of the Review page.

#### Scenario: Review page shows back header
- **WHEN** a user visits `/app/review`
- **THEN** a top header with a `back` arrow button is visible above the review content
