"use strict";
const { D, esc, attr } = require("../build.js");

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function build() {
  const docs = [
    { kind: "privacy", doc: D.legal.privacy },
    { kind: "terms", doc: D.legal.terms },
    { kind: "cookies", doc: D.legal.cookies },
  ];

  const toc = docs.map((d) => `<a href="#${d.kind}" style="padding:10px 18px;font-size:12.5px;text-decoration:none;color:inherit;border-bottom:1px solid color-mix(in srgb,#201f1d 6%,transparent)" class="uai-catlink-hover">${esc(d.doc.title)}</a>`).join("");

  const docsHtml = docs.map(({ kind, doc }) => `
    <article id="${kind}" style="max-width:74ch;padding-top:clamp(28px,4vw,56px);margin-top:clamp(28px,4vw,56px);border-top:1px solid var(--color-divider);scroll-margin-top:96px">
      <h1 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(28px,4vw,52px);line-height:1.05;letter-spacing:-.02em;margin:0 0 8px">${esc(doc.title)}</h1>
      <p style="font-size:12.5px;letter-spacing:.06em;opacity:.55;margin:0 0 clamp(20px,2.6vw,36px)">${esc(doc.updated)}</p>
      ${doc.sections.map((s) => `<section id="${kind}-${slugify(s.h)}" style="padding-bottom:clamp(24px,3vw,40px);margin-bottom:clamp(24px,3vw,40px);border-bottom:1px solid var(--color-divider);scroll-margin-top:110px">
        <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(22px,2.4vw,34px);line-height:1.15;margin:0 0 14px">${esc(s.h)}</h2>
        ${s.p.map((para) => `<p style="font-size:15px;line-height:1.9;text-align:justify;hyphens:auto;opacity:.82;margin:0 0 14px">${esc(para)}</p>`).join("")}
      </section>`).join("")}
      <p style="font-size:12.5px;line-height:1.8;opacity:.5;margin:0">This page is CMS-editable. Its content is provided as a professional baseline and should be reviewed by the company's legal advisers before publication.</p>
    </article>`).join("");

  return `<section aria-labelledby="lg-title" style="background:var(--color-bg);border-bottom:1px solid var(--color-divider)">
  <div style="max-width:1560px;margin:0 auto;padding:clamp(40px,6vw,96px) clamp(18px,3.4vw,56px) clamp(28px,3.4vw,54px)">
    <nav aria-label="Breadcrumb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.55;margin-bottom:22px">
      <a href="index.html" style="color:inherit;text-decoration:none">Home</a> <span style="opacity:.5">/</span> <span style="color:var(--color-accent-700)">Legal</span>
    </nav>
    <h1 id="lg-title" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(32px,5vw,72px);line-height:1.02;letter-spacing:-.02em;margin:0 0 12px">Privacy, Terms &amp; Cookies</h1>
    <p style="font-size:12.5px;letter-spacing:.06em;opacity:.55;margin:0">Last updated: TBC</p>
  </div>
</section>

<section style="background:var(--color-bg);padding:clamp(34px,5vw,84px) 0 clamp(46px,6.5vw,104px)">
  <div class="uai-sidebar-layout" style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:minmax(210px,250px) minmax(0,1fr);gap:clamp(26px,3.4vw,64px);align-items:start">

    <nav aria-label="On this page" style="position:sticky;top:96px;border:1px solid var(--color-divider);background:var(--color-surface)">
      <p style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--color-accent);margin:0;padding:15px 18px 11px;border-bottom:1px solid var(--color-divider)">Documents</p>
      <div style="display:grid">${toc}
      </div>
    </nav>
    <div>${docsHtml}
    </div>
  </div>
</section>`;
}

module.exports = build;
