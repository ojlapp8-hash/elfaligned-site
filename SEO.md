# SEO.md — Search visibility plan

Canonical domain: `https://example.com` (replace before launch — update in all
7 HTML files, `sitemap.xml`, and `robots.txt`)

## Keywords per page

| Page | Primary keyword | Secondary keywords | Intent |
|------|----------------|-------------------|--------|
| `/` | AI automation Gaylord Michigan | automate the mundane, governed AI, small business automation Northern Michigan | Transactional |
| `/services.html` | AI automation services | AI governance audit, mundane-task automation, custom software, website design, marketing focus study | Transactional |
| `/approach.html` | how we automate business tasks | supervised agents, plan and quote first, local AI | Informational |
| `/work.html` | automation case studies | supervised agents, repetitive work, before and after | Informational |
| `/about.html` | ELFALIGNED LLC | 22 years tractor dealership, AI automation Gaylord Michigan | Navigational |
| `/contact.html` | contact ELFALIGNED | AI automation Michigan, free pre-check | Transactional |

## Titles and descriptions (as shipped)

| Page | `<title>` | `<meta description>` | Length |
|------|-----------|---------------------|--------|
| `/` | ELFALIGNED LLC — Local, Private Software \| Gaylord, MI | Custom, hands-on software for private use and small business in Gaylord, Michigan. Local, private technology that solves real bottlenecks. | 50 / 143 |
| `/services.html` | Services — Custom Software, AI & Integration \| ELFALIGNED LLC | Custom software, local AI assistants, and system integration from ELFALIGNED LLC. Built to run on your hardware, owned by you outright. | 58 / 137 |
| `/approach.html` | Our Approach — Local-First, Hands-On Development \| ELFALIGNED LLC | How ELFALIGNED LLC works: walk the floor, scope the narrowest fix, build with you watching, hand over the keys. Local-first software with fixed scope and no lock-in. | 58 / 169 |
| `/work.html` | Work — What We've Built \| ELFALIGNED LLC | Selected builds from ELFALIGNED LLC: quote generators, private document search, integration bridges, and edge-native Android work. | 40 / 138 |
| `/about.html` | About — ELFALIGNED LLC \| Gaylord, Michigan | ELFALIGNED LLC is a software and AI architecture firm in Gaylord, Michigan, holding IP for sovereign, edge-native technology. | 43 / 127 |
| `/contact.html` | Contact ELFALIGNED LLC — Gaylord, Michigan \| Tell Us Your Bottleneck | Contact ELFALIGNED LLC in Gaylord, Michigan. Describe your bottleneck and get an honest read on whether custom software is the right fix. | 69 / 144 |

## Structured data (JSON-LD)

| Page | Schema type | Notes |
|------|-------------|-------|
| `/` | `Organization` + `LocalBusiness` + `WebSite` (graph) | Includes slogan, foundingLocation, areaServed, knowsAbout, contactPoint |
| `/services.html` | `ItemList` of 5 `Service` items | Each with name + description |
| `/work.html` | `ItemList` of 4 `CreativeWork` items | Each with name + about |
| `/contact.html` | `ContactPage` | References the Organization node |

All JSON-LD validated: parses as valid JSON, has `@context` and type. Verified
by `node verify/verify.mjs`.

## Internal link map

```
index.html ──→ services.html  ("See what we build")
index.html ──→ approach.html  ("Read the full approach")
index.html ──→ about.html     ("About the company")
index.html ──→ contact.html   ("Tell us your bottleneck")

services.html ──→ approach.html  ("How we scope")
services.html ──→ contact.html   ("Describe your bottleneck")

approach.html ──→ contact.html   ("Book the walkthrough")
approach.html ──→ work.html      ("See past work")

work.html ──→ about.html         ("see the architecture principles")
work.html ──→ contact.html       ("Tell us what's slow")

about.html ──→ services.html     ("See services")
about.html ──→ contact.html      ("Contact us")

contact.html ──→ (terminal page, form)

404.html ──→ / ("Back to the homepage")
404.html ──→ contact.html ("Contact us instead")
```

**Orphan page check:** Every indexable page has 5+ inbound links. No orphans.
Verified by `verify/verify.mjs`.

## Social sharing

- OG image: `og-cover.jpg` (1200×630, 50 KB) — logo centered on brand backdrop with tagline
- `og:title`, `og:description`, `og:url`, `og:image`, `og:type` on all indexable pages
- `twitter:card = summary_large_image` on all indexable pages
- Image dimensions declared (`og:image:width`, `og:image:height`)

## Submission checklist (after domain is live)

- [ ] Replace `https://example.com` with real domain in all 7 HTML files
- [ ] Replace `hello@example.com` and phone number
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify OG tags render correctly (use opengraph.xyz or similar)
- [ ] Test structured data with Google Rich Results Test
- [ ] Set up Google Business Profile (local SEO for Gaylord, MI)

## Files

- `robots.txt` — allows all crawlers, declares sitemap URL
- `sitemap.xml` — 6 indexable pages with lastmod, changefreq, priority
- `404.html` — noindex, links back to homepage and contact
