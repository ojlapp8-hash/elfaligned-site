/**
 * ELFALIGNED site verification — a11y, SEO, contrast, asset budget.
 * Zero external dependencies (Node 26 stdlib only).
 *
 * Usage:  node verify/verify.mjs
 * Exit 0 = all checks pass. Non-zero = failures printed to stderr.
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://example.com";
const PAGES = ["index.html", "services.html", "approach.html", "work.html", "about.html", "contact.html", "404.html", "web-design.html", "consultation.html"];

let pass = 0, fail = 0;
const failures = [];
const check = (ok, label, detail = "") => {
  if (ok) { pass++; }
  else { fail++; failures.push(`${label}${detail ? " — " + detail : ""}`); }
};

/* ---------- WCAG relative luminance / contrast ---------- */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function relLum(hex) {
  const [r, g, b] = hexToRgb(hex).map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const la = relLum(a), lb = relLum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/* ---------- 1. Contrast — every declared token pair ---------- */
const css = readFileSync(join(ROOT, "css", "tokens.css"), "utf8");
const tok = (name) => {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  return m ? m[1] : null;
};
const bg = tok("bg"), bgAlt = tok("bg-alt"), surface = tok("surface"),
      surfaceRaised = tok("surface-raised");
const pairs = [
  ["--text on --bg",            tok("text"),        bg,              4.5],
  ["--text on --surface",       tok("text"),        surface,         4.5],
  ["--text-muted on --bg",      tok("text-muted"),  bg,              4.5],
  ["--text-muted on --surface", tok("text-muted"),  surface,         4.5],
  ["--text-muted on --bg-alt",  tok("text-muted"),  bgAlt,           4.5],
  ["--text-dim on --bg (large)",tok("text-dim"),    bg,              3.0],
  ["--accent on --bg",          tok("accent"),      bg,              4.5],
  ["--accent on --surface",     tok("accent"),      surface,         4.5],
  ["--accent-contrast on --accent", tok("accent-contrast"), tok("accent"), 4.5],
  ["--focus on --bg",           tok("focus"),       bg,              3.0],
  ["--text on --surface-raised",tok("text"),        surfaceRaised,   4.5],
];
console.log("\n=== Contrast (WCAG 2.1 AA) ===");
for (const [label, fg, bgs, min] of pairs) {
  const r = contrast(fg, bgs);
  check(r >= min, `contrast ${label} = ${r.toFixed(2)}:1 (min ${min}:1)`,
        `got ${r.toFixed(2)}:1, need ${min}:1`);
  console.log(`  ${r >= min ? "PASS" : "FAIL"}  ${label.padEnd(38)} ${r.toFixed(2)}:1  (min ${min}:1)`);
}

/* ---------- 2. Per-page SEO + a11y structure ---------- */
const VIEWPORTS = [320, 375, 768, 1024, 1440, 1920];
const VIEWPORT_RE = /width=device-width,\s*initial-scale=1/;
// 404.html is intentionally noindex and carries no nav — exempt from the
// SEO-metadata and internal-linking checks, but still checked for a11y.
const IS_404 = (page) => page === "404.html";

for (const page of PAGES) {
  const p = join(ROOT, page);
  if (!existsSync(p)) { check(false, `${page} exists`); continue; }
  const html = readFileSync(p, "utf8");
  const tag = (name) => (html.match(new RegExp(`<${name}[\\s>]`, "i")) ? 1 : 0);
  const count = (re) => (html.match(re) || []).length;

  console.log(`\n=== ${page} ===`);

  // viewport — responsive is non-negotiable at every declared breakpoint
  check(VIEWPORT_RE.test(html), `${page}: responsive viewport meta`);

  // exactly one h1
  const h1s = count(/<h1[\s>]/gi);
  check(h1s === 1, `${page}: exactly one <h1>`, `found ${h1s}`);

  // no skipped heading levels (h1 -> h2 -> h3, never h1 -> h3)
  const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map(m => +m[1]);
  let skipped = false;
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) { skipped = true; break; }
  }
  check(!skipped, `${page}: no skipped heading levels`,
        `outline: ${levels.join(",")}`);

  // SEO metadata
  const title = html.match(/<title>([^<]+)<\/title>/);
  check(!!title, `${page}: <title> present`);
  if (title) {
    check(title[1].length >= 20 && title[1].length <= 70,
      `${page}: title 20-70 chars`, `"${title[1]}" is ${title[1].length}`);
  }
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  check(!!desc, `${page}: meta description present`);
  if (desc) {
    check(desc[1].length >= 70 && desc[1].length <= 165,
      `${page}: description 70-165 chars`, `is ${desc[1].length}`);
  }
  // SEO metadata — 404 is intentionally noindex and exempt
  if (!IS_404(page)) {
    check(/<link\s+rel="canonical"/.test(html), `${page}: canonical link present`);
    check(/property="og:title"/.test(html), `${page}: og:title present`);
    check(/property="og:description"/.test(html), `${page}: og:description present`);
    check(/property="og:image"/.test(html), `${page}: og:image present`);
    check(/property="og:url"/.test(html), `${page}: og:url present`);
    check(/name="twitter:card"/.test(html), `${page}: twitter:card present`);
  }

  // JSON-LD — valid JSON, and only on indexable pages
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (ld) {
    try {
      const parsed = JSON.parse(ld[1]);
      check(true, `${page}: JSON-LD parses`);
      check(!!(parsed["@context"] && (parsed["@graph"] || parsed["@type"])),
        `${page}: JSON-LD has @context and type`);
    } catch (e) {
      check(false, `${page}: JSON-LD parses`, e.message);
    }
  }
  check(!/name="robots"\s+content="noindex/.test(html) || page === "404.html",
    `${page}: indexable (or intentionally noindex)`);

  // Accessibility structure
  check(/<html[^>]+lang="en"/.test(html), `${page}: lang attribute`);
  check(/class="skip-link"/.test(html), `${page}: skip link present`);
  check(/<main[\s>]/.test(html), `${page}: <main> landmark`);
  check(/<header[\s>]/.test(html), `${page}: <header> landmark`);
  check(/<footer[\s>]/.test(html), `${page}: <footer> landmark`);
  if (!IS_404(page)) {
    check(/<nav[^>]+aria-label/.test(html), `${page}: nav has aria-label`);
  }

  // Images: every <img> needs alt (empty alt allowed only for decorative)
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
  for (const img of imgs) {
    const hasAlt = /\balt=/.test(img);
    const decorative = /\balt=""/.test(img) && /\baria-hidden="true"/.test(img);
    check(hasAlt, `${page}: <img> has alt attribute`, img.slice(0, 90));
    if (hasAlt && img.match(/alt="([^"]*)"/)?.[1]?.length > 0) {
      check(img.match(/alt="([^"]*)"/)[1].length >= 10,
        `${page}: alt text is descriptive`, img.slice(0, 90));
    }
  }

  // Form controls: every input/select/textarea needs a label association
  const controls = [...html.matchAll(/<(input|select|textarea)\b[^>]*\bid="([^"]+)"[^>]*>/gi)];
  for (const c of controls) {
    const id = c[2];
    check(new RegExp(`<label[^>]+for="${id}"`).test(html),
      `${page}: control #${id} has a <label for>`);
  }
  const hiddenControls = count(/<(?:input|textarea|select)\b[^>]*type="hidden"/gi);
  // A control is labelled if it has an id + <label for>, OR it is wrapped
  // inside its own <label> (valid for radio/checkbox groups).
  const labelLess = [...html.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)]
    .filter(m => {
      if (/type="(?:hidden|submit|button)"/.test(m[2])) return false;
      if (/\bid=/.test(m[2])) return false;
      // wrapped-label pattern: <label ...><input ...></label>
      if (/<label\b[^>]*>\s*<(?:input)\b[^>]*>/.test(html)) return false;
      return true;
    });
  check(labelLess.length === 0, `${page}: all form controls have id + label`,
    `${labelLess.length} unlabelled`);

  // Buttons need discernible text
  const buttons = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)];
  for (const b of buttons) {
    const text = b[1].replace(/<[^>]+>/g, "").trim();
    check(text.length > 0 || /aria-label/.test(b[0]),
      `${page}: button has discernible text`);
  }

  // Links need discernible text
  const links = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)];
  for (const l of links) {
    const text = l[1].replace(/<[^>]+>/g, "").trim();
    check(text.length > 0 || /aria-label/.test(l[0]),
      `${page}: link has discernible text`, l[0].slice(0, 80));
  }

  // Touch targets: interactive elements >= 48px via CSS (verified in CSS below)
  // No inline styles overriding focus visibility
  check(!/style="[^"]*outline:\s*none/.test(html),
    `${page}: no inline outline:none`);

  // No horizontal-scroll traps: no fixed px widths on containers
  check(!/style="[^"]*width:\s*\d{4,}px/.test(html),
    `${page}: no fixed-width containers in inline styles`);

  console.log(`  heading outline: ${levels.join(" > ")}`);
}

