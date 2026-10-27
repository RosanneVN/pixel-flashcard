# deck-detail-page Specification

## Purpose

Presents a single deck's cards in a browsable UI-only detail view with study and card-creation entry points, so users can scan per-deck contents before backend wiring.

## Requirements

### Requirement: Deck detail route resolves deck by id

The system SHALL provide a dynamic route at `src/pages/app/deck/[id].astro` that resolves the `id` param against the mock deck array and renders that deck's detail view.

#### Scenario: Known id renders matching deck

- **WHEN** a user visits `/app/deck/deck-japanese-basics`
- **THEN** the page renders the detail view for the deck whose `id` equals `deck-japanese-basics`

#### Scenario: Unknown id shows not-found state

- **WHEN** a user visits `/app/deck/` with an `id` matching no mock deck
- **THEN** the page shows a not-found message including the requested `id` and renders no card list

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

### Requirement: Card list stacks vertically from mock data

The system SHALL render the main section as a vertically stacked list with one row per entry in `mockFlashcards` from `src/mocks/flashcards.ts`, importing and rendering one `FlashcardItem` per card in mock-data order.

#### Scenario: List matches mock entries in order

- **WHEN** `mockFlashcards` contains 4 entries
- **THEN** exactly 4 `FlashcardItem` rows appear top-to-bottom in mock-data order

#### Scenario: Empty mock list shows empty state

- **WHEN** the card mock array is empty
- **THEN** the list section shows an empty-state message instead of card rows

### Requirement: FlashcardItem content

The system SHALL provide a reusable `FlashcardItem` component that displays for each card its `question` text and a kebab (3-dots, `MoreVertical`) menu button.

#### Scenario: Item shows question and kebab

- **WHEN** a `FlashcardItem` is rendered with mock card data
- **THEN** its question text and kebab menu button are both visible

#### Scenario: Question text matches card data

- **WHEN** a `FlashcardItem` is rendered for a card with question `猫`
- **THEN** the text `猫` appears in the item

### Requirement: FlashcardItem kebab menu

The system SHALL open a popover from the `FlashcardItem` kebab button showing `edit` and `delete` menu items.

#### Scenario: Popover opens with edit and delete

- **WHEN** a user activates the kebab button on a `FlashcardItem`
- **THEN** a popover appears containing an `edit` item and a `delete` item

#### Scenario: Menu items are UI-only placeholders

- **WHEN** a user activates `edit` or `delete` in the `FlashcardItem` popover
- **THEN** no rename, deletion, navigation, or network request occurs in this change

### Requirement: Types and UI-only scope

The system SHALL reuse the `Deck` and `Flashcard` types from `src/types/types.ts` and `mockFlashcards` from `src/mocks/flashcards.ts`, and SHALL NOT perform data fetching, persistence, or auth from the detail page or `FlashcardItem` in this change; client-side navigation from `study all` and the shared back header is allowed.

#### Scenario: Types type-check

- **WHEN** a developer imports `Deck` and `Flashcard` from `src/types/types.ts` in the new page and component
- **THEN** the code type-checks with no new type definitions duplicating those contracts

#### Scenario: No backend side effects

- **WHEN** a user views the detail page or opens any `FlashcardItem` popover
- **THEN** no network request is made and no stored data changes

### Requirement: Deck detail top navigation header

The system SHALL render the shared back navigation header at the top of the deck detail page.

#### Scenario: Detail page shows back header

- **WHEN** a user visits `/app/deck/[id]` for a known deck id
- **THEN** a top header with a `back` arrow button is visible above the detail content
