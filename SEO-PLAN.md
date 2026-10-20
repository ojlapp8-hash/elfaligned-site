# SEO-PLAN.md — ELFALIGNED LLC site

Status: planning doc. Companion to `SEO.md` (keyword/map) and `TRAFFIC.md`
(acquisition). This plan reconciles those docs with the current
positioning ("automate the mundane") and the live code.

## 1. Audit findings (code + markup)

### 1.1 What is correct
- One `<h1>` per page; heading outline valid (`verify/verify.mjs`).
- `title`, `meta description`, canonical, OG (title/desc/url/image +
  dimensions), Twitter card present on all indexable pages.
- `robots.txt` allows all and declares sitemap.
- `sitemap.xml` lists 8 indexable pages with priority/changefreq.
- Internal linking: no orphan pages (every indexable page has 5+ inbound).
- JSON-LD present on index, services, work, contact, web-design.
- Image assets referenced; none missing (verify).
- Performance: 8.3 KB JS, 20 KB CSS (well under budget).
- Mobile overflow fixed (ch-based max-widths constrained to viewport).

### 1.2 Gaps / issues
1. **Placeholder domain.** Canonical, OG url, JSON-LD, sitemap, robots all
   use `https://example.com`. Must be swapped to the real domain before
   launch. Tracked in SEO.md checklist.
2. **JSON-LD gaps.** `about.html`, `approach.html`, `consultation.html`
   have 0 JSON-LD blocks. Add `Person`/`Organization` reference on about,
   `HowTo`/`Service` on approach, and `ContactPage`/form on consultation.
3. **Stale sitemap lastmod.** Most entries dated 2026-10-09 while content
   has since changed (services, about, etc.). Bump lastmod on deploy.
4. **SEO.md keyword table is stale.** It still targets the old
   "custom software Gaylord Michigan" positioning. Keywords should track
   the current "automate the mundane / governed AI" positioning and the
   actual services now listed (governance audit, mundane-task automation,
   custom software, website design & build, marketing focus study,
   Weekly Business Brief).
5. **Content SEO.** No blog/notes section yet. TRAFFIC.md calls for 2-3
   technical articles; none exist. Add `/notes/` with 3 starter articles.
6. **Local SEO.** Google Business Profile not yet created; no NAP
   consistency check (name/address/phone) across pages.
7. **Analytics.** No analytics wired. Recommend GoatCounter (async, <10KB)
   per TRAFFIC.md; must not block first paint.
8. **Image alt / OG image.** OG image is a single static asset; verify
   it reflects current brand/tagline. Add per-page OG images for services
   and web-design if budget allows.
9. **Heading/keyword alignment.** Services H1 "What we actually do." is
   generic; consider "AI automation and consulting services" for search
   intent. (Trade-off: brand voice vs. search. Decide before launch.)
10. **FAQ / rich results.** No FAQ schema. Add a short FAQ section
    (3-5 Q&A) on services or approach with `FAQPage` JSON-LD for
    rich-result eligibility.

## 2. Prioritized plan

### P0 — before launch (blocking)
- [x] Add JSON-LD to about.html, approach.html, consultation.html. (done)
- [x] Bump sitemap `lastmod` to deploy date (2026-10-20). (done)
- [x] Update SEO.md keyword table to current positioning. (done, P1 item)
- [ ] Replace `https://example.com` with real domain in all HTML, sitemap.xml, robots.txt, JSON-LD. (needs real domain)
- [ ] Replace placeholder email/phone in footer, contact, JSON-LD. (needs real values)
- [ ] Re-run `node verify/verify.mjs` (must stay 0 failures). — run after domain swap

### P1 — launch week
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools.
- [ ] Create Google Business Profile (Gaylord, MI; category "Software
      Company"; services list; hours; photos).
- [ ] Verify OG rendering via opengraph.xyz / Facebook Sharing Debugger.
- [ ] Validate JSON-LD via Google Rich Results Test.
- [ ] Wire GoatCounter (async, defer; <10KB; no cookies).
- [x] Update SEO.md keyword table to current positioning. (done)

### P2 — first 30 days
- [ ] Publish 3 technical articles under `/notes/` and cross-post
      (dev.to, LinkedIn, HN, r/selfhosted).
- [ ] Add FAQ section + `FAQPage` schema on services or approach.
- [ ] List on Gaylord Area tourism site + Otsego County Chamber directory.
- [ ] Review Search Console impressions; adjust titles/descriptions to
      actual query terms.
- [ ] Add per-page OG images for services and web-design.

### P3 — ongoing
- [ ] Monthly: check Search Console for new queries, update copy.
- [ ] Quarterly: refresh sitemap lastmod, prune stale pages.
- [ ] Keep `verify/verify.mjs` green on every change (SEO + a11y +
      asset budget).

## 3. Measurement
- Primary: organic impressions/clicks in Search Console.
- Secondary: GoatCounter unique visitors by landing page.
- Local: Google Business Profile views/calls/directions.
- Quality bar: no page ships with a Lighthouse SEO score below 95.

## 4. Non-goals
- No paid ads (brand message forbids wasteful spending).
- No AI-generated content farms.
- No cookie consent wall (GoatCounter is cookieless).
- No interstitials/popups.

## 5. Owner
Jim owns all content. WebCraft owns markup/SEO plumbing. Updates to
this plan tracked in git history of this file.
