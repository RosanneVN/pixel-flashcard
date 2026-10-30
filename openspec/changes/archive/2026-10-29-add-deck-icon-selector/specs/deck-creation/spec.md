## MODIFIED Requirements

### Requirement: CreateNewDeck form structure

The system SHALL provide a `CreateNewDeck` modal form with a header titled `Create a new deck`, a main section with a single `name` text field using the exact placeholder `type your deck name`, an icon selection section backed by the deck icon selector with 15 to 20 subject icons and exactly one selected icon at a time, and a footer with `cancel` and `save` buttons.

#### Scenario: Header and fields render

- **WHEN** `CreateNewDeck` is rendered
- **THEN** a `Create a new deck` title, a text field labeled `name` with placeholder `type your deck name`, a visible icon selector with a single pre-selected icon, and `cancel` and `save` buttons are all visible

#### Scenario: Empty name is blocked

- **WHEN** a user attempts to submit `CreateNewDeck` with an empty `name`
- **THEN** submission is blocked and the empty field is flagged

#### Scenario: Icon choice is part of form state

- **WHEN** a user selects a different icon in `CreateNewDeck` and submits with a non-empty `name`
- **THEN** the submitted form state includes the currently selected icon alongside the entered name

#### Scenario: Cancel and save are UI-only placeholders

- **WHEN** a user activates `cancel` or `save`
- **THEN** the modal closes with no persistence, navigation, or network request and no stored data changes
