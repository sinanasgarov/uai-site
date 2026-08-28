"use strict";
const { D, esc, attr, altOf } = require("../build.js");

function build() {
  const sectorTitle = (slug) => {
    const x = D.sectorBySlug(slug);
    return x ? x.nav : slug;
  };

  const cards = D.industries.map((i) => {
    const tags = i.sectors.slice(0, 3).map((s) => sectorTitle(s));
    return `
        <a data-reveal="1" data-zoom="1" id="${attr(i.slug)}" href="#${attr(i.slug)}" style="scroll-margin-top:96px;text-decoration:none;color:inherit;display:flex;flex-direction:column;border:1px solid var(--color-divider);background:var(--color-bg)" class="uai-card-hover">
          <span style="display:block;overflow:hidden;background:#1b1a18">
            <img src="${attr(i.img)}" alt="${attr(altOf(i.img) || i.name + " industry imagery")}" loading="lazy" style="width:100%;height:clamp(170px,17vw,230px);object-fit:cover;filter:sepia(.19) saturate(.76)">
          </span>
          <span style="padding:18px 20px 22px;display:flex;flex-direction:column;gap:9px;flex:1">
            <span style="display:flex;align-items:center;justify-content:space-between;gap:10px">
              <span style="font-family:var(--font-heading);font-size:21px">${esc(i.name)}</span>
              <span data-arrow="1" style="color:var(--color-accent);font-size:13px;display:inline-block">&#8594;</span>
            </span>
            <span style="font-size:13px;line-height:1.7;opacity:.7;flex:1">${esc(i.text)}</span>
            <span style="display:flex;flex-wrap:wrap;gap:6px;padding-top:10px;border-top:1px solid var(--color-divider)">
              ${tags.map((t) => `<span style="font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-accent-700);opacity:.9">${esc(t)}</span>`).join("")}
            </span>
          </span>
        </a>`;
  }).join("");

  return `<section aria-labelledby="in-title" style="position:relative;background:#1b1a18;color:#f3f2f2;overflow:hidden">
  <img src="${attr(D.img.welding)}" alt="${attr(altOf(D.img.welding))}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.3;filter:sepia(.2) saturate(.7)">
  <div style="position:relative;max-width:1560px;margin:0 auto;padding:clamp(64px,10vw,150px) clamp(18px,3.4vw,56px) clamp(44px,6vw,88px)">
    <nav aria-label="Breadcrumb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.6;margin-bottom:24px">
      <a href="index.html" style="color:inherit;text-decoration:none">Home</a> <span style="opacity:.5">/</span> <span style="color:var(--color-accent)">Industries</span>
    </nav>
    <h1 id="in-title" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(36px,6.4vw,94px);line-height:1;letter-spacing:-.02em;margin:0 0 20px;max-width:18ch">Industries We Serve</h1>
    <p style="font-size:clamp(14.5px,1.1vw,17px);line-height:1.8;opacity:.76;margin:0;max-width:62ch">Eleven client contexts, each with a different definition of &ldquo;on time&rdquo;. The sectors we draw on change; the discipline does not.</p>
  </div>
</section>

<section style="background:var(--color-bg);padding:clamp(44px,6vw,96px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:clamp(16px,2vw,28px)">${cards}
  </div>
</section>

<section style="background:var(--color-surface);border-top:1px solid var(--color-divider);padding:clamp(44px,6vw,96px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(24px,3.4vw,56px);align-items:center">
    <div data-reveal="1">
      <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(24px,3.2vw,46px);line-height:1.06;margin:0 0 12px;max-width:26ch">Working in your industry?</h2>
      <p style="font-size:14.5px;line-height:1.8;opacity:.72;margin:0;max-width:50ch">Tell us the requirement and the date it has to be on site. We will confirm what is realistic before quoting.</p>
    </div>
    <div data-reveal="1" style="display:flex;gap:12px;flex-wrap:wrap">
      <a class="uai-btn-accent" href="forms.html#request-a-quote">Request a Quote <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
      <a href="sectors.html" style="display:inline-flex;align-items:center;gap:9px;padding:15px 26px;border:1px solid var(--color-divider);color:inherit;text-decoration:none;font-family:var(--font-heading);font-size:14px;border-radius:2px">Explore Our Business</a>
    </div>
  </div>
</section>`;
}

module.exports = build;
