## Purpose

Lets users review and adjust an existing deck's name and icon in place on the dashboard through a pre-filled dialog, keeping all actions UI-only before backend wiring.

## ADDED Requirements

### Requirement: EditDeck form structure

The system SHALL provide an `EditDeck` modal dialog mirroring the `CreateNewDeck` form with a header titled `Edit deck`, a main section with a single `name` text field using the exact placeholder `type your deck name` pre-filled from the selected deck, an icon selection section backed by the deck icon selector with exactly one selected icon pre-selected to the deck's current icon, and a footer with `cancel` and `save` buttons.

#### Scenario: Header and pre-filled fields render

- **WHEN** `EditDeck` is rendered for a deck named `Japanese Basics` with icon `languages`
- **THEN** an `Edit deck` title, a text field labeled `name` with placeholder `type your deck name` containing `Japanese Basics`, a visible icon selector with `languages` selected, and `cancel` and `save` buttons are all visible

#### Scenario: Empty name is blocked

- **WHEN** a user clears `name` in `EditDeck` and attempts to submit
- **THEN** submission is blocked and the empty field is flagged

#### Scenario: Icon choice is part of form state

- **WHEN** a user selects a different icon in `EditDeck` and submits with a non-empty `name`
- **THEN** the submitted form state includes the currently selected icon alongside the entered name

#### Scenario: Switching decks re-initializes form state

- **WHEN** `EditDeck` is opened for a different deck while form state from a previous deck exists
- **THEN** the `name` field and selected icon reset to the newly selected deck's current values

### Requirement: EditDeck open and dismiss behavior

The system SHALL open `EditDeck` pre-filled with the selected deck's data when the user activates the `edit` item in a dashboard `DeckCard` options menu, and SHALL close the dialog when `cancel` or `save` is activated with no persistence, navigation, or network request and no stored data changes. Activating the menu or dialog SHALL NOT trigger deck navigation.

#### Scenario: Dashboard edit opens pre-filled dialog

- **WHEN** a user activates `edit` for a deck on `/app/dashboard`
- **THEN** the `EditDeck` dialog opens showing that deck's current `name` and `icon` values

#### Scenario: Cancel dismisses without changes

- **WHEN** a user activates `cancel` in an open `EditDeck`
- **THEN** the dialog is dismissed without persisting any input and no stored data changes

#### Scenario: Save closes with no side effects

- **WHEN** a user activates `save` in an open `EditDeck` with a non-empty `name`
- **THEN** the dialog closes with no persistence, navigation, or network request and no stored data changes

#### Scenario: Edit interaction does not navigate

- **WHEN** a user opens the `DeckCard` options menu and activates `edit` on `/app/dashboard`
- **THEN** the system stays on `/app/dashboard` and shows `EditDeck` instead of navigating to `/app/deck`
