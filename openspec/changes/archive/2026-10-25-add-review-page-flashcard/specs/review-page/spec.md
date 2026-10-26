## Purpose

Presents the user's due flashcards in a browsable UI-only Review Page with a reusable two-sided Flashcard, so users can scan questions and flip to answers before backend wiring.

## ADDED Requirements

### Requirement: Review page renders flashcard list

The system SHALL render the Review page (`src/pages/app/review.astro`) as a list of flashcards sourced from the local flashcard mock array, in mock-data order.

#### Scenario: List matches mock entries
- **WHEN** the mock array contains N flashcards
- **THEN** exactly N Flashcard items appear on the Review page in the same order

#### Scenario: Empty mock list shows empty state
- **WHEN** the mock flashcard array is empty
- **THEN** the list block shows an empty-state message instead of flashcards

### Requirement: Flashcard front side content

The system SHALL display the Flashcard front side with a header badge in the top-left corner showing `production` or `recognition`, a body card containing a `question` label and the question text, and a footer action button labeled `reverse`.

#### Scenario: Front shows badge, question, and reverse action
- **WHEN** a Flashcard is rendered front-side up with mock data
- **THEN** its type badge, `question` label, question text, and `reverse` button are all visible

#### Scenario: Front badge reflects card type
- **WHEN** a Flashcard has type `production` or `recognition`
- **THEN** the front header badge text matches that type

### Requirement: Flashcard back side content

The system SHALL display the Flashcard back side with a header badge in the top-left corner showing `production` or `recognition`, a body card containing labeled `answer` and `example` fields plus a labeled `note` field that is omitted when null, and a footer with 5 grading buttons.

#### Scenario: Back shows badge, answer, and example
- **WHEN** a Flashcard is rendered back-side up
- **THEN** its type badge, `answer` label with answer text, and `example` label with example text are all visible

#### Scenario: Back badge reflects card type
- **WHEN** a Flashcard has type `production` or `recognition`
- **THEN** the back header badge text matches that type

#### Scenario: Note renders when present
- **WHEN** a Flashcard has a non-null note
- **THEN** the back side shows a `note` label with the note text

#### Scenario: Note omitted when null
- **WHEN** a Flashcard has a null note
- **THEN** no `note` label or note block is rendered on the back side

#### Scenario: Back footer shows five grading buttons
- **WHEN** a Flashcard is rendered back-side up
- **THEN** its footer shows exactly 5 grading buttons in purple, red, yellow, green, and blue order with subtext `not at all` below the purple button and subtext `easy` below the blue button

### Requirement: Reverse flip interaction

The system SHALL toggle the Flashcard from front side to back side when the user activates the `reverse` button, as a client-side UI state change with no persistence.

#### Scenario: Reverse shows back side
- **WHEN** a user activates `reverse` on a front-side Flashcard
- **THEN** that card displays its back side content instead of the front side content

### Requirement: Review progress header

The system SHALL display a progress header on the Review page showing the reviewed count (e.g. `X of N reviewed`) and a proportion bar reflecting reviewed divided by total.

#### Scenario: Progress reflects reviewed count
- **WHEN** a user has reviewed R of N cards
- **THEN** the header shows `R of N reviewed` and the bar fill proportion corresponds to R divided by N (0 when nothing reviewed, full when all reviewed)

#### Scenario: Progress starts at zero
- **WHEN** a user opens the Review page with no cards graded yet
- **THEN** the header shows `0 of N reviewed` with an empty bar

### Requirement: Grading advances to next card

The system SHALL advance to the next card's front side when the user activates any of the 5 back-side grading buttons, marking the current card reviewed as an ephemeral client-side state change with no persistence.

#### Scenario: Grading shows next card front
- **WHEN** a user activates any grading button on the current back-side card
- **THEN** the reviewed count increments by one and the next card in mock-data order displays its front side content

#### Scenario: Grading last card completes session
- **WHEN** a user activates a grading button on the final card
- **THEN** the reviewed count equals the total and the progress header shows full completion

### Requirement: Flashcard types and mock data

The system SHALL define shared flashcard types in `src/types/types.ts` covering card identity, type (`production` | `recognition`), question, answer, example, and nullable note, plus an exported mock flashcard array with entries spanning both badge types and both note states.

#### Scenario: Types cover flashcard contract
- **WHEN** a developer imports flashcard types from `src/types/types.ts`
- **THEN** a `Flashcard` type with id, type, question, answer, example, and nullable note, plus a mock flashcard array, are available and type-check

#### Scenario: Mock data spans badge and note states
- **WHEN** a developer inspects the mock flashcard array
- **THEN** it contains at least one `production` card, one `recognition` card, one card with a note, and one card with a null note

### Requirement: UI-only scope

The system SHALL NOT perform data fetching, persistence, routing, or auth from the Review page or `Flashcard` in this change; all content comes from local mock data and flip, grading, and progress state are ephemeral.

#### Scenario: No backend side effects
- **WHEN** a user views the Review page or activates `reverse` or any grading button on any Flashcard
- **THEN** no network request is made and no stored data changes
