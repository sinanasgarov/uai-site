"use strict";
const { D, esc, attr } = require("../build.js");

function cats(s) {
  if (s.categories) return s.categories.map((c) => ({ name: c.name, text: c.text }));
  if (s.groups) return s.groups.map((g) => ({ name: g.name, text: g.items.join(" · ") }));
  return (s.services || []).map((v) => ({ name: v.name, text: v.text }));
}
function subs(s, c) {
  if (s.groups) {
    const g = s.groups.filter((x) => x.name === c.name)[0];
    if (g) return g.items;
  }
  return [c.name + " — Range A", c.name + " — Range B", c.name + " — Project grade"];
}

function build() {
  const sectorNav = D.sectors.map((x) => `<a href="#${attr(x.slug)}" style="display:flex;gap:10px;align-items:baseline;padding:11px 18px;text-decoration:none;font-size:13px;border-bottom:1px solid color-mix(in srgb,#201f1d 7%,transparent);color:inherit" class="uai-catlink-hover"><span style="font-size:10.5px;color:var(--color-accent);font-variant-numeric:tabular-nums">${esc(x.num)}</span><span style="flex:1">${esc(x.nav)}</span><span style="font-size:10.5px;opacity:.45;font-variant-numeric:tabular-nums">${cats(x).length}</span></a>`).join("");

  const sectorCards = D.sectors.map((x) => `
            <a data-reveal="1" data-zoom="1" href="#${attr(x.slug)}" class="uai-card-hover" style="text-decoration:none;color:inherit;border:1px solid var(--color-divider);display:flex;flex-direction:column;background:var(--color-bg)">
              <span style="display:block;overflow:hidden;background:#1b1a18">
                <img src="${attr(x.card)}" alt="${attr(x.title)}" loading="lazy" style="width:100%;height:150px;object-fit:cover;filter:sepia(.19) saturate(.76)">
              </span>
              <span style="padding:16px 18px 20px;display:flex;flex-direction:column;gap:8px;flex:1">
                <span style="font-size:10.5px;color:var(--color-accent);font-variant-numeric:tabular-nums;letter-spacing:.18em">${esc(x.num)}</span>
                <span style="font-family:var(--font-heading);font-size:18.5px;line-height:1.25">${esc(x.title)}</span>
                <span style="font-size:12px;opacity:.6;flex:1">${cats(x).length} categories</span>
                <span style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-accent-700);display:inline-flex;gap:8px;align-items:center">Browse <span data-arrow="1" style="display:inline-block">&#8594;</span></span>
              </span>
            </a>`).join("");

  const levels = [
    { n: "01", t: "Business Sector", s: "Eight top-level commercial desks", state: "Live" },
    { n: "02", t: "Category", s: "Product and service groupings per sector", state: "Live" },
    { n: "03", t: "Subcategory", s: "Ranges within a category", state: "Structured" },
    { n: "04", t: "Product", s: "Individual records with specifications and documents", state: "Awaiting data" },
  ];
  const levelsHtml = levels.map((l) => `
              <div style="display:flex;gap:14px;align-items:baseline;border-bottom:1px solid var(--color-divider);padding-bottom:10px">
                <span style="font-size:10.5px;color:var(--color-accent);font-variant-numeric:tabular-nums;letter-spacing:.16em">${l.n}</span>
                <span style="flex:1">
                  <span style="display:block;font-family:var(--font-heading);font-size:16.5px">${esc(l.t)}</span>
                  <span style="display:block;font-size:12px;opacity:.62;margin-top:2px">${esc(l.s)}</span>
                </span>
                <span style="font-size:11px;opacity:.45;letter-spacing:.08em;text-transform:uppercase">${esc(l.state)}</span>
              </div>`).join("");

  const productFields = ["Product name", "Slug", "Category", "Images", "Description", "Applications", "Specifications", "Documents", "Related products", "SEO metadata"];

  const sectorSections = D.sectors.map((s) => {
    const c = cats(s);
    return `
      <div id="${attr(s.slug)}" style="scroll-margin-top:96px;padding-top:clamp(28px,4vw,56px);margin-top:clamp(28px,4vw,56px);border-top:1px solid var(--color-divider)">
        <div data-reveal="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:clamp(20px,2.6vw,44px);align-items:center;padding-bottom:clamp(22px,3vw,40px);margin-bottom:clamp(24px,3vw,40px);border-bottom:1px solid var(--color-divider)">
          <div>
            <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent);font-variant-numeric:tabular-nums;margin:0 0 12px">${esc(s.num)} &middot; ${esc(s.kicker)}</p>
            <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(24px,2.8vw,40px);line-height:1.08;margin:0 0 12px">${esc(s.title)}</h2>
            <p style="font-size:14px;line-height:1.8;opacity:.74;margin:0 0 16px;max-width:48ch">${esc(s.blurb)}</p>
            <a href="sectors.html#${attr(s.slug)}" style="font-size:12.5px;color:var(--color-accent-700);text-decoration:none;border-bottom:1px solid color-mix(in srgb,#b68235 40%,transparent);padding-bottom:2px">Sector overview &#8594;</a>
          </div>
          <figure style="margin:0">
            <div class="plate" style="border-width:7px">
              <img src="${attr(s.card)}" alt="${attr(s.title)}" loading="lazy" style="width:100%;height:clamp(170px,18vw,240px);object-fit:cover">
            </div>
          </figure>
        </div>

        <h3 data-reveal="1" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(20px,2.2vw,30px);margin:0 0 18px">Categories</h3>
        <div style="display:grid;gap:1px;background:var(--color-divider);border:1px solid var(--color-divider)">
          ${c.map((cat, i) => `<details style="background:var(--color-bg)">
            <summary style="width:100%;display:flex;align-items:center;gap:16px;list-style:none;cursor:pointer;padding:clamp(16px,1.8vw,24px) clamp(16px,2vw,26px)">
              <span style="display:flex;align-items:baseline;gap:14px;flex:1;text-align:left">
                <span style="font-size:10.5px;color:var(--color-accent);font-variant-numeric:tabular-nums">${i + 1 < 10 ? "0" + (i + 1) : i + 1}</span>
                <span>
                  <span style="display:block;font-family:var(--font-heading);font-size:19px;line-height:1.25">${esc(cat.name)}</span>
                  <span style="display:block;font-size:12.5px;opacity:.62;margin-top:3px;max-width:60ch">${esc(cat.text)}</span>
                </span>
              </span>
              <span class="uai-details-icon" style="font-size:18px;color:var(--color-accent);flex:none">+</span>
            </summary>
            <div style="padding:0 clamp(16px,2vw,26px) clamp(18px,2.2vw,28px)">
              <div style="border-top:1px solid var(--color-divider);padding-top:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px">
                ${subs(s, cat).map((sub) => `<div style="border:1px solid var(--color-divider);padding:14px 16px;background:var(--color-surface)">
                  <p style="font-family:var(--font-heading);font-size:15.5px;margin:0 0 6px">${esc(sub)}</p>
                  <p style="font-size:11.5px;line-height:1.6;opacity:.55;margin:0 0 10px">Product records pending &mdash; specifications published on supplier confirmation.</p>
                  <a href="forms.html#request-a-quote" style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-accent-700);text-decoration:none">Enquire &#8594;</a>
                </div>`).join("")}
              </div>
            </div>
          </details>`).join("")}
        </div>
      </div>`;
  }).join("");

  return `<section aria-labelledby="cat-title" style="background:var(--color-bg);border-bottom:1px solid var(--color-divider)">
  <div style="max-width:1560px;margin:0 auto;padding:clamp(44px,7vw,104px) clamp(18px,3.4vw,56px) clamp(30px,4vw,60px)">
    <nav aria-label="Breadcrumb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.55;margin-bottom:24px">
      <a href="index.html" style="color:inherit;text-decoration:none">Home</a> <span style="opacity:.5">/</span> Catalogue
    </nav>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(24px,4vw,70px);align-items:end">
      <h1 id="cat-title" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(34px,5.6vw,82px);line-height:1.02;letter-spacing:-.02em;margin:0;max-width:20ch">Product Catalogue</h1>
      <p style="font-size:14.5px;line-height:1.8;opacity:.72;margin:0;max-width:52ch">A four-level architecture across all eight sectors: sector, category, subcategory and product. Categories are live; product records are published as the company confirms them.</p>
    </div>
  </div>
</section>

<section aria-label="Catalogue browser" style="background:var(--color-bg);padding:clamp(32px,5vw,72px) 0 clamp(46px,6.5vw,104px)">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:minmax(220px,260px) minmax(0,1fr);gap:clamp(24px,3vw,52px);align-items:start">

    <aside aria-label="Sectors" style="position:sticky;top:96px;border:1px solid var(--color-divider);background:var(--color-surface)">
      <p style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--color-accent);margin:0;padding:16px 18px 12px;border-bottom:1px solid var(--color-divider)">Browse by sector</p>
      <div style="display:grid">${sectorNav}
      </div>
      <div style="padding:16px 18px;border-top:1px solid var(--color-divider)">
        <p style="font-size:11.5px;line-height:1.65;opacity:.6;margin:0 0 12px">Product records are added by the company through the admin console. Specifications are never published without supplier confirmation.</p>
        <a href="forms.html#request-a-quote" style="font-size:12px;color:var(--color-accent-700);text-decoration:none;border-bottom:1px solid color-mix(in srgb,#b68235 40%,transparent)">Request a Quote &#8594;</a>
      </div>
    </aside>

    <div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,270px),1fr));gap:clamp(14px,1.8vw,24px)">${sectorCards}
      </div>
      <div data-reveal="1" style="margin-top:clamp(26px,3.4vw,48px);border:1px solid var(--color-divider);background:var(--color-surface);padding:clamp(22px,2.6vw,38px);display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:clamp(20px,2.6vw,44px)">
        <div>
          <p style="font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--color-accent);margin:0 0 14px">Catalogue structure</p>
          <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(21px,2.2vw,32px);line-height:1.15;margin:0 0 12px">Sector &#8594; Category &#8594; Subcategory &#8594; Product</h2>
          <p style="font-size:13.5px;line-height:1.8;opacity:.72;margin:0;max-width:52ch">The hierarchy is live and CMS-driven. Categories exist for all eight sectors today; product records are published as the company confirms specifications with each supplier.</p>
        </div>
        <div style="display:grid;gap:10px">${levelsHtml}
        </div>
      </div>

      <div data-reveal="1" style="margin-top:clamp(26px,3.4vw,48px);border:1px solid var(--color-divider);background:var(--color-surface);padding:clamp(20px,2.4vw,34px)">
        <p style="font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--color-accent);margin:0 0 14px">Product record structure</p>
        <p style="font-size:13.5px;line-height:1.8;opacity:.72;margin:0 0 18px;max-width:64ch">Each product page is generated from the fields below. Nothing is displayed until the company enters verified data &mdash; no placeholder specifications are published.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          ${productFields.map((f) => `<span style="font-size:11.5px;border:1px solid var(--color-divider);padding:6px 12px;border-radius:2px;opacity:.8;background:var(--color-bg)">${esc(f)}</span>`).join("")}
        </div>
      </div>
      ${sectorSections}
    </div>
  </div>
</section>`;
}

module.exports = build;
