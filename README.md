# ELFALIGNED LLC — Website

A static marketing site for ELFALIGNED LLC: an AI automation and consulting
firm in Gaylord, Michigan, that automates the mundane and governs the AI so it
stays safe.

## What this is

Eight hand-written HTML pages with one shared CSS file and one progressive-
enhancement JS file. No framework, no build step, no runtime dependencies.

**Positioning:** we automate the repetitive tasks nobody wants to do — inbox
triage, lead follow-up, CRM updates, document processing — and govern the AI so
it stays safe. Not new operating systems. Existing software (such as
QuickBooks) stays; we build the layer around it. Platform scope is Windows and
Android only, plus LAN-interconnected network applications between those
devices.

## Source of truth for copy

`MISSION.md` in this directory. All marketing copy derives from it. If a page
contradicts MISSION.md, MISSION.md governs. The redesign that produced the
current copy is specified in `HANDOFF-WEBSITE-REDESIGN.md`.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Pages | Plain HTML5 | Zero build, zero JS required to read the site |
| Styles | One CSS file with custom properties | Durable, auditable, no CSS-in-JS runtime cost |
| Script | One vanilla JS file, ~6 KB | Nav disclosure, form validation, mailto fallback |
| Host | Cloudflare Pages (free tier) | Unlimited bandwidth, global edge |
| Images | WebP + SVG | 97% smaller than the source PNGs |

## Local run

```bash
cd C:/Users/jim2/ELFAligned/site
npx http-server . -p 4173
# open http://localhost:4173
```

No build step. Edit a file, reload the browser.

## Verification

```bash
node verify/verify.mjs
```

466 checks: contrast, SEO metadata, heading structure, form labels, asset
budgets, internal linking.

## Structure

```
site/
├── index.html          Home — automate the mundane (hero, differentiation)
├── services.html       Five AI lanes + Weekly Business Brief + pricing section
├── approach.html       Four steps: study → automate → deploy → plan+quote
├── web-design.html     Website design service (dedicated page)
├── work.html           Four engagements (before/built/after)
├── about.html          Founder background, mission, scope
├── contact.html        Form (incl. topic selector) + direct details
├── 404.html            Error page (noindex)
├── css/tokens.css      All design tokens + component styles
├── js/site.js          Nav toggle, form validation, skip-link fallback
├── assets/img/         logo.webp, team.webp, og-cover.jpg, favicon.svg
├── tools/optimize_images.py
├── verify/verify.mjs   Automated check suite
├── MISSION.md          Canonical mission statement
├── HANDOFF-WEBSITE-REDESIGN.md  Redesign brief
├── robots.txt
└── sitemap.xml
```

## Verification results (2026-10-12)

| Check | Result |
|-------|--------|
| `verify/verify.mjs` | 466 pass, 0 fail |
| axe-core WCAG 2.1 AA (8 pages) | 0 violations (last full run 2026-10-09; see A11Y.md) |
| Lighthouse desktop | 100 / 100 / 100 / 100 (last run 2026-10-09; see PERF.md) |
| Lighthouse mobile (375px, throttled) | 100 / 100 / 100 / 100 (last run 2026-10-09) |
| Responsive (8 pages × 6 viewports) | 0 horizontal scroll (last run 2026-10-09) |

Note: the 2026-10-12 reframe changed copy and updated JSON-LD, but no CSS,
layout, or interactive structure changed. The static suite (contrast,
headings, labels, SEO, budgets, linking) passes 466/466 on the new copy.
axe-core and the responsive sweep were not re-run on 2026-10-12 because the
local Chrome profile was locked; re-run them before launch to confirm no
regression. See A11Y.md and PERF.md for the last full browser results.

Reports: `verify/lighthouse-desktop.json`, `verify/lighthouse-mobile.json`,
`verify/lighthouse-webdesign.json`.

## Docs

README, CONTENT, SEO, A11Y, PERF, DEPLOY, TRAFFIC — all in this directory.

## Placeholders to replace before launch

| What | Where | Current value |
|------|-------|---------------|
| Domain | All pages, sitemap, robots | `https://example.com` |
| Email | Footer, contact, JSON-LD, form | `hello@example.com` |
| Phone | Footer, contact, JSON-LD | `(555) 555-0100` |
| Form endpoint | `contact.html` `data-endpoint` | Empty (mailto fallback) |
