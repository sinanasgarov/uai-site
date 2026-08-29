"use strict";
const { D, esc, attr, altOf } = require("../build.js");

function build() {
  const regions = D.regions;
  const home = regions.filter((r) => r.home)[0];

  const nodes = regions.map((r, i) => ({
    i, name: r.name, x: r.x, y: r.y,
    r: r.home ? 2.1 : 1.2,
    fill: r.home ? "#b68235" : "color-mix(in srgb,#b68235 28%,transparent)",
  }));
  const arcs = regions.filter((r) => !r.home).map((r) => {
    const mx = (home.x + r.x) / 2, my = (home.y + r.y) / 2 - 13;
    return "M" + home.x + " " + home.y + " Q" + mx + " " + my + " " + r.x + " " + r.y;
  });

  const btnStyle = (i) => "position:absolute;left:" + regions[i].x + "%;top:" + regions[i].y + "%;transform:translate(-50%,-210%);background:none;border:0;cursor:pointer;font:inherit;font-size:" +
    (regions[i].home ? "13px" : "11.5px") + ";letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;padding:4px 6px;color:" +
    (regions[i].home || i === 0 ? "#b68235" : "color-mix(in srgb,#f3f2f2 68%,transparent)") +
    ";border-bottom:1px solid " + (i === 0 ? "#b68235" : "transparent") + ";transition:color .25s ease";

  const nodeButtons = nodes.map((n) => `<button class="uai-region-btn" data-region-btn data-i="${n.i}" aria-pressed="${n.i === 0}" style="${btnStyle(n.i)}">${esc(n.name)}</button>`).join("\n        ");
  const nodeCircles = nodes.map((n) => `<circle class="uai-region-dot" data-region-dot data-i="${n.i}" cx="${n.x}" cy="${n.y}" r="${n.i === 0 ? n.r : 1.2}" fill="${n.i === 0 ? "#b68235" : n.fill}" stroke="#b68235" stroke-width=".3"></circle>`).join("\n          ");
  const arcPaths = arcs.map((d) => `<path d="${attr(d)}" fill="none" stroke="#b68235" stroke-width=".38" stroke-dasharray="2.6 2.6" opacity=".8" style="animation:uai-dash 28s linear infinite"></path>`).join("\n          ");
  const ringCircles = [{ r: 7, o: ".5" }, { r: 14, o: ".32" }, { r: 22, o: ".18" }]
    .map((r) => `<circle cx="${home.x}" cy="${home.y}" r="${r.r}" fill="none" stroke="#b68235" stroke-width=".18" opacity="${r.o}"></circle>`).join("\n          ");

  const panels = regions.map((r, i) => {
    const note = r.note + (r.home
      ? " &mdash; Muscat is the commercial base from which sourcing, trading and coordination are run."
      : " &mdash; sourcing and supply activity is conducted through established commercial relationships in this market.");
    return `<div class="uai-region-panel" data-region-panel data-i="${i}"${i === 0 ? "" : " hidden"}>
          <p style="font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--color-accent);margin:0 0 14px">Selected corridor</p>
          <h3 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(24px,2.6vw,38px);margin:0 0 12px">${esc(r.name)}</h3>
          <p style="font-size:14.5px;line-height:1.8;opacity:.75;margin:0">${note}</p>
        </div>`;
  }).join("\n        ");

  const advantages = [
    { t: "Open-sea access", s: "Ports on the Arabian Sea sit outside the Strait of Hormuz, on direct routes to South Asia and East Africa." },
    { t: "Gulf adjacency", s: "Road and short-sea access to neighbouring GCC markets for onward distribution." },
    { t: "Trade orientation", s: "Oman’s commercial framework is built around re-export and transit trade." },
    { t: "Neutral counterparty", s: "A regional partner able to deal with suppliers and buyers across several markets." },
  ];
  const advantagesHtml = advantages.map((a) => `
      <div data-reveal="1" style="background:var(--color-bg);padding:clamp(20px,2.2vw,32px);display:flex;flex-direction:column;gap:10px;min-height:180px">
        <span style="width:6px;height:6px;background:var(--color-accent);transform:rotate(45deg);display:block"></span>
        <h3 style="font-family:var(--font-heading);font-weight:400;font-size:21px;margin:6px 0 0">${esc(a.t)}</h3>
        <p style="font-size:13.5px;line-height:1.78;opacity:.72;margin:0">${esc(a.s)}</p>
      </div>`).join("");

  return `<section aria-labelledby="gr-title" style="position:relative;background:#1b1a18;color:#f3f2f2;overflow:hidden">
  <img src="${attr(D.img.terminal)}" alt="${attr(altOf(D.img.terminal))}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.28;filter:sepia(.2) saturate(.7)">
  <div style="position:relative;max-width:1560px;margin:0 auto;padding:clamp(64px,10vw,150px) clamp(18px,3.4vw,56px) clamp(40px,5vw,80px)">
    <nav aria-label="Breadcrumb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.6;margin-bottom:24px">
      <a href="index.html" style="color:inherit;text-decoration:none">Home</a> <span style="opacity:.5">/</span> <span style="color:var(--color-accent)">Global Reach</span>
    </nav>
    <h1 id="gr-title" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(36px,6.4vw,94px);line-height:1;letter-spacing:-.02em;margin:0 0 20px;max-width:20ch">Oman. Connected to the World.</h1>
    <p style="font-size:clamp(14.5px,1.1vw,17px);line-height:1.8;opacity:.76;margin:0;max-width:62ch">Our commercial base sits on the Arabian Sea, outside the Strait of Hormuz &mdash; on the open-water side of Gulf logistics. The corridors below are the routes we source and supply along.</p>
  </div>
</section>

<section aria-labelledby="gr-map" style="background:#1b1a18;color:#f3f2f2;padding:0 0 clamp(50px,7vw,110px)">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <h2 id="gr-map" style="position:absolute;left:-9999px">Trade corridor diagram</h2>
    <div style="border-top:1px solid color-mix(in srgb,#f3f2f2 16%,transparent);padding-top:clamp(24px,3vw,44px);display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(26px,3.6vw,64px);align-items:center">
      <div style="position:relative">
        <svg viewBox="0 0 100 68" style="width:100%;height:auto;overflow:visible" role="img" aria-label="Diagram: Oman at the centre with corridors radiating to GCC, Middle East, Asia, Europe and Africa">
          ${ringCircles}
          ${arcPaths}
          ${nodeCircles}
        </svg>
        ${nodeButtons}
      </div>
      <div>
        <div style="border:1px solid color-mix(in srgb,#f3f2f2 18%,transparent);padding:clamp(22px,2.6vw,36px);margin-bottom:22px">
        ${panels}
        </div>
        <p style="font-size:13px;line-height:1.75;opacity:.5;margin:0 0 22px;max-width:52ch">These are commercial corridors &mdash; markets we source from and supply into. They do not represent branch offices, owned warehouses or fleets.</p>
        <a class="uai-btn-accent" href="forms.html#request-a-quote">Enquire about a market <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
      </div>
    </div>
  </div>
</section>

<section aria-labelledby="gr-why" style="background:var(--color-bg);padding:clamp(50px,7vw,110px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <div data-reveal="1" style="max-width:56ch;margin-bottom:clamp(26px,3.4vw,48px)">
      <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">Why Oman</p>
      <h2 id="gr-why" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(28px,3.8vw,58px);line-height:1.05;margin:0">A practical position, not a slogan</h2>
    </div>
    <div data-grid-fill="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:1px;background:var(--color-divider)">${advantagesHtml}
    </div>
  </div>
</section>

<section style="background:var(--color-surface);border-top:1px solid var(--color-divider);padding:clamp(46px,6vw,100px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(26px,4vw,70px);align-items:center">
    <figure data-reveal="1" style="margin:0">
      <div class="plate" style="border-width:8px">
        <img src="${attr(D.img.truck)}" alt="${attr(altOf(D.img.truck))}" loading="lazy" style="width:100%;height:clamp(240px,28vw,400px);object-fit:cover">
      </div>
      <figcaption style="font-size:11px;margin-top:10px;opacity:.55">Inland transport closes the gap between port and receiving point.</figcaption>
    </figure>
    <div data-reveal="1">
      <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(26px,3.4vw,50px);line-height:1.06;margin:0 0 16px;max-width:24ch">International suppliers: a route into the region</h2>
      <p style="font-size:15px;line-height:1.85;text-align:justify;hyphens:auto;opacity:.78;margin:0 0 24px;max-width:52ch">Manufacturers outside the region regularly find the commercial and administrative side harder than the product side. We provide the local counterparty: buyer introductions, documentation, and the follow-through that makes a first order become a second.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <a class="uai-btn-accent" href="forms.html#become-a-supplier">Become a Supplier <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
        <a href="forms.html#partner-with-us" style="display:inline-flex;align-items:center;gap:9px;padding:14px 24px;border:1px solid var(--color-divider);color:inherit;text-decoration:none;font-family:var(--font-heading);font-size:14px;border-radius:2px">Partner With Us</a>
      </div>
    </div>
  </div>
</section>`;
}

module.exports = build;
