# Public Branding and README Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace company-specific user-facing branding with “OKR Management Platform,” publish an English README, and add three English demo screenshots.

**Architecture:** Keep the application architecture and deployment configuration unchanged. Update only user-visible brand strings and their assertions, then run the existing Vite app in demo mode to capture repository-owned documentation images before rewriting the README around those assets.

**Tech Stack:** React, TypeScript, Vite, Vitest, static HTML email templates, Playwright CLI, Markdown.

## Global Constraints

- The public brand is exactly **OKR Management Platform**.
- Keep Chinese/English application localization; only `README.md` becomes English-only.
- Do not change OKR workflows, authorization, database schema, Supabase configuration, production domains, package names, or deployment topology.
- Screenshots must come from local `VITE_APP_MODE=demo`, use the English UI, and contain no production accounts or private data.
- Do not introduce a configurable branding system.

---

### Task 1: Replace user-visible company branding

**Files:**
- Modify: `index.html`
- Modify: `src/layout/Sidebar.tsx`
- Modify: `src/auth/LoginForm.tsx`
- Modify: `src/auth/RegisterForm.tsx`
- Modify: `src/auth/ForgotPassword.tsx`
- Modify: `src/auth/ResetPassword.tsx`
- Modify: `src/i18n/messages.ts`
- Modify: `public/email/confirmation.html`
- Modify: `public/email/invite.html`
- Modify: `public/email/recovery.html`
- Modify: `public/email/magic-link.html`
- Modify: `public/email/email-change.html`
- Modify: `public/email/reauthentication.html`
- Test: `src/app/App.test.tsx`
- Test: `src/auth/SupabaseAuthProvider.test.tsx`

**Interfaces:**
- Consumes: existing static strings and localization keys.
- Produces: the exact public label `OKR Management Platform` everywhere the old company brand was user-visible.

- [ ] **Step 1: Update branding assertions first**

Change the sidebar assertion in `src/app/App.test.tsx` to expect a link named `OKR Management Platform`. Change the sign-in heading assertions in `src/auth/SupabaseAuthProvider.test.tsx` to expect `Sign in to OKR Management Platform` or its Chinese localized equivalent, matching the active locale used by each test.

- [ ] **Step 2: Run focused tests and confirm they fail**

Run:

```bash
npm test -- --run src/app/App.test.tsx src/auth/SupabaseAuthProvider.test.tsx
```

Expected: failures still show the previous company-specific brand.

- [ ] **Step 3: Replace the user-visible brand**

Apply these copy rules:

```text
Browser title: OKR Management Platform
Sidebar accessible/visible brand: OKR Management Platform
Auth brand line: OKR Management Platform
English sign-in heading: Sign in to OKR Management Platform
Chinese sign-in heading: 登录 OKR Management Platform
English invitation welcome: Welcome to OKR Management Platform
Chinese invitation welcome: 欢迎加入 OKR Management Platform
Email header/body product name: OKR Management Platform
```

Do not change URLs, environment variables, RPC names, or deployment documentation.

- [ ] **Step 4: Run focused tests and source scan**

Run:

```bash
npm test -- --run src/app/App.test.tsx src/auth/SupabaseAuthProvider.test.tsx
rg -n '瞬谱光电|TIME-TECH SPECTRA' index.html src public/email
```

Expected: tests pass and the search returns no user-facing matches.

- [ ] **Step 5: Commit the branding change**

```bash
git add index.html src public/email
git commit -m "refactor: use generic OKR platform branding"
```

### Task 2: Capture English demo screenshots

**Files:**
- Create: `docs/images/dashboard.png`
- Create: `docs/images/okr-management.png`
- Create: `docs/images/reports.png`

**Interfaces:**
- Consumes: the generic brand from Task 1 and the existing demo repository.
- Produces: three documentation-ready PNG files referenced by Task 3.

- [ ] **Step 1: Start the local demo application**

Run:

```bash
VITE_APP_MODE=demo npm run dev -- --host 127.0.0.1
```

Use the printed local port for the following browser steps.

- [ ] **Step 2: Open the demo and switch to English**

Use the Playwright CLI wrapper to open the local URL, take a DOM snapshot, and activate the existing language switcher until the navigation and page headings are English.

- [ ] **Step 3: Capture the Dashboard**

Navigate to `/dashboard`, wait for the dashboard widgets to render, and save a viewport screenshot as:

```text
docs/images/dashboard.png
```

- [ ] **Step 4: Capture OKR Management**

Navigate to `/okrs`, wait for the OKR content to render, and save:

```text
docs/images/okr-management.png
```

- [ ] **Step 5: Capture Reports / Daily OKR**

Navigate to `/reports`, wait for the reports content to render, and save:

```text
docs/images/reports.png
```

- [ ] **Step 6: Inspect the images**

Verify all three screenshots show English UI, the generic brand, demo-only content, no browser chrome, and legible page content. Re-capture any image that fails these checks.

- [ ] **Step 7: Commit screenshot assets**

```bash
git add docs/images/dashboard.png docs/images/okr-management.png docs/images/reports.png
git commit -m "docs: add OKR platform screenshots"
```

### Task 3: Rewrite the README in English

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: `docs/images/dashboard.png`, `docs/images/okr-management.png`, and `docs/images/reports.png` from Task 2.
- Produces: the public GitHub landing page for the repository.

- [ ] **Step 1: Replace the README structure and copy**

Write an English README with these exact top-level sections:

```markdown
# OKR Management Platform
## Screenshots
## Key Features
## Technology Stack
## Local Setup
## Application Modes
## Security Model
## Verification
## Deployment Notes
```

Under `Screenshots`, embed all three files with relative Markdown paths. Describe role-based dashboards, OKR lifecycle management, structured daily reporting, resource management, HR work-hour visibility, notifications, bilingual UI, Supabase-backed persistence, RLS, and OSS-backed attachments without claiming AI functionality.

- [ ] **Step 2: Validate README language and links**

Run:

```bash
rg -n '瞬谱光电|TIME-TECH SPECTRA' README.md
rg -n '[\p{Han}]' README.md
test -f docs/images/dashboard.png
test -f docs/images/okr-management.png
test -f docs/images/reports.png
```

Expected: both searches return no matches and all image checks exit successfully.

- [ ] **Step 3: Commit the README**

```bash
git add README.md
git commit -m "docs: publish English project README"
```

### Task 4: Final verification and GitHub update

**Files:**
- Verify all files changed by Tasks 1–3.

**Interfaces:**
- Consumes: all previous task outputs.
- Produces: a verified `main` branch synchronized to `origin/main`.

- [ ] **Step 1: Run the complete verification suite**

Run:

```bash
npm run test:run
npm run typecheck
npm run build
git diff --check origin/main...HEAD
```

Expected: every command exits with status 0.

- [ ] **Step 2: Review the final repository state**

Run:

```bash
git status --short --branch
git log --oneline origin/main..HEAD
git diff --stat origin/main...HEAD
```

Expected: only the approved branding, screenshots, README, design, and plan changes are ahead of `origin/main`; the working tree is clean.

- [ ] **Step 3: Push the verified commits**

```bash
git push origin main
```

- [ ] **Step 4: Confirm synchronization**

Run:

```bash
git fetch origin
test "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)"
```

Expected: the equality check exits successfully.

