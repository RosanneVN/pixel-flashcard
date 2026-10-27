## Purpose

Provides a single reusable top navigation header with a back arrow button so users move back through login, dashboard, deck, deck detail, and review pages.

## ADDED Requirements

### Requirement: Shared back header layout
The system SHALL provide a shared navigation header containing a `back` arrow button aligned to the leading edge.

#### Scenario: Header shows back button
- **WHEN** the shared header is rendered on any app page
- **THEN** a `back` button is visible at the leading edge

#### Scenario: Back button has accessible name
- **WHEN** a screen reader or test queries the header button
- **THEN** the button exposes the accessible name `back`

### Requirement: Linear back flow order
The system SHALL map `back` targets to the reverse linear flow `review (/app/review)` → `deck detail (/app/deck/[id])` → `deck Boxes (/app/deck)` → `dashboard (/app/dashboard)` → `login (/login)`.

#### Scenario: Back returns one step back
- **WHEN** a user activates `back` on dashboard, deck, deck detail, or review
- **THEN** the system navigates to the previous route in the linear flow order

#### Scenario: Detail back preserves context
- **WHEN** a user is on `/app/deck/[id]` for deck `abc` and activates `back`
- **THEN** `back` navigates to `/app/deck`

### Requirement: Flow edge behavior
The system SHALL hide `back` on the first flow page, with no wrap-around navigation.

#### Scenario: No wrap around at edges
- **WHEN** a user is on `/login`
- **THEN** no back action loops to the opposite end of the flow

### Requirement: Keyboard and visual consistency
The system SHALL render the shared header with 8-bit pixel styling consistent with the app theme and make the back arrow button keyboard-focusable and activatable.

#### Scenario: Header button keyboard operable
- **WHEN** a keyboard user tabs to `back` and presses Enter or Space
- **THEN** the same navigation occurs as pointer activation
