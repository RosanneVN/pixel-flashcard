## MODIFIED Requirements

### Requirement: Modal trigger chain
The system SHALL open `CreateNewCard` when the user activates `type your own cards` inside `ModalCard`, and SHALL close the topmost modal when `cancel` is activated. The `ModalCard` chooser is entered from the `create new card` button on the Deck Boxes page (`src/pages/app/deck.astro`).

#### Scenario: Boxes entry opens chooser
- **WHEN** a user activates `create new card` on `/app/deck`
- **THEN** the `ModalCard` chooser modal opens

#### Scenario: Typing option opens creation form
- **WHEN** a user activates `type your own cards` in an open `ModalCard`
- **THEN** the `CreateNewCard` modal appears with title `create a new flashcard`

#### Scenario: Cancel dismisses the form
- **WHEN** a user activates `cancel` in an open `CreateNewCard`
- **THEN** the creation form is dismissed without persisting any input
