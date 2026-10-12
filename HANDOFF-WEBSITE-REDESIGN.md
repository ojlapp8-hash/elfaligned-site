# HANDOFF — Website Redesign Brief for the Website Developer Bot

**From:** ELFALIGN liaison profile (owner: Jim Lappan II)
**To:** website developer bot
**Date:** 2026-10-12
**Workspace:** `C:\Users\jim2\ELFAligned\site\`

---

## 1. Why this brief exists

The current site's copy was written against an **outdated** company framing:
"ELFALIGNED LLC is an intellectual property holding company dedicated to the
architecture and advancement of sovereign, native-design software" (see the
"Our mission" section of `about.html`). Jim has since restated the company's
scope. The old mission framing, its "no site visits ever" posture, and the
whole site's IP/sovereign-software narrative are **superseded**.

Canonical replacement: `C:\Users\jim2\ELFAligned\site\MISSION.md` — read it in
full before writing any copy.

## 2. What ELFAligned LLC actually is (the only source of truth)

- Small business **consulting firm** that collects and analyzes client data to
  find stress/weak points across **structure, function, marketing,
  administration, organization, and any other facet**.
- Benchmarks against **successful businesses in similar sectors and regions**.
- Primary business: **technology and software solutions** — existing tools when
  one exists, custom builds when none does — **local AI included**.
- Solutions delivered through **specialized agentic bots tailored to the client
  from their own data**; client data stays safe and secure.
- Every engagement ends in a **detailed plan and a quote to implement**.
- Also offers **website design**.
- **Platforms: Windows and Android only**, plus **LAN-interconnected network
  applications** between those devices. Do not claim support for any other
  platform.
- Deliverables are always intangible (software, a website, an action plan) —
  never physical goods.

## 3. Standing pricing facts (use only where a page is explicitly about pricing)

| Item | Rule |
|---|---|
| Consultation | Flat **$250**, generally via phone/email/data sharing. Site visits can be arranged at additional cost. |
| Labor | $150/hour |
| Site visits (client hardware/network assessment) | Subcontracted, passed through at the subcontractor's price, **no markup** |
| Compute/API costs | Quoted at 5× estimated API usage; invoiced at min(4× actual usage, the 5× quoted amount) |
| Website design | Quoted based on the customer's desired outcome |

Do **not** put fee numbers into general marketing copy or hero sections. The
$250 consultation fee belongs on a services/pricing page, not the homepage.

## 4. What must change on the site

**Remove or rewrite:**
- `about.html` "Our mission" section — the IP-holding-company / sovereign
  native-design software framing. Replace with the MISSION.md statement.
- The **"no site visits"** posture (in `README.md`, `CONTENT.md`, and anywhere
  in copy). Site visits are now available at additional cost.
- The "IP holding company" / "edge native" pillar language and the
  "middleware bottlenecks" technical register.
- Any claim of cloud independence framed as an anti-cloud doctrine — local AI
  is now a **solution option**, not a creed.

**Keep the good bones:**
- The **remote-first, data-driven** positioning is still true and still the
  strongest differentiator. "Clients send data; they get documents back."
- The **"recovered hours"** language and the "where the hours go" idea.
- The **priced-before-built / written-first** honesty angle.
- The **independent check** step ("the person who built it doesn't get to
  decide it works").
- The accessible dark design system and the verification discipline (§6).

**New content needed:**
- A page or section on **sector and regional benchmarking** (comparing the
  client against successful businesses in similar sectors/regions) — this is
  now a core offering and has no home on the site today.
- **Local AI** as an explicit service option (security-sensitive clients).
- **Agentic bots tailored from client data** — the differentiator. Currently
  absent.
- **Website design** as a first-class service (a dedicated page already exists —
  reconcile it with the new framing).
- Consultation fee + site-visit option on the services page.

## 5. Accessibility — non-negotiable

Jim has brainstem encephalitis (nystagmus, double vision, vestibular damage,
wheelchair). Every surface must satisfy:

- Black / high-contrast dark background.
- Body text 20–26px.
- Touch targets 48px+ minimum.
- TTS read-aloud option.
- Phone-on-LAN access to any dev server.
- Full WCAG 2.1 AA (the current suite reports 0 violations — do not regress).

The current token file is already accessibility-first (`--touch: 48px`, fluid
type scale, 5.7:1+ muted contrast). Extend it; do not replace it with a
framework whose defaults fail these.

## 6. Current state — technical baseline

| Layer | Choice |
|---|---|
| Pages | 8 hand-written HTML5 pages, no framework, no build step |
| Styles | One CSS file, `css/tokens.css`, custom properties (18.7 KB) |
| Script | One vanilla JS file, `js/site.js` (6.3 KB) — nav, form validation, mailto fallback |
| Images | WebP + SVG (`assets/img/`): logo.webp, team.webp, og-cover.jpg, favicon.svg |
| Host | Cloudflare Pages, free tier |
| Verify | `node verify/verify.mjs` — 466 checks (contrast, SEO, headings, labels, asset budgets, linking) |

Current results (2026-10-09): verify 466/466 pass, axe-core 0 violations,
Lighthouse 100/100/100/100 desktop and mobile, 0 horizontal scroll at 6
viewports, LCP 1.1s.

**Jim's preference:** keep the zero-build, hand-written, no-runtime-dependency
stack unless he explicitly asks for a framework. "One problem, one tool."

## 7. Unresolved placeholders (carry forward, do not invent)

| What | Current value |
|---|---|
| Domain | `https://example.com` |
| Email | `hello@example.com` |
| Phone | `(555) 555-0100` |
| Form endpoint | empty (mailto fallback active) |

## 8. Deliverable

A redesigned static site in `C:\Users\jim2\ELFAligned\site\`, verified with
`node verify/verify.mjs` (must stay at 0 failures), copy rewritten against
MISSION.md, the superseded IP framing removed, the new benchmarking / local-AI
/ agentic-bot content added, and the accessibility bar in §5 held.

Deliver real files at real paths. Never describe a page you did not write.
