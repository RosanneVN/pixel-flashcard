## MODIFIED Requirements

### Requirement: Login button
The system SHALL provide a `Login` button on the login page that navigates to `/app/dashboard` when activated.

#### Scenario: Login button navigates to dashboard
- **WHEN** a user activates the `Login` button on `/login`
- **THEN** the system navigates to `/app/dashboard`

#### Scenario: Login button present
- **WHEN** a user visits `/login`
- **THEN** a button labeled `Login` is shown below the inputs

### Requirement: UI-only behavior
The system SHALL NOT submit credentials, create a session, or contact any backend from the login page in this change; the form is visual only except for client-side navigation to `/app/dashboard`.

#### Scenario: No submission side effects
- **WHEN** a user activates the `Login` button
- **THEN** no network request is made, no session is created, and the user lands on `/app/dashboard`