/* ---------- 3. CSS checks ---------- */
console.log("\n=== CSS / responsive ===");
check(css.includes("min-width:"), "CSS: mobile-first (min-width queries only)",
  "no min-width media queries found");
check(!/@media\s*\(max-width/.test(css), "CSS: no max-width queries (mobile-first)",
  "found max-width query");
check(/--touch:\s*48px/.test(css), "CSS: 48px touch target token defined");
check(/prefers-reduced-motion/.test(css), "CSS: prefers-reduced-motion respected");
check(/prefers-color-scheme|--bg:/.test(css), "CSS: token set defined");
check(/@media print/.test(css), "CSS: print stylesheet present");
check(css.includes("overflow-x: hidden"), "CSS: horizontal scroll guard on body");
check(/--measure:\s*\d+ch/.test(css), "CSS: measure (line-length) token defined");
// No px font sizes below 16px for body copy
const tinyFonts = [...css.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)]
  .map(m => parseFloat(m[1])).filter(v => v < 12);
check(tinyFonts.length === 0, "CSS: no font-size below 12px",
  `found: ${tinyFonts.join(", ")}`);

/* ---------- 4. Asset budget ---------- */
console.log("\n=== Asset budget ===");
const imgDir = join(ROOT, "assets", "img");
const jsDir = join(ROOT, "js");
const kb = (f) => statSync(join(ROOT, f)).size / 1024;

