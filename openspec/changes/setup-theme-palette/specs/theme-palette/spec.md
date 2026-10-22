# Spec Delta

## Purpose

Defines the brand color roles for the pixel-flashcard UI so every surface, component, and theme resolves to the approved palette.

## ADDED Requirements

### Requirement: Primary brand color role

The system SHALL expose primary `#da6c81` as the `--primary` token so primary buttons, active states, and highlights render in brand rose.

#### Scenario: Primary utility resolves to brand rose

- **WHEN** a component uses the `bg-primary` or `text-primary` utility
- **THEN** the rendered color is `#da6c81` (or its theme-consistent equivalent)

#### Scenario: Primary foreground stays readable

- **WHEN** text renders on a primary background via `text-primary-foreground`
- **THEN** the foreground color contrasts legibly against `#da6c81`

### Requirement: Background color role

The system SHALL render the app background in secondary cream `#f5e9d0` via the `--background` and `--secondary` tokens.

#### Scenario: Page background is cream

- **WHEN** any page renders with `bg-background`
- **THEN** the page background is `#f5e9d0`

#### Scenario: Secondary surfaces use cream

- **WHEN** a component uses `bg-secondary` or `bg-muted` where muted maps to the cream scale
- **THEN** the surface renders in a cream-consistent tone derived from `#f5e9d0`

### Requirement: Tertiary accent color role

The system SHALL expose tertiary `#bf2b54` as the `--accent` (and `--destructive`-adjacent emphasis where appropriate) token for strong emphasis, destructive, and tertiary actions.

#### Scenario: Accent utility resolves to crimson

- **WHEN** a component uses `bg-accent` or equivalent tertiary styling
- **THEN** the rendered color is `#bf2b54` (or its theme-consistent equivalent)

### Requirement: Text color role

The system SHALL render default text in `#3e2723` via the `--foreground` token.

#### Scenario: Body text is brown

- **WHEN** body copy renders with `text-foreground`
- **THEN** the text color is `#3e2723`

#### Scenario: Text on cream meets contrast

- **WHEN** default text `#3e2723` renders on cream background `#f5e9d0`
- **THEN** the pair meets WCAG AA for normal text

### Requirement: Dark theme stays brand-coherent

The system SHALL provide a `.dark` token set using the same four brand hues (adjusted only for dark-surface legibility), so theme switching never reverts to neutral grays.

#### Scenario: Dark mode keeps brand hues

- **WHEN** the `.dark` class is active
- **THEN** background, primary, accent, and foreground tokens derive from `#f5e9d0`, `#da6c81`, `#bf2b54`, `#3e2723` families rather than neutral gray
