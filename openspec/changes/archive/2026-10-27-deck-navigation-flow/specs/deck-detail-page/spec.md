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
- **WHEN** a user activates `create new card`
- **THEN** no navigation, mutation, or network request occurs in this change

#### Scenario: Study all navigates to review
- **WHEN** a user activates `study all` on `/app/deck/[id]`
- **THEN** the system navigates to `/app/review`

### Requirement: Types and UI-only scope
The system SHALL reuse the `Deck` and `Flashcard` types from `src/types/types.ts` and `mockFlashcards` from `src/mocks/flashcards.ts`, and SHALL NOT perform data fetching, persistence, or auth from the detail page or `FlashcardItem` in this change; client-side navigation from `study all` and the shared back header is allowed.

#### Scenario: Types type-check
- **WHEN** a developer imports `Deck` and `Flashcard` from `src/types/types.ts` in the new page and component
- **THEN** the code type-checks with no new type definitions duplicating those contracts

#### Scenario: No backend side effects
- **WHEN** a user views the detail page or opens any `FlashcardItem` popover
- **THEN** no network request is made and no stored data changes

## ADDED Requirements

### Requirement: Deck detail top navigation header
The system SHALL render the shared back navigation header at the top of the deck detail page.

#### Scenario: Detail page shows back header
- **WHEN** a user visits `/app/deck/[id]` for a known deck id
- **THEN** a top header with a `back` arrow button is visible above the detail content
