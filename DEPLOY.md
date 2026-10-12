# DEPLOY.md — Cloudflare Pages deployment

## Host

**Cloudflare Pages** (free tier)
- Unlimited bandwidth
- 500 builds/month
- Global CDN
- Automatic HTTPS
- Custom domain support

## Prerequisites

- A Cloudflare account (free)
- The `site/` directory (this directory)
- A GitHub account (for the repo-based deploy flow) or the Cloudflare
  dashboard direct upload

## Deploy via GitHub (recommended)

1. Create a GitHub repository for the site:

```bash
cd C:/Users/jim2/ELFAligned/site
git init
git add .
git commit -m "Initial site build"
git remote add origin https://github.com/<username>/elfaligned-site.git
git push -u origin main
```

2. In the Cloudflare dashboard:
   - Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
   - Select the repository
   - Build settings:
     - **Framework preset:** None
     - **Build command:** (leave empty)
     - **Build output directory:** `/`
   - Click **Save and Deploy**

3. Cloudflare assigns a `<project>.pages.dev` URL. Test it immediately.

## Deploy via direct upload (no GitHub)

```bash
# Install Wrangler (Cloudflare CLI, free)
npm install -g wrangler

# Login
wrangler login

# Deploy
cd C:/Users/jim2/ELFAligned/site
wrangler pages deploy . --project-name=elfaligned
```

## Custom domain

1. In Cloudflare Pages → your project → **Custom domains**
2. Add your domain (e.g. `elfaligned.com`)
3. If the domain is on Cloudflare DNS, it's automatic.
   Otherwise, add the CNAME record Cloudflare provides.
4. HTTPS is automatic — Cloudflare provisions the certificate.

## Environment variables

None required. The site is fully static.

## Form endpoint (optional, after launch)

The contact form currently uses a mailto fallback. To enable direct POST:

1. Create a Cloudflare Worker (free tier: 100,000 requests/day)
2. Point it at your email service (Resend, Mailgun, or SMTP)
3. Set the `data-endpoint` attribute on the `<form>` in `contact.html` to
   the Worker URL
4. The JS falls back to mailto automatically if the POST fails

Alternatively, switch to Netlify and use Netlify Forms (free, 100
submissions/month) — but that changes the host.

## Rollback

Cloudflare Pages keeps every deployment. To roll back:

1. Go to **Workers & Pages** → your project → **Deployments**
2. Find the last known-good deployment
3. Click **...** → **Rollback to this deployment**

Rollback is instant — no rebuild needed.

## Post-deploy verification checklist

- [ ] `curl -s https://<domain>/ | head -5` returns HTML
- [ ] `curl -s https://<domain>/robots.txt` returns the sitemap URL
- [ ] `curl -s https://<domain>/sitemap.xml` returns valid XML
- [ ] All 7 pages return 200
- [ ] `curl -s https://<domain>/404.html` returns the 404 page (Cloudflare
      serves this automatically for unknown paths)
- [ ] Replace `https://example.com` with the real domain in all HTML files,
      `sitemap.xml`, and `robots.txt`
- [ ] Replace `hello@example.com` and phone number in all HTML files
- [ ] Update `data-endpoint` on the contact form if using a Worker
- [ ] Test the contact form end-to-end
- [ ] Run Lighthouse against the live URL
- [ ] Submit sitemap to Google Search Console and Bing Webmaster Tools
- [ ] Verify OG tags render correctly (paste URL into any OG debugger)
- [ ] Set up Google Business Profile (local SEO)

## Build from fresh checkout

```bash
git clone <repo-url>
cd <repo-name>
npx http-server . -p 4173
# open http://localhost:4173
```

No build step. No dependencies to install.
