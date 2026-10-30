## MODIFIED Requirements

### Requirement: FlashcardItem kebab menu

The system SHALL open a popover from the `FlashcardItem` kebab button showing `edit` and `delete` menu items, SHALL open the `EditCard` dialog pre-filled with that card's data when `edit` is activated, and SHALL treat `delete` as a UI-only placeholder.

#### Scenario: Popover opens with edit and delete

- **WHEN** a user activates the kebab button on a `FlashcardItem`
- **THEN** a popover appears containing an `edit` item and a `delete` item

#### Scenario: Edit opens the edit dialog

- **WHEN** a user activates `edit` in the `FlashcardItem` popover
- **THEN** the `EditCard` dialog opens pre-filled with that card's data instead of navigating away or mutating data

#### Scenario: Delete item is a UI-only placeholder

- **WHEN** a user activates `delete` in the `FlashcardItem` popover
- **THEN** no deletion, navigation, or network request occurs in this change
