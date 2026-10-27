# card-creation Specification

## Purpose

Lets users start card creation from a deck through a chooser modal and a creation form, keeping all actions UI-only before backend wiring.

## Requirements

### Requirement: ModalCard chooser layout

The system SHALL provide a `ModalCard` modal containing two action buttons labeled `type your own cards` and `import your cards` arranged in a flexbox column layout with the text `or` displayed between them.

#### Scenario: Chooser shows both options with separator

- **WHEN** `ModalCard` is rendered
- **THEN** a `type your own cards` button, an `or` text element, and an `import your cards` button appear stacked vertically top-to-bottom in that order

#### Scenario: Import option is UI-only placeholder

- **WHEN** a user activates `import your cards`
- **THEN** no navigation, mutation, or network request occurs in this change

### Requirement: CreateNewCard form structure

The system SHALL provide a `CreateNewCard` modal form with a header titled `create a new flashcard`, a main section with `question` (required), `answer` (required), `example` (optional), and `notes` (optional) text fields using those exact placeholders, and a footer with `cancel` and `save` buttons.

#### Scenario: Header and fields render

- **WHEN** `CreateNewCard` is rendered
- **THEN** a `create a new flashcard` title, text fields with placeholders `question`, `answer`, `example`, and `notes`, and `cancel` and `save` buttons are all visible

#### Scenario: Required fields are enforced

- **WHEN** a user attempts to submit `CreateNewCard` with empty `question` or empty `answer`
- **THEN** submission is blocked and the empty required field is flagged

#### Scenario: Optional fields accept empty values

- **WHEN** a user submits `CreateNewCard` with `question` and `answer` filled and `example` and `notes` empty
- **THEN** the form is accepted as valid at the UI level

#### Scenario: Cancel and save are UI-only placeholders

- **WHEN** a user activates `cancel` or `save`
- **THEN** no persistence, navigation, or network request occurs in this change and no stored data changes

### Requirement: Modal trigger chain

The system SHALL open `CreateNewCard` when the user activates `type your own cards` inside `ModalCard`, and SHALL close the topmost modal when `cancel` is activated.

#### Scenario: Typing option opens creation form

- **WHEN** a user activates `type your own cards` in an open `ModalCard`
- **THEN** the `CreateNewCard` modal appears with title `create a new flashcard`

#### Scenario: Cancel dismisses the form

- **WHEN** a user activates `cancel` in an open `CreateNewCard`
- **THEN** the creation form is dismissed without persisting any input

### Requirement: Card creation types and UI-only scope

The system SHALL reuse the `Flashcard` type from `src/types/types.ts` for the creation field contract (question, answer, example, note) and SHALL NOT perform data fetching, persistence, or auth from `ModalCard` or `CreateNewCard` in this change.

#### Scenario: Fields match Flashcard contract

- **WHEN** a developer inspects the `CreateNewCard` field model
- **THEN** its fields map to `Flashcard` question, answer, example, and note with note nullable

#### Scenario: No backend side effects

- **WHEN** a user opens either modal or activates any of its buttons
- **THEN** no network request is made and no stored data changes
