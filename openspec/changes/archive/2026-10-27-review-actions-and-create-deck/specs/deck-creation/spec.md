## Purpose

Lets users create a new deck collection from the dashboard through a simple name form, keeping the action UI-only before backend wiring.

## ADDED Requirements

### Requirement: CreateNewDeck form structure
The system SHALL provide a `CreateNewDeck` modal form with a header titled `Create a new deck`, a main section with a single `name` text field using the exact placeholder `type your deck name`, and a footer with `cancel` and `save` buttons.

#### Scenario: Header and fields render
- **WHEN** `CreateNewDeck` is rendered
- **THEN** a `Create a new deck` title, a text field labeled `name` with placeholder `type your deck name`, and `cancel` and `save` buttons are all visible

#### Scenario: Empty name is blocked
- **WHEN** a user attempts to submit `CreateNewDeck` with an empty `name`
- **THEN** submission is blocked and the empty field is flagged

#### Scenario: Cancel and save are UI-only placeholders
- **WHEN** a user activates `cancel` or `save`
- **THEN** the modal closes with no persistence, navigation, or network request and no stored data changes

### Requirement: CreateNewDeck trigger
The system SHALL open the `CreateNewDeck` modal when the user activates the `create new deck` button on the dashboard page, and SHALL close the modal when `cancel` is activated.

#### Scenario: Dashboard button opens deck form
- **WHEN** a user activates `create new deck` on `/app/dashboard`
- **THEN** the `CreateNewDeck` modal appears with title `Create a new deck`

#### Scenario: Cancel dismisses the form
- **WHEN** a user activates `cancel` in an open `CreateNewDeck`
- **THEN** the creation form is dismissed without persisting any input
