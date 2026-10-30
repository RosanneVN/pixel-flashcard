## Purpose

Lets users review and adjust an existing flashcard's content in place on the deck detail page through a pre-filled dialog, keeping all actions UI-only before backend wiring.

## ADDED Requirements

### Requirement: EditCard form structure

The system SHALL provide an `EditCard` modal dialog mirroring the `CreateNewCard` form with a header, a main section with `question` (required), `answer` (required), `example` (optional), and `notes` (optional) text fields using those exact placeholders, pre-filled from the selected card, and a footer with `cancel` and `save` buttons.

#### Scenario: Header and pre-filled fields render

- **WHEN** `EditCard` is rendered for a card with question `猫`
- **THEN** a dialog title, text fields with placeholders `question`, `answer`, `example`, and `notes` pre-filled from that card, and `cancel` and `save` buttons are all visible

#### Scenario: Required fields are enforced

- **WHEN** a user clears `question` or `answer` in `EditCard` and attempts to submit
- **THEN** submission is blocked and the empty required field is flagged

#### Scenario: Optional fields accept empty values

- **WHEN** a user submits `EditCard` with `question` and `answer` filled and `example` and `notes` empty
- **THEN** the form is accepted as valid at the UI level

### Requirement: EditCard open and dismiss behavior

The system SHALL open `EditCard` pre-filled with the selected card's data when the user activates `edit` on the deck detail page, and SHALL close the dialog when `cancel` or `save` is activated with no persistence, navigation, or network request and no stored data changes.

#### Scenario: Edit opens pre-filled dialog

- **WHEN** a user activates `edit` for a card on `/app/deck/[id]`
- **THEN** the `EditCard` dialog opens showing that card's current `question`, `answer`, `example`, and `notes` values

#### Scenario: Cancel dismisses without changes

- **WHEN** a user activates `cancel` in an open `EditCard`
- **THEN** the dialog is dismissed without persisting any input and no stored data changes

#### Scenario: Save closes with no side effects

- **WHEN** a user activates `save` in an open `EditCard`
- **THEN** the dialog closes with no persistence, navigation, or network request and no stored data changes
