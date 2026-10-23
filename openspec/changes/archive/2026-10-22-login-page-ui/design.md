# Design

## Context

`src/pages/login.astro` is empty; `src/layouts/Layout.astro` provides the HTML shell with `global.css` (brand tokens: cream `#f5e9d0` background, brown `#3e2723` text, rose `#da6c81` primary). The 8bitcn components (`src/components/ui/8bit/` `Card`, `Input`, `Button`) are stateless React with no hooks, so Astro renders them to static HTML with no `client:*` hydration. See proposal.md Why. Illustration source: placeholder image service (user-confirmed).

## Goals / Non-Goals

**Goals:**

- Pixel-art form using 8bitcn `Card`/`Input`/`Button`, statically rendered with zero JS shipped for this page.
- Accessible basics: `label`s (visually associated), `alt` text, `type="password"`, `autocomplete` hints.

**Non-Goals:**

- Auth, validation, error states, session handling, redirects.
- `client:*` hydration of the form (nothing interactive justifies it).
- Responsive variants beyond a centered max-width column.

## Decisions

- **8bitcn `Card`/`Input`/`Button` statically rendered from Astro, no `client:*` directive.** Rationale: components are stateless, so server-rendered HTML carries the full pixel-art styling with zero JS. Alternative (plain Astro markup) rejected — user directed 8-bit components for the pixel-flashcard look.
- **Styling from the 8-bit components (pixel borders, `retro` font default) rather than raw token utilities.** Rationale: single source for the pixel look; tokens still flow through via theme vars. Alternative (shadcn base `ui/*` look) rejected — plain styling contradicts the app's pixel identity.
- **Placeholder illustration via picsum.photos with fixed seed (`https://picsum.photos/seed/pixel-login/320/200`), explicit `width`/`height`, `loading="eager"`.** Rationale: deterministic image avoids layout shift and random-content surprises. Alternative (local `public/` asset) deferred — user chose service; swapping to a local file later is a one-line `src` change.
- **`<form>` without `action`/`method` + `type="button"` on Login (or `onSubmit` prevented).** Rationale: satisfies UI-only requirement; no accidental GET submission. Alternative (`action="/api/..."`) rejected — no backend exists.

## Risks / Trade-offs

- [Risk] Hotlinked illustration fails offline or service changes content → Mitigation: meaningful `alt` text; one-line swap to local asset later.
- [Risk] `type="button"` may confuse future auth wiring → Mitigation: tasks note the follow-up change (`login-auth`) will convert to real submission.
