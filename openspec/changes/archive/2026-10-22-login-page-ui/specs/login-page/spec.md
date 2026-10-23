# Spec Delta

## Purpose

Presents the login entry point of pixel-flashcard as a simple centered form so users can identify themselves once auth is wired.

## ADDED Requirements

### Requirement: Login page shows illustration

The system SHALL display an illustration image at the top of the login page with descriptive alternative text.

#### Scenario: Illustration renders with alt text

- **WHEN** a user visits `/login`
- **THEN** an image is shown above the form fields with a meaningful `alt` attribute

### Requirement: Username input

The system SHALL provide a text input on the login page with the placeholder `type your user name`.

#### Scenario: Username field present

- **WHEN** a user visits `/login`
- **THEN** a text input with placeholder `type your user name` is shown

### Requirement: Password input

The system SHALL provide a password input on the login page with the placeholder `type your password` that masks entered characters.

#### Scenario: Password field masks input

- **WHEN** a user types in the password field
- **THEN** the characters are masked and the placeholder reads `type your password`

### Requirement: Login button

The system SHALL provide a `Login` button on the login page.

#### Scenario: Login button present

- **WHEN** a user visits `/login`
- **THEN** a button labeled `Login` is shown below the inputs

### Requirement: Column layout

The system SHALL stack the illustration, inputs, and button vertically in a single column flex layout, centered on the page.

#### Scenario: Elements stack vertically

- **WHEN** a user visits `/login` at mobile or desktop width
- **THEN** illustration, username input, password input, and button appear top-to-bottom in one centered column

### Requirement: 8-bit pixel styling

The system SHALL render the login form (card container, inputs, button) with 8-bit pixel-art styling: pixel borders and retro type.

#### Scenario: Pixel-art controls visible

- **WHEN** a user visits `/login`
- **THEN** the card, both inputs, and the button display pixel-art borders with retro styling

### Requirement: UI-only behavior

The system SHALL NOT submit credentials or contact any backend from the login page in this change; the form is visual only.

#### Scenario: No submission side effects

- **WHEN** a user activates the `Login` button
- **THEN** no network request is made and no session is created
