"use strict";
const { D, esc, attr } = require("../build.js");

function build() {
  const programme = [
    { cat: "Procurement", title: "Writing an enquiry that gets a usable quotation", note: "What a supplier actually needs in an RFQ, and what slows one down." },
    { cat: "Logistics", title: "Reading a transit time honestly", note: "Where published schedules and real arrival dates diverge, and how to plan for it." },
    { cat: "Trade", title: "Terms of sale and who carries the risk", note: "A plain reading of the delivery terms that matter in regional trade." },
    { cat: "Industry", title: "Specifying steel to the standard, not the price", note: "Grade, tolerance and documentation as commercial variables." },
    { cat: "Oman", title: "Why Oman sits where it does in Gulf logistics", note: "Geography, port capacity and re-export in practical terms." },
    { cat: "GCC", title: "Cross-border distribution inside the GCC", note: "Documentation and coordination for onward regional movement." },
    { cat: "Market Insights", title: "Lead times as the real currency", note: "How availability, not unit price, decides most industrial purchases." },
    { cat: "Company", title: "How our desks are structured", note: "The reasoning behind eight sectors with shared coordination." },
  ];

  const filterChips = D.insightCategories.map((c) => `<a href="#" data-filter="${attr(c)}" class="uai-insight-chip" style="font:inherit;font-size:12.5px;text-decoration:none;white-space:nowrap;flex:none;padding:8px 14px;border-radius:2px;display:inline-flex;gap:7px;align-items:center;background:transparent;border:1px solid var(--color-divider);color:inherit;transition:all .2s ease">${esc(c)}</a>`).join("");

  const programmeHtml = programme.map((p) => `
        <div data-reveal="1" data-cat="${attr(p.cat)}" class="uai-programme-card" style="background:var(--color-bg);padding:clamp(20px,2.2vw,30px);display:flex;flex-direction:column;gap:10px;min-height:180px">
          <span style="font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--color-accent)">${esc(p.cat)}</span>
          <h3 style="font-family:var(--font-heading);font-weight:400;font-size:20px;line-height:1.25;margin:0">${esc(p.title)}</h3>
          <p style="font-size:13px;line-height:1.7;opacity:.68;margin:0;flex:1">${esc(p.note)}</p>
          <span style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;opacity:.42">In preparation</span>
        </div>`).join("");

  return `<section aria-labelledby="ins-title" style="background:var(--color-bg);border-bottom:1px solid var(--color-divider)">
  <div style="max-width:1560px;margin:0 auto;padding:clamp(44px,7vw,110px) clamp(18px,3.4vw,56px) clamp(34px,4.5vw,70px)">
    <nav aria-label="Breadcrumb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.55;margin-bottom:24px">
      <a href="index.html" style="color:inherit;text-decoration:none">Home</a> <span style="opacity:.5">/</span> <span style="color:var(--color-accent-700)">Insights</span>
    </nav>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(24px,4vw,70px);align-items:end">
      <h1 id="ins-title" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(36px,6vw,88px);line-height:1;letter-spacing:-.02em;margin:0;max-width:18ch">Insights</h1>
      <p style="font-size:15px;line-height:1.82;opacity:.72;margin:0;max-width:52ch">Editorial notes on procurement practice, regional trade conditions, logistics and industrial supply &mdash; written by the desks that do the work.</p>
    </div>
  </div>
</section>

<section style="background:var(--color-bg);padding:clamp(40px,6vw,96px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <div data-reveal="1" style="border:1px solid var(--color-divider);background:var(--color-surface);padding:clamp(28px,4vw,64px);display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:clamp(24px,3.4vw,60px);align-items:center;margin-bottom:clamp(30px,4vw,56px)">
      <div>
        <p style="font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--color-accent);margin:0 0 16px">Publication pending</p>
        <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(24px,3vw,42px);line-height:1.1;margin:0 0 14px;max-width:26ch">The first pieces are in preparation</h2>
        <p style="font-size:14.5px;line-height:1.8;opacity:.72;margin:0 0 20px;max-width:50ch">We publish only what we can stand behind, so nothing is here yet. The editorial programme below is set; the first pieces are being written by the sector desks.</p>
        <a href="contact.html" style="display:inline-flex;align-items:center;gap:9px;font-size:13.5px;color:var(--color-accent-700);text-decoration:none;border-bottom:1px solid color-mix(in srgb,#b68235 40%,transparent);padding-bottom:3px">Ask to be notified on publication <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
      </div>
      <figure style="margin:0">
        <div class="plate" style="border-width:8px">
          <img src="${attr(D.img.notebook)}" alt="${attr(D.altFor(D.img.notebook))}" loading="lazy" style="width:100%;height:clamp(200px,22vw,300px);object-fit:cover">
        </div>
      </figure>
    </div>

    <h2 data-reveal="1" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(22px,2.6vw,36px);margin:0 0 clamp(18px,2.4vw,32px)">The editorial programme</h2>

    <div aria-label="Programme filters" style="display:flex;gap:9px;overflow-x:auto;padding-bottom:14px;margin-bottom:6px" id="uai-insight-filters">
      <a href="#" data-filter="All" class="uai-insight-chip is-active" style="font:inherit;font-size:12.5px;text-decoration:none;white-space:nowrap;flex:none;padding:8px 14px;border-radius:2px;display:inline-flex;gap:7px;align-items:center;background:color-mix(in srgb,#b68235 13%,transparent);border:1px solid #b68235;color:var(--color-accent-700)">All</a>${filterChips}
    </div>

    <div data-grid-fill="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:1px;background:var(--color-divider)" id="uai-programme-grid">${programmeHtml}
    </div>
    <div id="uai-insight-empty" hidden style="padding:clamp(40px,6vw,90px) 0;text-align:center;border:1px solid var(--color-divider)">
      <p style="font-family:var(--font-heading);font-size:clamp(22px,2.4vw,32px);margin:0 0 10px">Nothing filed under this category yet</p>
      <p style="font-size:14px;opacity:.66;margin:0 0 20px">This category is part of the editorial programme but has no published pieces.</p>
      <a href="#" id="uai-insight-reset" style="font:inherit;font-size:13px;background:none;border:1px solid var(--color-accent);color:var(--color-accent-700);padding:11px 20px;border-radius:2px;cursor:pointer;text-decoration:none;display:inline-block">View all categories</a>
    </div>
  </div>
</section>

<section style="background:#1b1a18;color:#f3f2f2;padding:clamp(44px,6vw,96px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(24px,3.4vw,60px);align-items:center">
    <div data-reveal="1">
      <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(24px,3.2vw,46px);line-height:1.06;margin:0 0 12px;max-width:26ch">Prefer a direct answer to a market question?</h2>
      <p style="font-size:14.5px;line-height:1.8;opacity:.7;margin:0;max-width:50ch">The desks answer sourcing and logistics questions in writing. Ask, and we will respond with what we know and what we do not.</p>
    </div>
    <div data-reveal="1" style="display:flex;gap:12px;flex-wrap:wrap">
      <a class="uai-btn-accent" href="contact.html">Contact Our Team <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
    </div>
  </div>
</section>`;
}

module.exports = build;
