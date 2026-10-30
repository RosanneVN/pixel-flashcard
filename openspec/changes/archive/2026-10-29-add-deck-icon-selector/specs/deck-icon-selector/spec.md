## Purpose

Provides a reusable single-select subject icon picker rendered as a fixed-size card with horizontal scrolling for use during deck creation.

## ADDED Requirements

### Requirement: Selector card layout with horizontal scroll

The system SHALL provide an icon selector rendered as a card with a fixed size that scrolls horizontally to reveal all available subject icons.

#### Scenario: All icons reachable by horizontal scroll

- **WHEN** the selector is rendered with its full icon set
- **THEN** a fixed-size card container is visible and overflow icons are reachable via horizontal scrolling without vertical expansion

#### Scenario: Fixed size is preserved

- **WHEN** the selector renders on the dashboard deck-creation flow
- **THEN** the card keeps constant width and height regardless of scroll position or selection

### Requirement: Single-select subject icon set

The system SHALL offer 15 to 20 distinct subject icons and SHALL maintain exactly one selected icon at a time with a clearly visible selected state.

#### Scenario: User selects an icon

- **WHEN** a user activates an unselected icon in the selector
- **THEN** that icon becomes the sole selected icon and its selected visual state is distinguishable from unselected icons

#### Scenario: Selection change replaces previous selection

- **WHEN** a user activates a different icon after one is already selected
- **THEN** the previous selection clears and only the newly activated icon is selected

#### Scenario: Default selection exists

- **WHEN** the selector first renders with no prior choice
- **THEN** exactly one icon is pre-selected so the form always has a valid icon value

### Requirement: Keyboard and assistive-technology access

The system SHALL make every icon option focusable and activatable by keyboard and SHALL expose selection state to assistive technology.

#### Scenario: Keyboard selection

- **WHEN** a keyboard user tabs to an icon option and activates it with Enter or Space
- **THEN** that icon becomes the selected icon, identical to pointer activation

#### Scenario: Selection state is announced

- **WHEN** an assistive technology inspects the icon options
- **THEN** each option exposes its name and whether it is currently selected
