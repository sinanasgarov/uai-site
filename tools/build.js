#!/usr/bin/env node
/*
 * Static-site generator for the United Assets Investments site.
 *
 * This is a *build-time only* tool — it is not shipped, and dist/ needs no
 * tooling at all to run once generated (open any .html file directly, or
 * serve the folder with any static file server).
 *
 * It reads content.js (the original CMS-style data model, window.UAI) with
 * Node's vm module so the content itself is never retyped — every string
 * in dist/*.html is produced from the same source of truth the Claude
 * Design prototype used. Page layout/copy blocks below are transcribed
 * verbatim from the corresponding *.dc.html source templates, with the
 * {{ }} / sc-for / sc-if template syntax resolved at build time instead of
 * in the browser.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");

// Production origin — used only to build absolute canonical/og:image URLs
// (both need to be fully-qualified per spec); every on-page link/asset
// reference stays relative so the site also works opened from disk or
// from any subfolder on any static host. Custom domain (see dist/CNAME)
// serves from the root, same as the relative paths already assume.
const SITE = "https://uaiassets.com/";

// ---------------------------------------------------------------------
// 1. Load window.UAI out of content.js without retyping the data model.
// ---------------------------------------------------------------------
function loadData() {
  const src = fs.readFileSync(path.join(ROOT, "content.js"), "utf8");
  const sandbox = {
    window: { addEventListener() {}, dispatchEvent() {} },
    Event: function Event(name) { this.type = name; },
    console,
  };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: "content.js" });
  return sandbox.window.UAI;
}

const D = loadData();

// ---------------------------------------------------------------------
// 2. Small helpers
// ---------------------------------------------------------------------
function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function attr(s) {
  return esc(s).replace(/"/g, "&quot;");
}
function altOf(url) {
  return D.altFor(url) || "";
}

// ---------------------------------------------------------------------
// 3. <head> + header + footer — identical on every page.
// ---------------------------------------------------------------------
// og:image (and canonical) must be fully-qualified per the OpenGraph spec —
// crawlers won't resolve a relative URL — so a local "./images/x.jpg" path
// gets the site origin prepended here rather than at every call site.
function absoluteUrl(pathOrUrl) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return SITE + pathOrUrl.replace(/^\.\//, "");
}

function headBlock({ title, description, canonical, ogImage }) {
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${attr(canonical)}">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231b1a18"/><text x="50" y="68" font-family="Georgia,serif" font-size="62" fill="%23b68235" text-anchor="middle">U</text></svg>')}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="United Assets Investments">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:image" content="${attr(absoluteUrl(ogImage || D.img.heroPort))}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="./styles.css">
<script src="./script.js" defer></script>`;
}

// Top nav + mega menu + mobile panel + search modal. navKey matches the
// data-nav attribute on the relevant top-level link, for the current-page
// highlight (mirrors the original aria-current="page" styling).
function headerBlock(navKey) {
  const sectorMega = D.sectors.map((s) => `
            <a class="uai-mega-item" href="sectors.html#${attr(s.slug)}">
              <span style="font-size:11px;color:var(--color-accent);font-variant-numeric:tabular-nums;padding-top:3px">${esc(s.num)}</span>
              <span>
                <span style="display:block;font-family:var(--font-heading);font-size:15.5px;line-height:1.25">${esc(s.title)}</span>
                <span style="display:block;font-size:11.5px;opacity:.55;margin-top:3px">${esc(s.kicker)}</span>
              </span>
            </a>`).join("");

  const mobileSectors = D.sectors.map((s) => `
        <a class="uai-mobile-sector" href="sectors.html#${attr(s.slug)}">
          <span style="color:var(--color-accent);font-variant-numeric:tabular-nums;font-size:11px;padding-top:3px">${esc(s.num)}</span>
          ${esc(s.title)}
        </a>`).join("");

  const navLink = (key, href, label) =>
    `<a class="uai-nav-link" data-nav="${key}" href="${href}"${navKey === key ? ' aria-current="page"' : ""}>${label}</a>`;

  return `<header class="uai-header" id="uai-header" role="banner">
    <div class="uai-header-inner">
      <a class="uai-brand" href="index.html">
        <span class="uai-brand-name">United Assets <span style="color:var(--color-accent)">Investments</span></span>
        <span class="uai-brand-tag">Trade &middot; Logistics &middot; Industry &middot; Oman</span>
      </a>

      <nav class="uai-nav" aria-label="Primary">
        ${navLink("about", "about.html", "About Us")}
        <div class="uai-mega-wrap" id="uai-mega-wrap" style="position:relative">
          <button class="uai-mega-toggle" id="uai-mega-toggle" aria-expanded="false" aria-controls="uai-mega">
            Business Sectors <span class="uai-caret">&#9662;</span>
          </button>
        </div>
        ${navLink("solutions", "solutions.html", "Solutions")}
        ${navLink("industries", "industries.html", "Industries")}
        ${navLink("reach", "reach.html", "Global Reach")}
        ${navLink("insights", "insights.html", "Insights")}
        ${navLink("contact", "contact.html", "Contact")}
      </nav>

      <button class="uai-icon-btn" id="uai-search-open" aria-label="Search this website">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>
      </button>

      <a class="uai-header-cta" href="forms.html#request-a-quote">
        Request a Quote <span data-arrow="1" style="display:inline-block">&#8594;</span>
      </a>

      <button class="uai-burger" id="uai-mobile-open" aria-label="Open menu">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>
      </button>
    </div>

    <div class="uai-mega" id="uai-mega">
      <div class="uai-mega-inner">
        <div>
          <p style="font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--color-accent);margin:0 0 14px">Eight sectors</p>
          <p style="font-family:var(--font-heading);font-size:26px;line-height:1.15;margin:0 0 14px;font-weight:400">One commercial platform across trade, logistics and industry.</p>
          <a href="sectors.html" style="font-size:12.5px;color:var(--color-accent);text-decoration:none;border-bottom:1px solid color-mix(in srgb,#b68235 45%,transparent);padding-bottom:2px">View all sectors &#8594;</a>
        </div>
        <div class="uai-mega-grid">${sectorMega}
        </div>
      </div>
    </div>
  </header>

  <div class="uai-mobile-panel" id="uai-mobile-panel" role="dialog" aria-label="Menu">
    <div class="uai-mobile-head">
      <span style="font-family:var(--font-heading);font-size:17px">United Assets <span style="color:var(--color-accent)">Investments</span></span>
      <button class="uai-mobile-close" id="uai-mobile-close" aria-label="Close menu">&#10005;</button>
    </div>
    <div class="uai-mobile-body">
      <a class="uai-mobile-link" href="index.html">Home <span style="color:var(--color-accent);font-size:14px">&#8594;</span></a>
      <a class="uai-mobile-link" href="about.html">About Us <span style="color:var(--color-accent);font-size:14px">&#8594;</span></a>
      <a class="uai-mobile-link" href="sectors.html">Business Sectors <span style="color:var(--color-accent);font-size:14px">&#8594;</span></a>
      <a class="uai-mobile-link" href="solutions.html">Solutions <span style="color:var(--color-accent);font-size:14px">&#8594;</span></a>
      <a class="uai-mobile-link" href="industries.html">Industries <span style="color:var(--color-accent);font-size:14px">&#8594;</span></a>
      <a class="uai-mobile-link" href="reach.html">Global Reach <span style="color:var(--color-accent);font-size:14px">&#8594;</span></a>
      <a class="uai-mobile-link" href="insights.html">Insights <span style="color:var(--color-accent);font-size:14px">&#8594;</span></a>
      <a class="uai-mobile-link" href="contact.html">Contact <span style="color:var(--color-accent);font-size:14px">&#8594;</span></a>
      <p style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--color-accent);margin:26px 0 10px">Business sectors</p>
      ${mobileSectors}
      <div class="uai-mobile-ctas">
        <a class="uai-mobile-cta-primary" href="forms.html#request-a-quote">Request a Quote</a>
        <a class="uai-mobile-cta-secondary" href="forms.html#become-a-supplier">Become a Supplier</a>
      </div>
    </div>
  </div>

  <div class="uai-search-backdrop" id="uai-search-backdrop">
    <div class="uai-search-panel" role="dialog" aria-label="Search">
      <div class="uai-search-field">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="1.7" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>
        <input class="uai-search-input" id="uai-search-input" type="search" aria-label="Search the website" placeholder="Search sectors, solutions, industries, categories&hellip;">
        <button class="uai-search-esc" id="uai-search-close">ESC</button>
      </div>
      <div class="uai-search-results" id="uai-search-results"></div>
    </div>
  </div>`;
}

function footerBlock() {
  const sectorLinks = D.sectors.map((s) => `<a class="uai-footer-link" href="sectors.html#${attr(s.slug)}">${esc(s.title)}</a>`).join("\n            ");
  return `<footer class="uai-footer">
    <div class="uai-footer-inner">
      <div class="uai-footer-grid">
        <div style="grid-column:span 1">
          <p style="font-family:var(--font-heading);font-size:22px;margin:0 0 10px;line-height:1.2">United Assets <span style="color:var(--color-accent)">Investments</span></p>
          <p style="font-size:13px;line-height:1.75;opacity:.62;margin:0 0 18px;max-width:34ch">An Oman-based diversified business platform connecting suppliers, customers and industries across regional and international markets.</p>
          <a href="forms.html#request-a-quote" style="display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:var(--color-accent);text-decoration:none;border:1px solid var(--color-accent);padding:10px 16px;border-radius:2px">Request a Quote <span data-arrow="1">&#8594;</span></a>
        </div>
        <div>
          <p class="uai-footer-heading">Company</p>
          <div class="uai-footer-links">
            <a class="uai-footer-link" href="about.html">About Us</a>
            <a class="uai-footer-link" href="sectors.html">Business Sectors</a>
            <a class="uai-footer-link" href="solutions.html">Solutions</a>
            <a class="uai-footer-link" href="industries.html">Industries</a>
            <a class="uai-footer-link" href="reach.html">Global Reach</a>
            <a class="uai-footer-link" href="insights.html">Insights</a>
            <a class="uai-footer-link" href="contact.html">Contact</a>
          </div>
        </div>
        <div>
          <p class="uai-footer-heading">Business Sectors</p>
          <div class="uai-footer-links">
            ${sectorLinks}
          </div>
        </div>
        <div>
          <p class="uai-footer-heading">Partnerships</p>
          <div class="uai-footer-links">
            <a class="uai-footer-link" href="forms.html#request-a-quote">Request a Quote</a>
            <a class="uai-footer-link" href="forms.html#become-a-supplier">Become a Supplier</a>
            <a class="uai-footer-link" href="forms.html#partner-with-us">Partner With Us</a>
            <a class="uai-footer-link" href="catalogue.html">Product Catalogue</a>
          </div>
          <p class="uai-footer-heading" style="margin-top:26px">Company Profile</p>
          <p style="font-size:12px;opacity:.55;margin:0;line-height:1.6">PDF profile available on request &mdash; <a class="uai-footer-link" style="opacity:1" href="contact.html">contact us</a>.</p>
        </div>
        <div>
          <p class="uai-footer-heading">Contact</p>
          <div style="display:grid;gap:12px;font-size:13px;opacity:.72;line-height:1.6">
            <span>${esc(D.contact.location)}</span>
            <span style="opacity:.75;font-size:12px">Email: ${esc(D.contact.email)}</span>
            <span style="opacity:.75;font-size:12px">Phone: ${esc(D.contact.phone)}</span>
            <span style="opacity:.75;font-size:12px">WhatsApp: ${esc(D.contact.whatsapp)}</span>
          </div>
          <a href="contact.html" style="display:inline-block;margin-top:16px;font-size:12.5px;color:var(--color-accent);text-decoration:none;border-bottom:1px solid color-mix(in srgb,#b68235 45%,transparent);padding-bottom:2px">Contact our team &#8594;</a>
        </div>
      </div>
      <div class="uai-footer-bottom">
        <p style="font-size:11.5px;opacity:.5;margin:0">&copy; 2026 United Assets Investments SPC. All rights reserved.</p>
        <div style="display:flex;gap:22px;flex-wrap:wrap">
          <a class="uai-footer-legal" href="legal.html#privacy">Privacy Policy</a>
          <a class="uai-footer-legal" href="legal.html#terms">Terms of Use</a>
          <a class="uai-footer-legal" href="legal.html#cookies">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <div class="uai-consent" id="uai-consent">
    <p style="font-size:12.5px;line-height:1.7;margin:0;flex:1;min-width:220px;opacity:.85">We use essential cookies for site functionality and, with your agreement, analytics cookies to understand how the site is used. See the <a href="legal.html#cookies" style="color:var(--color-accent)">Cookie Policy</a>.</p>
    <div style="display:flex;gap:9px;flex-wrap:wrap">
      <button class="uai-consent-btn uai-consent-accept" id="uai-consent-accept">Accept analytics</button>
      <button class="uai-consent-btn uai-consent-decline" id="uai-consent-decline">Essential only</button>
    </div>
  </div>`;
}

// noSticky: pages that hide the mobile sticky CTA bar (Contact, Forms —
// matches the original `r.name !== 'form' && r.name !== 'contact'` rule).
function stickyCta(noSticky) {
  if (noSticky) return "";
  return `<div class="uai-sticky-cta uai-sticky-show" id="uai-sticky-cta">
    <a href="forms.html#request-a-quote">Request a Quote <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
    <a href="contact.html">Contact</a>
  </div>`;
}

function page({ navKey, title, description, canonical, ogImage, main, noSticky, extraBodyClass }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
${headBlock({ title, description, canonical, ogImage })}
</head>
<body${extraBodyClass ? ` class="${extraBodyClass}"` : ""}>
<a href="#uai-main" class="uai-skip-link" style="position:absolute;left:-9999px;top:0;background:#1b1a18;color:#f3f2f2;padding:10px 16px;z-index:200">Skip to content</a>
<div style="min-height:100vh;display:flex;flex-direction:column;font-family:var(--font-body)">
${headerBlock(navKey)}
<main id="uai-main" style="flex:1">
${main}
</main>
${stickyCta(noSticky)}
${footerBlock()}
</div>
</body>
</html>
`;
}

module.exports = { D, esc, attr, altOf, page, DIST, ROOT, SITE };