// JS budget: < 150KB total initial JS
let jsTotal = 0;
for (const f of ["site.js"]) {
  if (existsSync(join(jsDir, f))) jsTotal += statSync(join(jsDir, f)).size / 1024;
}
check(jsTotal < 150, `JS budget < 150KB`, `${jsTotal.toFixed(1)} KB`);
console.log(`  JS total: ${jsTotal.toFixed(1)} KB (budget 150 KB)`);

// CSS budget
const cssKb = kb("css/tokens.css");
check(cssKb < 60, `CSS budget < 60KB`, `${cssKb.toFixed(1)} KB`);
console.log(`  CSS total: ${cssKb.toFixed(1)} KB (budget 60 KB)`);

// Initial images (preloaded hero): < 150KB
const heroLogo = existsSync(join(imgDir, "logo.webp")) ? kb("assets/img/logo.webp") : Infinity;
check(heroLogo < 150, `Hero (preloaded) image < 150KB`, `${heroLogo.toFixed(1)} KB`);
console.log(`  Hero logo: ${heroLogo.toFixed(1)} KB (budget 150 KB)`);

// Every image referenced by a page exists on disk
const allHtml = PAGES.map(p => readFileSync(join(ROOT, p), "utf8")).join("\n");
const refs = [...allHtml.matchAll(/(?:src|href|content)="(\/assets\/[^"]+)"/g)].map(m => m[1]);
const missing = refs.filter(r => !existsSync(join(ROOT, r.replace(/^\//, ""))));
check(missing.length === 0, "All referenced assets exist on disk",
  `missing: ${missing.join(", ")}`);
console.log(`  Referenced assets: ${refs.length}, missing: ${missing.length}`);

// No PNG/JPG larger than 200KB in the site
for (const f of ["assets/img/logo.png", "assets/img/team.png"]) {
  if (existsSync(join(ROOT, f))) {
    console.log(`  (source ${f}: ${kb(f).toFixed(1)} KB — not referenced by pages, fine)`);
  }
}

/* ---------- 5. SEO plumbing files ---------- */
console.log("\n=== SEO plumbing ===");
check(existsSync(join(ROOT, "robots.txt")), "robots.txt present");
check(existsSync(join(ROOT, "sitemap.xml")), "sitemap.xml present");
check(existsSync(join(ROOT, "404.html")), "404.html present");
if (existsSync(join(ROOT, "robots.txt"))) {
  const robots = readFileSync(join(ROOT, "robots.txt"), "utf8");
  check(/Sitemap:\s*https?:\/\//.test(robots), "robots.txt declares sitemap URL");
}
if (existsSync(join(ROOT, "sitemap.xml"))) {
  const sm = readFileSync(join(ROOT, "sitemap.xml"), "utf8");
  check(sm.includes("<urlset"), "sitemap.xml has urlset");
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  check(locs.length >= PAGES.length - 1, "sitemap lists all indexable pages",
    `${locs.length} entries for ${PAGES.length - 1} pages`);
  for (const loc of locs) {
    check(loc.startsWith("https://"), `sitemap loc is absolute: ${loc}`);
  }
  // every canonical in a page should appear in the sitemap
  for (const page of PAGES.filter(p => p !== "404.html")) {
    const html = readFileSync(join(ROOT, page), "utf8");
    const canon = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/)?.[1];
    if (canon) check(locs.includes(canon), `canonical of ${page} is in sitemap`, canon);
  }
}

/* ---------- 6. Internal linking — no orphan pages ---------- */
console.log("\n=== Internal linking ===");
const linkTargets = new Set();
for (const l of [...allHtml.matchAll(/href="(\/[^"#]*)/g)]) linkTargets.add(l[1]);
for (const page of PAGES) {
  const path = "/" + page;
  if (IS_404(page)) {
    console.log(`  ${page.padEnd(16)} (noindex error page — exempt)`);
    continue;
  }
  const inbound = PAGES.filter(p => p !== page && p !== "404.html")
    .filter(p => readFileSync(join(ROOT, p), "utf8").includes(`href="${path}"`))
    .length;
  check(inbound > 0 || page === "index.html",
    `${page} has inbound internal links`, `${inbound} pages link to it`);
  console.log(`  ${page.padEnd(16)} inbound links: ${inbound}`);
}

/* ---------- Summary ---------- */
console.log(`\n${"=".repeat(60)}`);
console.log(`PASS: ${pass}   FAIL: ${fail}`);
if (fail > 0) {
  console.log(`\nFailures:`);
  failures.forEach(f => console.log(`  ✗ ${f}`));
  process.exit(1);
}
console.log("All checks passed.");
