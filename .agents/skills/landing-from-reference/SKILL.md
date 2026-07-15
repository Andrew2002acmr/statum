---
name: landing-from-reference
description: Create or refine a commercial landing page from an incomplete visual reference such as a JPG, PNG, screenshot, generated mockup, or partial design. Use when Codex must turn an approximate landing reference into an Astro/TypeScript implementation, improve an existing landing based on reference materials, or plan/verify landing sections, components, design tokens, assets, forms, and responsive behavior without treating the reference as pixel-perfect.
---

# Landing From Reference

Use this skill for commercial landing pages based on incomplete visual references: JPG, PNG, screenshots, generated mockups, extracted icons, partial layouts, or approximate design images.

## Before Implementation

Read these project files before writing code:

- `AGENTS.md`
- `docs/SPEC.md`
- `docs/TECH-STACK.md`
- `docs/DESIGN-AUDIT.md`
- `docs/IMPLEMENTATION-PLAN.md`
- `docs/OPEN-QUESTIONS.md`
- `docs/DECISIONS.md`

Study these project materials:

- `design/statum-design.jpg`
- Existing images in `design/`
- Existing icons in `design/icons/`
- Existing logo files, if present
- Current project structure

If this skill is being created or updated as an artifact, do not start landing implementation unless the user separately asks for implementation.

## Reference Handling Rules

Treat JPG/PNG/screenshot references as approximate direction, not exact production designs.

Do not:

- Copy damaged, unreadable, or generated text.
- Copy generated artifacts.
- Crop low-quality image fragments out of the reference for production use.
- Invent business information, contacts, reviews, prices, guarantees, legal data, metrics, or service terms.
- Use unknown values as facts.

Text, numbers, testimonials, guarantees, prices, and contacts visible only in a generated JPG are not approved content. Use them only after they are confirmed in `docs/SPEC.md` or another approved project document.

Mark unknown values as `TBD`.

Prefer preserving the reference's intent: section order, hierarchy, tone, visual rhythm, conversion path, and useful interaction patterns.

## Planning Output Before Code

Before the first implementation task, prepare the full implementation map and save it to `docs/IMPLEMENTATION-MAP.md`.

Include:

- Section map.
- Component map.
- Repeated element list.
- Design token list.
- Required image list with expected aspect ratios.
- Assumptions and deviations from the reference.

For later small tasks, do not recreate the map from scratch. Update `docs/IMPLEMENTATION-MAP.md` only when the task substantially changes page structure, components, assets, or assumptions.

Use the map to keep implementation incremental and auditable.

## Implementation Order

Implement the page in stages:

1. Base structure and layout.
2. Header and first screen.
3. Informational sections.
4. Services.
5. Projects or portfolio.
6. Testimonials.
7. Forms.
8. Footer.
9. Final polish.

After each meaningful stage, verify the affected area before continuing.

## Approved Stack

Use the approved project stack:

- Astro.
- TypeScript strict.
- Astro Components.
- Tailwind CSS.
- CSS custom properties.
- Lucide.
- Astro Actions.
- Zod.
- Playwright.

Do not add React, Next.js, a ready-made UI library, a separate backend, a database, or extra production dependencies without prior user approval.

## Images And Assets

Local image placeholders are allowed in the first implementation stage.

Placeholders must:

- Preserve the expected aspect ratio of future real materials.
- Avoid making content depend on temporary image dimensions.
- Be replaceable without changing component structure.

When original images become available, use Astro Image/Picture where appropriate and specify image dimensions to prevent layout shift.

Use Lucide as the single icon library. Store logo and unique graphics as separate SVG files. Do not mix multiple icon libraries or extracted generated icons in production UI.

## Form Rules

Use Astro Actions and Zod for the request form.

Provide:

- `loading`, `success`, and `error` states.
- Server-side validation.
- Honeypot protection.
- A path for Cloudflare Turnstile integration.
- Clear handling for `TBD` delivery method: email, Telegram, or CRM.

Until the request delivery method is approved, implement the form interface, validation, and error states only. Do not imitate successful submission.

Any development mock must be clearly labeled and must not work in production.

## Verification Loop

After each meaningful implementation stage:

- Run the project.
- Use scripts defined in `package.json`; do not assume commands exist under arbitrary names.
- Run `npm run check`.
- Run `npm run lint`.
- Run `npm run format:check`.
- Run `npm run test:e2e` when end-to-end tests exist for the affected behavior.
- Open the page in a browser.
- Inspect affected sections.
- Fix discovered issues before continuing.

If the project is not initialized yet, ensure these scripts are created during setup.

Check responsive behavior at exact viewport sizes:

- 1440x900
- 1024x768
- 768x1024
- 390x844

Verify:

- No horizontal scroll.
- No element overlap.
- Text readability.
- Correct heading hierarchy.
- Keyboard accessibility.
- Form states.
- Rendering without required animations.

Do not claim visual QA unless the running page was actually opened in a browser.

When Playwright is available:

- Capture full-page screenshots for the checked viewports.
- Check browser console errors.
- Programmatically check horizontal overflow.

## Final Response

After completing an implementation or refinement task, report:

- Changed files.
- Implemented sections.
- Verification commands run.
- Checked viewports.
- Assumptions made.
- Remaining `TBD` items.
- Deviations from the reference.

If a required verification step cannot be run, state why and describe the residual risk.
