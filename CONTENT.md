# CONTENT.md — Page-by-page inventory

Canonical domain: `https://example.com` (placeholder — replace before launch)

**Positioning:** a small business consulting firm that turns a client's own
data into action. Copy derives from `MISSION.md`. Analysis and benchmarking
come first; technology closes the gaps. Every engagement ends in a detailed
plan and a quote. Platform scope: Windows and Android only, plus
LAN-interconnected network applications.

| # | Page | Path | Purpose | Primary CTA |
|---|------|------|---------|-------------|
| 1 | Home | `/` | Consulting-first story: turn data into action, benchmark, close gaps with tech | "Send us your data" → `/contact.html` |
| 2 | Services | `/services.html` | Six services + how-we-engage section (free consultation, site visits, priced-before-built, support/handoff) | "Free consultation" → `/consultation.html` |
| 3 | Approach | `/approach.html` | Four steps: analyze → benchmark → recommend → plan+quote | "Send us your data" → `/contact.html` |
| 4 | Web Design | `/web-design.html` | Website design service, quoted on outcome | "Send us your data" → `/contact.html` |
| 5 | Work | `/work.html` | Four engagements (before/built/after) | "Send us your data" → `/contact.html` |
| 6 | About | `/about.html` | Founder background, mission, scope (platforms/services/deliverables) | "See services" → `/services.html` |
| 7 | Contact | `/contact.html` | Form (asks what data you can send) + direct details | Form submit |
| 8 | 404 | `/404.html` | Error recovery (noindex) | "Back to the homepage" → `/` |

---

## The recurring language

| Instead of | We say | Why |
|---|---|---|
| bottleneck | stress points / weak spots / where the gaps are | MISSION.md register; broader than one constrained point |
| "unoptimized workflow" | *(never used)* | Consulting-deck register |
| IP holding / sovereign / edge-native | *(removed — superseded by MISSION.md)* | Old framing, no longer the company's scope |
| "no site visits ever" | site visits available at additional cost | Accurate to current offering |
| anti-cloud doctrine | local AI where cloud dependence is a liability | An option, not a creed |

Note: "middleware bottlenecks" no longer appears anywhere — that was old IP
framing and has been removed.

---

## Page 1 — Home (`/`)

**H1:** "We turn your own data into action."

| Section | Content |
|---------|---------|
| Hero | Eyebrow (Gaylord MI · Consulting · Technology), H1, lede, logo, two CTAs, meta strip (Data-driven / Benchmarked / Priced first) |
| What we look at | "Weak spots hide in the parts of a business nobody measures." + 3 cards: Structure & function / Marketing & sales / Administration & organization |
| How we benchmark | "Knowing you're behind is useless without knowing behind what." + 3 pillars (sector / regional / gap sized) + team image |
| How solutions are delivered | "Specialized agentic bots, built from your data — not a template." + 3 cards (built from your records / your data stays with you / existing tool or custom build) |
| Local AI, where it matters | "Cloud dependence is sometimes a liability, not a feature." + 3 cards (data stays with you / works offline / an option, not a doctrine) |
| How we work | 4 steps: Collect and analyze your data → Benchmark → Recommend the fix → Deliver a plan and quote, then build it |
| Who's behind it | "Twenty-two years of running a business before consulting on one." + mission quote |
| CTA band | "Want to know where you stand?" |

---

## Page 3 — Approach (`/approach.html`)

**H1:** "Data in, written plan out. And it gets checked."

| Step | Heading | Core promise |
|------|---------|--------------|
| 1 | Collect and analyze your data | "The better the data we have, the more our team can solve — and the less guesswork ends up in the quote." Returns a written read on the stress points, ranked by cost, usually within two business days |
| 2 | Benchmark against your sector and region | A comparison showing where you stand — each gap sized, each strength named. "It stops you spending money fixing things that aren't broken." |
| 3 | Recommend the fix — existing tool or custom build | The recommendation comes in writing with the cost. "If the honest answer is 'buy this off-the-shelf product instead,' we write that down and tell you which one." |
| 4 | Deliver the plan and quote, then build it | "Every engagement ends the same way: a detailed plan and a quote." Agentic bots deliver the build. "The person who built it doesn't get to decide it works." |

Principles: data-driven and evidence-based / honest about existing solutions /
you own the output / plain language in writing / honest "no".

---

## Page 7 — Contact (`/contact.html`)

**H1:** "Send us your data."

Form fields: name · email · business (optional) · **topic** (optional select:
consultation (free) / data analysis / benchmarking / technology solution /
agentic bots / website design / something else) · budget (optional) ·
**"What data can you send?"** (textarea).

Hint asks for: "List what you have: spreadsheets, system exports, process
notes, records, screenshots. Roughly how much time the current process costs."

"What happens next": written reply within one business day → send us your data →
a written read on where you stand (free, yours to keep).

---

## How we engage (services.html, dedicated section)

| Item | Rule |
|------|------|
| Free pre-check | A short form (`/consultation.html`) — lead collection plus enough detail to gauge whether a plan is viable. Free. |
| Consultation | **$250**, generally via phone/email/data sharing. Full analysis, benchmarking, and a detailed plan with a quote to implement. |
| Site visits | Where physical inspection of hardware or the network is genuinely required; subcontracted, billed at the subcontractor's price, no markup |
| Priced before built | Every engagement concludes with a detailed plan and a quote before implementation begins |
| Support or handoff | If the client lacks technical knowledge: ongoing support and maintenance, or a total documented handoff. Decided up front |
| Website design | Quoted based on the customer's desired outcome |

Note: no hourly rate, compute, or API-usage figures appear anywhere on the
site. The contact form no longer has a budget field.

---

## Page 8 — Free Pre-Check (`/consultation.html`)

**H1:** "Let's find out whether a plan is viable for your business."

Purpose: lead collection plus the beginning of data collection. It gauges
whether a plan is even viable, and sells the paid $250 consultation. It is
**not** the consultation itself — the page says so explicitly.

Form fields, in order:

| Field | Type | Required |
|-------|------|----------|
| Your name | text | yes |
| Your position | text | no |
| Company or business name | text | no |
| Phone | tel | no |
| Email | email | yes |
| Organization type | radio group (sole proprietorship / partnership / LLC / corporation / nonprofit / other) | no |
| Describe your business | textarea | yes |
| What do you see as your strong points? | textarea | yes |
| Where do you feel stress or weakness? | textarea | yes |
| Is there a specific tool or product you want? | text | no |

Submit button: "Send my pre-check" — sends via email to the
placeholder address (`hello@example.com`) using the mailto fallback until a
form endpoint is configured. Subject line: "Free pre-check request — <company>".

Below the form: a CTA band explaining what happens next (a straight answer on
viability within one business day; the next step is the $250 consultation if
there's a plan), plus the support-vs-total-handoff note for clients lacking
technical knowledge — linking to the contact page.

---

## Content ownership

Jim owns all content. No lorem ipsum anywhere — every paragraph is real copy.
The About page is written in first person ("I spent 22 years…").

## Placeholders needing real values before launch

| What | Where | Current value |
|------|-------|---------------|
| Domain | All pages (canonical, OG, sitemap, robots) | `https://example.com` |
| Email | Footer, contact, JSON-LD, form mailto | `hello@example.com` |
| Phone | Footer, contact, JSON-LD | `(555) 555-0100` |
| Form endpoint | `contact.html` `data-endpoint` | Empty (mailto fallback active) |
| Analytics | Not yet added | None — see TRAFFIC.md |
