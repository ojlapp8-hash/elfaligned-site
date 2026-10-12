# TRAFFIC.md — Acquisition plan

## Audience

Small business owners and private users in Northern Michigan (and remote)
who have a bottleneck: repetitive manual work, disconnected systems, or
knowledge trapped in one person's head. They search for solutions, not for
"software development services."

## What they actually search

| Search query | Intent | Page that answers it |
|-------------|--------|---------------------|
| "custom software Gaylord Michigan" | Transactional | `/` |
| "small business software Northern Michigan" | Transactional | `/` |
| "local AI assistant for business" | Transactional | `/services.html` |
| "private AI that runs on my computer" | Transactional | `/services.html` |
| "how to automate spreadsheet reporting" | Informational | `/approach.html` |
| "software that works offline" | Informational | `/approach.html` |
| "custom software vs off-the-shelf" | Informational | `/approach.html` |
| "system integration for small business" | Transactional | `/services.html` |
| "software developer Gaylord MI" | Transactional | `/contact.html` |
| "edge AI Android development" | Informational | `/about.html` |

## Intent match per page

| Page | Intent | Why |
|------|--------|-----|
| `/` | Transactional | Visitor knows they have a problem and wants to know if we solve it |
| `/services.html` | Transactional | Visitor wants to know what we build and how it's scoped |
| `/approach.html` | Informational | Visitor wants to understand how we work before committing |
| `/work.html` | Informational | Visitor wants proof it works |
| `/about.html` | Navigational | Visitor knows the name and wants context |
| `/contact.html` | Transactional | Visitor is ready to start |

## Hub-and-spoke structure

```
                    ┌─────────────┐
                    │  Homepage   │  ← hub: the bottleneck story
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │ Services │   │Approach  │   │  Work    │  ← spokes: detail
    └──────────┘   └──────────┘   └──────────┘
           └───────────────┼───────────────┘
                           ▼
                    ┌─────────────┐
                    │  Contact    │  ← conversion
                    └─────────────┘
```

Every page links to Contact. Every page links back to Home. The internal
linking is verified by `verify/verify.mjs` — no orphan pages.

## Social sharing setup

- OG image: `og-cover.jpg` (1200×630, 50 KB) — logo + tagline on brand backdrop
- `og:title`, `og:description`, `og:url`, `og:image` on all indexable pages
- `twitter:card = summary_large_image`
- Image dimensions declared in meta tags

Verify after launch: paste any page URL into [opengraph.xyz](https://opengraph.xyz)
or Facebook's Sharing Debugger.

## Analytics

**Recommended: GoatCounter** (free for non-commercial, $5/mo for commercial,
GDPR-compliant, no cookie banner needed, no tracking libraries)

Alternative: **Umami** (self-hosted, free, OSS)

Do NOT use Google Analytics — it adds ~45KB of blocking JS, requires a
cookie consent banner, and contradicts the "private, local, no telemetry"
brand message.

When added:
- Script must be `async` and `defer`
- Must not block first paint
- Must not add more than 10KB to initial JS

## Off-site acquisition (no cost)

1. **Google Business Profile** — essential for local search. List as
   "Software Company" in Gaylord, MI. Add services, hours, and photos.
2. **Northern Michigan business directories** — Gaylord Area Convention &
   Tourism Bureau, Otsego County Chamber of Commerce, Michigan Small
   Business Development Center.
3. **GitHub** — publish the edge-native architecture work as open-source
   libraries. Links from real projects are the highest-quality backlinks
   available.
4. **Technical writing** — publish 2–3 articles on the local-first /
   sovereign software topic. Post on the site (add a `/notes/` section) and
   cross-post to dev.to, Hacker News, and relevant subreddits
   (r/selfhosted, r/rust, r/androiddev).
5. **LinkedIn** — post the "why local software matters" angle. Northern
   Michigan business owners are on LinkedIn.

## First 30 days (concrete actions)

**Week 1:**
- [ ] Deploy to Cloudflare Pages
- [ ] Replace all placeholder domain/email/phone
- [ ] Submit sitemap to Google Search Console and Bing
- [ ] Create Google Business Profile
- [ ] Verify OG tags render correctly

**Week 2:**
- [ ] List on Gaylord Area tourism site and Otsego County Chamber directory
- [ ] Publish first technical article: "Why your business software shouldn't
      phone home" — post on site + dev.to
- [ ] Set up GoatCounter analytics

**Week 3:**
- [ ] Publish second article: "The bottleneck is usually one person doing a
      computer's job" — post on site + LinkedIn
- [ ] Reach out to 5 Northern Michigan businesses personally (not a mass
      email — 5 individual, specific messages)

**Week 4:**
- [ ] Publish third article: "Custom software vs. off-the-shelf: when each
      is the right answer"
- [ ] Review Search Console data — which queries are bringing impressions?
- [ ] Adjust page titles/descriptions based on actual search terms

## What NOT to do

- No interstitials or popups
- No "subscribe to our newsletter" before any value is delivered
- No cookie consent wall for analytics (use GoatCounter — no cookies)
- No paid ads (the brand message is "we don't do wasteful spending")
- No dark patterns of any kind
- No AI-generated content farms — every article is written by a human who
  did the work
