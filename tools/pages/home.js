"use strict";
const { D, esc, attr, altOf } = require("../build.js");

function build() {
  const heroStrip = [
    { t: "Oman-based", s: "Muscat commercial base" },
    { t: "Eight sectors", s: "Trade, logistics, industry" },
    { t: "International", s: "Cross-border sourcing" },
    { t: "B2B focused", s: "Business-to-business only" },
  ];
  const pillars = [
    { t: "Oman-based", s: "Registered and operating from Muscat." },
    { t: "Multi-sector", s: "Eight commercial desks under one group." },
    { t: "International outlook", s: "Sourcing beyond the home market." },
    { t: "B2B focused", s: "Companies, projects and institutions." },
  ];
  const functions = [
    { num: "01", t: "Source", s: "Find products and qualified suppliers against a real specification, then bring back comparable options.", tags: ["Supplier mapping", "Specification review", "Offer comparison"] },
    { num: "02", t: "Trade", s: "Act as the commercial party between international supply and regional demand, on agreed terms.", tags: ["Negotiation", "Contracting", "Documentation"] },
    { num: "03", t: "Move", s: "Coordinate freight, customs formalities, storage and inland delivery to the receiving point.", tags: ["Freight", "Customs", "Warehousing"] },
    { num: "04", t: "Support", s: "Carry the administration around the transaction and keep the client informed as it progresses.", tags: ["Reporting", "Follow-up", "Process"] },
  ];
  const enquiryRoutes = [
    { t: "Request a Quote", s: "Specification, quantity, destination", url: "forms.html#request-a-quote" },
    { t: "Become a Supplier", s: "Manufacturers, distributors, traders", url: "forms.html#become-a-supplier" },
    { t: "Partner With Us", s: "Commercial and logistics partnerships", url: "forms.html#partner-with-us" },
  ];

  const nodes = D.regions.map((r) => ({
    name: r.name, x: r.x, y: r.y,
    r: r.home ? 1.9 : 1.2,
    fill: r.home ? "#b68235" : "color-mix(in srgb,#b68235 30%,transparent)",
    labelStyle: "position:absolute;left:" + r.x + "%;top:" + r.y + "%;transform:translate(-50%,-190%);font-size:" +
      (r.home ? "13px" : "11.5px") + ";letter-spacing:.12em;text-transform:uppercase;color:" +
      (r.home ? "#b68235" : "color-mix(in srgb,#f3f2f2 72%,transparent)") + ";white-space:nowrap;pointer-events:none",
  }));
  const home = D.regions.filter((r) => r.home)[0];
  const arcs = D.regions.filter((r) => !r.home).map((r) => {
    const mx = (home.x + r.x) / 2, my = (home.y + r.y) / 2 - 12;
    return { d: "M" + home.x + " " + home.y + " Q" + mx + " " + my + " " + r.x + " " + r.y };
  });

  const heroStripHtml = heroStrip.map((h) => `
        <div style="padding:16px 0;border-left:1px solid color-mix(in srgb,#f3f2f2 12%,transparent);padding-left:16px">
          <p style="font-family:var(--font-heading);font-size:15px;margin:0 0 2px">${esc(h.t)}</p>
          <p style="font-size:11px;opacity:.5;margin:0;letter-spacing:.04em">${esc(h.s)}</p>
        </div>`).join("");

  const pillarsHtml = pillars.map((p) => `
        <div style="background:var(--color-bg);padding:18px 16px 20px">
          <p style="font-family:var(--font-heading);font-size:17px;margin:0 0 5px">${esc(p.t)}</p>
          <p style="font-size:11.5px;line-height:1.55;opacity:.6;margin:0">${esc(p.s)}</p>
        </div>`).join("");

  const sectorCardsHtml = D.sectors.map((s) => `
      <a data-reveal="1" data-zoom="1" href="sectors.html#${attr(s.slug)}" style="position:relative;display:flex;flex-direction:column;justify-content:flex-end;min-height:clamp(300px,30vw,430px);background:#1b1a18;color:#f3f2f2;text-decoration:none;overflow:hidden">
        <img src="${attr(s.card)}" alt="${attr(altOf(s.card) || s.title)}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.5;filter:sepia(.16) saturate(.72)">
        <span style="position:absolute;inset:0;background:linear-gradient(to top,color-mix(in srgb,#1b1a18 92%,transparent) 8%,color-mix(in srgb,#1b1a18 42%,transparent) 62%,transparent)"></span>
        <span style="position:relative;padding:clamp(20px,2vw,30px)">
          <span style="display:block;font-size:11px;letter-spacing:.2em;color:var(--color-accent);font-variant-numeric:tabular-nums;margin-bottom:12px">${esc(s.num)}</span>
          <span style="display:block;font-family:var(--font-heading);font-size:clamp(21px,1.7vw,27px);line-height:1.15;margin-bottom:9px">${esc(s.title)}</span>
          <span style="display:block;font-size:12.5px;line-height:1.65;opacity:.7;max-width:34ch;margin-bottom:16px">${esc(s.blurb)}</span>
          <span style="display:inline-flex;align-items:center;gap:9px;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-accent)">Explore Sector <span data-arrow="1" style="display:inline-block">&#8594;</span></span>
        </span>
      </a>`).join("");

  const functionsHtml = functions.map((f) => `
      <div data-reveal="1" style="background:#1b1a18;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:clamp(14px,2.5vw,44px);padding:clamp(22px,2.6vw,38px) 0;align-items:baseline">
        <div style="display:flex;gap:18px;align-items:baseline">
          <span style="font-size:11.5px;color:var(--color-accent);font-variant-numeric:tabular-nums">${esc(f.num)}</span>
          <h3 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(22px,2.2vw,34px);margin:0;line-height:1.15">${esc(f.t)}</h3>
        </div>
        <p style="font-size:14px;line-height:1.8;opacity:.7;margin:0;max-width:52ch">${esc(f.s)}</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          ${f.tags.map((t) => `<span style="font-size:11px;letter-spacing:.06em;border:1px solid color-mix(in srgb,#f3f2f2 22%,transparent);padding:5px 11px;border-radius:2px;opacity:.75">${esc(t)}</span>`).join("")}
        </div>
      </div>`).join("");

  const solutionCardsHtml = D.solutions.map((s) => `
      <a data-reveal="1" class="uai-tile-hover" href="solutions.html#${attr(s.slug)}" style="background:var(--color-bg);padding:clamp(20px,2vw,30px);text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:10px;min-height:200px">
        <span style="font-family:var(--font-heading);font-size:19px;line-height:1.2">${esc(s.name)}</span>
        <span style="font-size:13px;line-height:1.7;opacity:.7;flex:1">${esc(s.short)}</span>
        <span style="display:flex;gap:7px;flex-wrap:wrap;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-accent)">
          ${s.process.slice(0, 3).map((p) => `<span>${esc(p)}</span>`).join("")}
        </span>
      </a>`).join("");

  const industryCardsHtml = D.industries.slice(0, 8).map((i) => `
      <a data-reveal="1" data-zoom="1" href="industries.html#${attr(i.slug)}" style="text-decoration:none;color:inherit;display:block">
        <span style="display:block;overflow:hidden;background:#1b1a18;border:6px solid var(--color-bg);outline:1px solid var(--color-divider)">
          <img src="${attr(i.img)}" alt="${attr(altOf(i.img) || i.name + " industry imagery")}" loading="lazy" style="width:100%;height:clamp(140px,13vw,190px);object-fit:cover;filter:sepia(.2) saturate(.78) contrast(1.04)">
        </span>
        <span style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 2px 0">
          <span style="font-family:var(--font-heading);font-size:17px">${esc(i.name)}</span>
          <span data-arrow="1" style="color:var(--color-accent);font-size:13px;display:inline-block">&#8594;</span>
        </span>
        <span style="display:block;font-size:12px;line-height:1.6;opacity:.62;padding:5px 2px 0">${esc(i.text)}</span>
      </a>`).join("");

  const arcsHtml = arcs.map((a) => `<path d="${attr(a.d)}" fill="none" stroke="#b68235" stroke-width=".35" stroke-dasharray="2.4 2.4" opacity=".75" style="animation:uai-dash 26s linear infinite"></path>`).join("");
  const nodesCircleHtml = nodes.map((n) => `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${n.fill}" stroke="#b68235" stroke-width=".3"></circle>`).join("");
  const nodesLabelHtml = nodes.map((n) => `<span style="${n.labelStyle}">${esc(n.name)}</span>`).join("");

  const processHtml = D.process.map((p) => `
      <div data-reveal="1" style="border-top:1px solid var(--color-divider);padding:clamp(20px,2.2vw,32px) clamp(18px,2vw,30px) clamp(26px,3vw,44px) 0;position:relative">
        <span style="position:absolute;top:-1px;left:0;width:34px;height:1px;background:var(--color-accent)"></span>
        <p style="font-size:11.5px;color:var(--color-accent);font-variant-numeric:tabular-nums;letter-spacing:.16em;margin:0 0 14px">${esc(p.num)}</p>
        <h3 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(22px,2vw,30px);margin:0 0 10px">${esc(p.name)}</h3>
        <p style="font-size:13.5px;line-height:1.75;opacity:.68;margin:0;max-width:34ch">${esc(p.text)}</p>
      </div>`).join("");

  const whyHtml = D.why.map((w) => `
      <div data-reveal="1" style="border:1px solid var(--color-divider);border-radius:2px;padding:clamp(20px,2.2vw,30px);background:var(--color-bg);display:flex;flex-direction:column;gap:10px" class="uai-card-hover">
        <span style="width:7px;height:7px;background:var(--color-accent);display:block;transform:rotate(45deg);margin-bottom:6px"></span>
        <h3 style="font-family:var(--font-heading);font-weight:400;font-size:22px;margin:0">${esc(w.name)}</h3>
        <p style="font-size:13.5px;line-height:1.75;opacity:.7;margin:0">${esc(w.text)}</p>
      </div>`).join("");

  // "Smart business finder" — one panel per sector, toggled by script.js;
  // all pre-rendered (static HTML), just hidden/shown, so it works with
  // JS disabled too (all panels reachable via their own #anchor).
  const finderOptionsHtml = D.finder.map((f) => `<button class="uai-finder-btn" data-finder-btn data-slug="${attr(f.slug)}" aria-pressed="false" style="font:inherit;font-size:13.5px;cursor:pointer;padding:12px 20px;border-radius:2px;background:transparent;border:1px solid var(--color-divider);color:inherit;transition:all .25s ease">${esc(f.label)}</button>`).join("");
  const finderPanelsHtml = D.sectors.map((s, i) => `
      <div class="uai-finder-panel" data-finder-panel="${attr(s.slug)}" id="finder-${attr(s.slug)}" style="${i === 0 ? "" : "display:none;"}max-width:1000px;margin:clamp(24px,3vw,40px) auto 0;border:1px solid var(--color-divider);background:var(--color-surface);animation:uai-fade .4s ease both;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))" ${i === 0 ? 'data-finder-hidden="1" hidden' : "hidden"}>
        <div style="padding:clamp(22px,2.6vw,38px)">
          <p style="font-size:11px;letter-spacing:.2em;color:var(--color-accent);font-variant-numeric:tabular-nums;margin:0 0 12px">${esc(s.num)} &mdash; Recommended desk</p>
          <h3 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(24px,2.6vw,38px);line-height:1.1;margin:0 0 12px">${esc(s.title)}</h3>
          <p style="font-size:14px;line-height:1.78;opacity:.72;margin:0 0 22px;max-width:44ch">${esc(s.blurb)}</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <a class="uai-btn-accent" href="sectors.html#${attr(s.slug)}">Open sector <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
            <a href="forms.html#request-a-quote" style="display:inline-flex;align-items:center;gap:9px;padding:12px 20px;border:1px solid var(--color-divider);color:inherit;text-decoration:none;font-family:var(--font-heading);font-size:13.5px;border-radius:2px">Request a Quote</a>
          </div>
        </div>
        <div style="min-height:190px;background:#1b1a18;overflow:hidden">
          <img src="${attr(s.hero)}" alt="${attr(s.title)}" style="width:100%;height:100%;min-height:190px;object-fit:cover;opacity:.85;filter:sepia(.18) saturate(.75)">
        </div>
      </div>`).join("");

  const insightCategoriesHtml = D.insightCategories.map((c) => `<a href="insights.html" style="border:1px solid var(--color-divider);padding:9px 16px;border-radius:2px;font-size:13px;text-decoration:none;color:inherit" class="uai-chip-hover">${esc(c)}</a>`).join("");

  const enquiryRoutesHtml = enquiryRoutes.map((e) => `
      <a class="uai-row-hover-dark" href="${attr(e.url)}" style="background:#1b1a18;padding:clamp(18px,2vw,26px);text-decoration:none;color:inherit;display:flex;align-items:center;justify-content:space-between;gap:18px">
        <span>
          <span style="display:block;font-family:var(--font-heading);font-size:21px;margin-bottom:4px">${esc(e.t)}</span>
          <span style="display:block;font-size:12.5px;opacity:.6">${esc(e.s)}</span>
        </span>
        <span data-arrow="1" style="color:var(--color-accent);font-size:16px;display:inline-block">&#8594;</span>
      </a>`).join("");

  return `<section aria-label="Introduction" style="position:relative;min-height:min(92vh,900px);display:flex;flex-direction:column;justify-content:flex-end;background:#1b1a18;color:#f3f2f2;overflow:hidden">
  <img src="${attr(D.img.heroPort)}" alt="${attr(altOf(D.img.heroPort))}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.46;filter:sepia(.18) saturate(.72) contrast(1.06);animation:uai-drift 24s ease-in-out infinite alternate">
  <div style="position:absolute;inset:0;background:linear-gradient(to top,#1b1a18 4%,color-mix(in srgb,#1b1a18 74%,transparent) 42%,color-mix(in srgb,#1b1a18 32%,transparent))"></div>
  <div style="position:relative;width:100%;max-width:1560px;margin:auto auto 0;padding:clamp(96px,14vh,180px) clamp(18px,3.4vw,56px) clamp(30px,4vw,54px)">
    <p style="display:flex;align-items:center;gap:14px;font-size:10.5px;letter-spacing:.28em;text-transform:uppercase;color:var(--color-accent);margin:0 0 clamp(18px,2.4vw,30px);animation:uai-fade .8s ease both">
      <span style="width:46px;height:1px;background:var(--color-accent);display:inline-block"></span>
      Muscat, Sultanate of Oman
    </p>
    <h1 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(40px,7.6vw,116px);line-height:.98;letter-spacing:-.02em;margin:0 0 clamp(20px,2.6vw,34px);max-width:19ch;text-wrap:balance">
      <span style="display:block;animation:uai-fade .9s ease .05s both">Building Connections.</span>
      <span style="display:block;animation:uai-fade .9s ease .18s both">Moving Industries.</span>
      <span style="display:block;color:var(--color-accent);animation:uai-fade .9s ease .31s both">Creating Value.</span>
    </h1>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(22px,3vw,56px);align-items:end;animation:uai-fade 1s ease .42s both">
      <p style="font-size:clamp(14.5px,1.16vw,17px);line-height:1.78;opacity:.78;margin:0;max-width:60ch">${esc(D.brand.description)}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-start">
        <a class="uai-btn-accent" href="sectors.html" style="white-space:nowrap">Explore Our Business <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
        <a class="uai-btn-outline-light" href="forms.html#request-a-quote" style="white-space:nowrap">Request a Quote</a>
      </div>
    </div>
  </div>
  <div style="position:relative;width:100%;border-top:1px solid color-mix(in srgb,#f3f2f2 16%,transparent)">
    <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">${heroStripHtml}
    </div>
  </div>
</section>

<section aria-labelledby="uai-intro" style="background:var(--color-bg);padding:clamp(56px,8vw,130px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:clamp(32px,5vw,86px);align-items:start">
    <div data-reveal="1">
      <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 20px">Who we are</p>
      <h2 id="uai-intro" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(32px,4.2vw,68px);line-height:1.04;letter-spacing:-.015em;margin:0 0 clamp(20px,2.4vw,30px);max-width:16ch">Built Around Opportunity</h2>
      <p style="font-size:15.5px;line-height:1.85;margin:0 0 18px;text-align:justify;hyphens:auto;max-width:56ch">United Assets Investments brings together a diversified range of business activities designed to connect commercial opportunities across regional and international markets. The group is structured so that a client with a mixed requirement &mdash; materials, equipment, freight and the paperwork around them &mdash; can deal with one commercial party rather than five.</p>
      <p style="font-size:15.5px;line-height:1.85;margin:0 0 28px;text-align:justify;hyphens:auto;max-width:56ch;opacity:.82">Our approach combines strategic sourcing, trading, logistics coordination, industrial supply and business development. Oman is our base and our advantage: a trading position on the Arabian Sea with direct routes to the Gulf, East Africa and South Asia.</p>
      <a class="uai-underline-link" href="about.html">Read more <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
      <div data-grid-fill="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1px;background:var(--color-divider);margin-top:clamp(34px,4vw,52px)">${pillarsHtml}
      </div>
    </div>
    <figure data-reveal="1" style="margin:0">
      <div class="plate" style="border-width:8px">
        <img src="${attr(D.img.terminal)}" alt="${attr(altOf(D.img.terminal))}" style="width:100%;height:clamp(320px,50vw,660px);object-fit:cover">
      </div>
      <figcaption style="font-size:11px;margin-top:10px;opacity:.55;letter-spacing:.04em">Sea freight remains the backbone of regional industrial supply.</figcaption>
    </figure>
  </div>
</section>

<section aria-labelledby="uai-sectors" style="background:var(--color-surface);padding:clamp(56px,8vw,120px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <div data-reveal="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(18px,3vw,60px);align-items:end;padding-bottom:clamp(30px,4vw,56px);border-bottom:1px solid var(--color-divider)">
      <div>
        <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">Eight sectors</p>
        <h2 id="uai-sectors" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(32px,4.4vw,72px);line-height:1.03;letter-spacing:-.015em;margin:0">Our Business Sectors</h2>
      </div>
      <p style="font-size:15px;line-height:1.8;opacity:.72;margin:0;max-width:46ch">A diversified platform built to serve multiple industries and commercial requirements &mdash; each sector run as its own commercial desk, with shared logistics and administration behind it.</p>
    </div>
    <div data-grid-fill="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr));gap:1px;background:var(--color-divider)">${sectorCardsHtml}
    </div>
  </div>
</section>

<section aria-labelledby="uai-what" style="background:#1b1a18;color:#f3f2f2;padding:clamp(56px,8vw,120px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <div data-reveal="1" style="max-width:60ch;margin-bottom:clamp(34px,4.5vw,64px)">
      <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">What we do</p>
      <h2 id="uai-what" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(30px,4.2vw,66px);line-height:1.05;letter-spacing:-.015em;margin:0 0 20px">Four functions, one commercial file</h2>
      <p style="font-size:15px;line-height:1.8;opacity:.68;margin:0">Most requirements need more than one of these. We keep them under a single point of accountability so the handovers do not become the client's problem.</p>
    </div>
    <div style="display:grid;gap:1px;background:color-mix(in srgb,#f3f2f2 14%,transparent)">${functionsHtml}
    </div>
  </div>
</section>

<section aria-labelledby="uai-solutions" style="background:var(--color-bg);padding:clamp(56px,8vw,120px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <div data-reveal="1" style="display:flex;flex-wrap:wrap;gap:20px;align-items:flex-end;justify-content:space-between;margin-bottom:clamp(28px,3.5vw,50px)">
      <div>
        <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">Strategic solutions</p>
        <h2 id="uai-solutions" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(30px,4.2vw,66px);line-height:1.04;margin:0;max-width:22ch">How we engage with a requirement</h2>
      </div>
      <a class="uai-underline-link" href="solutions.html">All solutions <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
    </div>
    <div data-grid-fill="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));gap:1px;background:var(--color-divider)">${solutionCardsHtml}
    </div>
  </div>
</section>

<section aria-labelledby="uai-industries" style="background:var(--color-surface);padding:clamp(56px,8vw,120px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <div data-reveal="1" style="display:flex;flex-wrap:wrap;gap:20px;align-items:flex-end;justify-content:space-between;margin-bottom:clamp(28px,3.5vw,50px)">
      <div>
        <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">Industries</p>
        <h2 id="uai-industries" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(30px,4.2vw,66px);line-height:1.04;margin:0">Where our supply lands</h2>
      </div>
      <a class="uai-underline-link" href="industries.html">All industries <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,230px),1fr));gap:clamp(12px,1.4vw,20px)">${industryCardsHtml}
    </div>
  </div>
</section>

<section aria-labelledby="uai-reach" style="background:#1b1a18;color:#f3f2f2;padding:clamp(56px,8vw,120px) 0;overflow:hidden">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:clamp(30px,4vw,70px);align-items:center">
    <div data-reveal="1">
      <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">Global reach</p>
      <h2 id="uai-reach" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(30px,4.2vw,66px);line-height:1.04;margin:0 0 22px">Oman. Connected to the World.</h2>
      <p style="font-size:15px;line-height:1.82;opacity:.72;margin:0 0 18px;max-width:52ch">Oman sits outside the Strait of Hormuz with deep-water ports on open sea routes &mdash; a practical advantage for cargo moving between Asia, the Gulf, East Africa and Europe.</p>
      <p style="font-size:13.5px;line-height:1.75;opacity:.5;margin:0 0 28px;max-width:52ch">The markets shown are commercial corridors we source and supply through. They do not represent branch offices or owned facilities.</p>
      <a class="uai-btn-accent" href="reach.html">See our market corridors <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
    </div>
    <div data-reveal="1" style="position:relative">
      <svg viewBox="0 0 100 62" style="width:100%;height:auto;overflow:visible" role="img" aria-label="Schematic diagram of trade corridors radiating from Oman toward GCC, Asia, Europe and Africa">${arcsHtml}${nodesCircleHtml}
      </svg>${nodesLabelHtml}
    </div>
  </div>
</section>

<section aria-labelledby="uai-process" style="background:var(--color-bg);padding:clamp(56px,8vw,120px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <div data-reveal="1" style="max-width:56ch;margin-bottom:clamp(30px,4vw,58px)">
      <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">How we work</p>
      <h2 id="uai-process" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(30px,4.2vw,66px);line-height:1.04;margin:0">From requirement to repeat business</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:0">${processHtml}
    </div>
  </div>
</section>

<section aria-labelledby="uai-why" style="background:var(--color-surface);padding:clamp(56px,8vw,120px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <div data-reveal="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(20px,3vw,60px);align-items:end;margin-bottom:clamp(28px,3.5vw,50px)">
      <h2 id="uai-why" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(32px,4.4vw,70px);line-height:1.03;margin:0">Why United Assets?</h2>
      <p style="font-size:14.5px;line-height:1.8;opacity:.7;margin:0;max-width:46ch">Six reasons clients give when they come back &mdash; stated plainly, without the superlatives.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,290px),1fr));gap:clamp(14px,1.6vw,24px)">${whyHtml}
    </div>
  </div>
</section>

<section aria-labelledby="uai-finder" style="background:var(--color-bg);padding:clamp(56px,8vw,120px) 0;border-top:1px solid var(--color-divider)">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <div data-reveal="1" style="text-align:center;max-width:52ch;margin:0 auto clamp(28px,3.5vw,48px)">
      <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">Smart business finder</p>
      <h2 id="uai-finder" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(30px,4.2vw,64px);line-height:1.05;margin:0 0 14px">What Are You Looking For?</h2>
      <p style="font-size:14.5px;line-height:1.8;opacity:.7;margin:0">Pick a requirement and we'll point you at the right desk.</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:1000px;margin:0 auto">${finderOptionsHtml}
    </div>${finderPanelsHtml}
  </div>
</section>

<section aria-label="Business enquiry" style="position:relative;background:#1b1a18;color:#f3f2f2;overflow:hidden">
  <img src="${attr(D.img.earthworks)}" alt="${attr(altOf(D.img.earthworks))}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.3;filter:sepia(.2) saturate(.7)">
  <div style="position:relative;max-width:1560px;margin:0 auto;padding:clamp(56px,8vw,124px) clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(26px,4vw,64px);align-items:center">
    <div data-reveal="1">
      <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">Business enquiry</p>
      <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(30px,4.2vw,66px);line-height:1.04;margin:0 0 18px;max-width:22ch">Send us the specification. We'll come back with the route.</h2>
      <p style="font-size:15px;line-height:1.8;opacity:.72;margin:0;max-width:50ch">Quantities, drawings, standards, destination and required date &mdash; whatever you have. If it is a single line item or a full project take-off, the process is the same.</p>
    </div>
    <div data-reveal="1" style="display:grid;gap:1px;background:color-mix(in srgb,#f3f2f2 16%,transparent)">${enquiryRoutesHtml}
    </div>
  </div>
</section>

<section aria-labelledby="uai-insights" style="background:var(--color-bg);padding:clamp(56px,8vw,110px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(28px,4vw,70px);align-items:start">
    <div data-reveal="1">
      <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">Insights</p>
      <h2 id="uai-insights" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(30px,4.2vw,62px);line-height:1.04;margin:0 0 18px">Notes on trade, logistics and supply</h2>
      <p style="font-size:14.5px;line-height:1.8;opacity:.7;margin:0 0 22px;max-width:48ch">Our editorial programme covers procurement practice, regional trade conditions and industrial supply. The first pieces are in preparation &mdash; the categories below show what we will publish.</p>
      <a class="uai-underline-link" href="insights.html">Go to Insights <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
    </div>
    <div data-reveal="1" style="display:flex;flex-wrap:wrap;gap:9px">${insightCategoriesHtml}
    </div>
  </div>
</section>

<section aria-label="Contact" style="background:var(--color-surface);border-top:1px solid var(--color-divider);padding:clamp(48px,6vw,96px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:flex;flex-wrap:wrap;gap:clamp(22px,3vw,50px);align-items:center;justify-content:space-between">
    <div data-reveal="1">
      <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(28px,3.6vw,56px);line-height:1.05;margin:0 0 10px">Let's start a conversation</h2>
      <p style="font-size:14.5px;line-height:1.75;opacity:.7;margin:0;max-width:48ch">${esc(D.contact.location + " · " + D.contact.hours)}</p>
    </div>
    <div data-reveal="1" style="display:flex;gap:12px;flex-wrap:wrap">
      <a class="uai-btn-accent" href="contact.html">Contact Our Team <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
      <a href="forms.html#become-a-supplier" style="display:inline-flex;align-items:center;gap:9px;padding:15px 26px;border:1px solid var(--color-divider);color:inherit;text-decoration:none;font-family:var(--font-heading);font-size:14px;border-radius:2px">Become a Supplier</a>
    </div>
  </div>
</section>`;
}

module.exports = build;
