# Public Branding and README Design

## Goal

Present the repository as a generic, public-facing **OKR Management Platform** without company-specific branding, and help visitors understand the product quickly through an English README and representative screenshots.

## Scope

### Public branding

Replace user-visible occurrences of the existing company name with **OKR Management Platform** in:

- the browser title;
- the application sidebar;
- sign-in, registration, password recovery, and password reset screens;
- Chinese and English localization strings that contain the existing brand;
- authentication email templates for confirmation, invitation, recovery, magic-link, email-change, and reauthentication flows;
- tests that assert the previous user-visible brand.

Internal infrastructure identifiers, production domains, deployment paths, historical handover notes, package names, database objects, and business logic remain unchanged unless a user-visible string directly exposes the old brand.

### README

Rewrite `README.md` in English with this structure:

1. Product title and concise overview
2. Screenshot gallery
3. Key features
4. Technology stack
5. Local setup
6. Demo and Supabase modes
7. Security model
8. Verification commands
9. Deployment notes

The README will use **OKR Management Platform** and will not contain the company name. Existing user-guide links may remain because they point to useful documentation, while the README body stays English.

### Screenshots

Generate three screenshots from the local application running in `VITE_APP_MODE=demo` with the UI switched to English:

- Dashboard
- OKR Management
- Reports / Daily OKR

Store optimized PNG images in `docs/images/` and reference them with repository-relative Markdown paths. Screenshots must use only demo data and must not contain production accounts, private employee data, browser chrome, or development tooling.

## Implementation boundaries

- Do not change OKR workflows, authorization rules, database schema, Supabase configuration, production domains, or deployment topology.
- Do not capture screenshots from the production environment.
- Do not introduce a configurable branding system; this change uses one generic public brand.
- Keep the existing Chinese/English application language support. Only the README becomes English-only.

## Verification

- Search public-facing source files and email templates for remaining company-name occurrences.
- Run the relevant branding/authentication tests.
- Run the full test suite, typecheck, and production-neutral build.
- Inspect all three screenshots for English UI, generic branding, readable content, and absence of private data.
- Confirm `README.md` renders valid relative image links and contains no company name or Chinese prose.
- Review the final Git diff before committing and pushing to `origin/main`.

