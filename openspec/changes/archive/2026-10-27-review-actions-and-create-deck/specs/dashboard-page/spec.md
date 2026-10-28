## ADDED Requirements

### Requirement: Create new deck entry on dashboard
The system SHALL open the `CreateNewDeck` modal when the user activates the `create new deck` button on the dashboard page.

#### Scenario: Dashboard button opens deck form
- **WHEN** a user activates `create new deck` on `/app/dashboard`
- **THEN** the `CreateNewDeck` modal appears with title `Create a new deck`

#### Scenario: Modal closes without side effects
- **WHEN** a user activates `cancel` or `save` in the open `CreateNewDeck` modal
- **THEN** the modal closes with no persistence, navigation, or network request and no stored data changes
