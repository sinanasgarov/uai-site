"use strict";
const { D, esc, attr, altOf } = require("../build.js");

const FLOW_TEXT = {
  "Supplier": "Qualified sources are confirmed against the requirement, with production or dispatch dates put in writing.",
  "Sourcing": "Commercial terms, packing and documentation requirements are agreed before anything moves.",
  "Transportation": "Mode and routing are selected on cost, transit time and the nature of the cargo.",
  "Customs": "Import and export formalities are coordinated with clearing agents so paperwork precedes the cargo.",
  "Warehousing": "Storage is arranged where the delivery window and the arrival date do not match.",
  "Distribution": "Consignments are split, consolidated or staged for onward regional movement.",
  "Customer": "Delivery is scheduled to the receiving point, confirmed and closed out with documentation.",
  "Manufacturer": "Material is sourced from producers able to supply the grade and standard specified.",
  "Coordination": "Packages are sequenced against the construction programme, not against invoice convenience.",
  "Logistics": "Freight, handling and inland transport are arranged for the weight and length involved.",
  "Project": "Material arrives at site in the order the build needs it, with documentation on hand.",
};

const PLATE_CAPTIONS = {
  "administrative-services": "Documentation and correspondence carried on the client’s behalf.",
  "logistics-services": "Inland movement completes the chain after clearance.",
  "housewares": "Consolidated consignments prepared for regional distribution.",
  "electrical-electronic": "Commercial and industrial hardware supplied against specification.",
  "chemicals": "Industrial facilities are the receiving point for most of what we supply.",
  "equipment-machinery": "Plant and machinery placed with operators and contractors.",
  "building-materials": "Finishing packages follow the structural programme.",
  "iron-metal": "Sections and structures supplied to named standards.",
};

function build() {
  const indexRows = D.sectors.map((s, i) => {
    const order = i % 2 === 0 ? 0 : 2;
    const chips = (s.categories ? s.categories.slice(0, 4).map((c) => c.name)
      : s.groups ? s.groups.map((g) => g.name)
      : (s.services || []).slice(0, 4).map((v) => v.name));
    return `
        <article data-reveal="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(20px,3vw,54px);align-items:center;padding-bottom:clamp(28px,4vw,60px);border-bottom:1px solid var(--color-divider)">
          <a data-zoom="1" href="#${attr(s.slug)}" style="display:block;order:${order};overflow:hidden;border:7px solid var(--color-surface);outline:1px solid var(--color-divider)">
            <img src="${attr(s.card)}" alt="${attr(altOf(s.card) || s.title + " — sector imagery")}" loading="lazy" style="width:100%;height:clamp(230px,26vw,360px);object-fit:cover;filter:sepia(.2) saturate(.78) contrast(1.04)">
          </a>
          <div>
            <p style="font-size:11.5px;letter-spacing:.22em;color:var(--color-accent);font-variant-numeric:tabular-nums;margin:0 0 14px">${esc(s.num)} &middot; ${esc(s.kicker)}</p>
            <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(26px,3.2vw,48px);line-height:1.08;margin:0 0 14px">${esc(s.title)}</h2>
            <p style="font-size:15px;line-height:1.82;opacity:.75;margin:0 0 16px;max-width:52ch">${esc(s.blurb)}</p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px">
              ${chips.map((c) => `<span style="font-size:11.5px;border:1px solid var(--color-divider);padding:5px 11px;border-radius:2px;opacity:.75">${esc(c)}</span>`).join("")}
            </div>
            <a href="#${attr(s.slug)}" style="display:inline-flex;align-items:center;gap:9px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-accent-700);text-decoration:none;border-bottom:1px solid color-mix(in srgb,#b68235 40%,transparent);padding-bottom:4px">Explore Sector <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
          </div>
        </article>`;
  }).join("");

  const detailBlocks = D.sectors.map((s) => {
    const chain = s.chain || null;
    const flowKicker = s.slug === "logistics-services" ? "The chain" : "Supply route";
    const flowTitle = s.slug === "logistics-services" ? "Seven stages, one point of contact" : "From manufacturer to project";

    const flowButtons = chain ? chain.map((name, i) => `
            <button class="uai-flow-btn" data-flow-group="${attr(s.slug)}" data-flow-btn data-i="${i}" aria-pressed="${i === 0}" style="appearance:none;font:inherit;cursor:pointer;text-align:left;color:inherit;padding:clamp(16px,1.8vw,26px) clamp(14px,1.4vw,20px);background:${i === 0 ? "color-mix(in srgb,#b68235 14%,transparent)" : "transparent"};border:0;border-bottom:1px solid color-mix(in srgb,#f3f2f2 18%,transparent);border-right:1px solid color-mix(in srgb,#f3f2f2 18%,transparent);transition:background .25s ease;box-shadow:${i === 0 ? "inset 0 2px 0 0 #b68235" : "none"}">
              <span style="display:block;font-size:11px;font-variant-numeric:tabular-nums;letter-spacing:.16em;color:var(--color-accent);margin-bottom:10px">0${i + 1}</span>
              <span style="display:block;font-family:var(--font-heading);font-size:clamp(16px,1.4vw,21px);line-height:1.2">${esc(name)}</span>
            </button>`).join("") : "";
    const flowPanels = chain ? chain.map((name, i) => `<div class="uai-flow-panel" data-flow-group="${attr(s.slug)}" data-flow-panel data-i="${i}"${i === 0 ? "" : " hidden"}>
            <h3 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(22px,2.2vw,32px);margin:0;color:var(--color-accent)">${esc(name)}</h3>
            <p style="font-size:14.5px;line-height:1.8;opacity:.78;margin:0;max-width:60ch">${esc(FLOW_TEXT[name] || "")}</p>
          </div>`).join("") : "";

    return `
    <article id="${attr(s.slug)}" style="scroll-margin-top:88px">
    <section aria-labelledby="sd-title-${attr(s.slug)}" style="position:relative;background:#1b1a18;color:#f3f2f2;overflow:hidden;min-height:clamp(420px,62vh,720px);display:flex;align-items:flex-end">
      <img src="${attr(s.hero)}" alt="${attr(altOf(s.hero) || s.title + " — sector photography")}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.44;filter:sepia(.18) saturate(.72) contrast(1.05);animation:uai-drift 26s ease-in-out infinite alternate">
      <div style="position:absolute;inset:0;background:linear-gradient(to top,#1b1a18 3%,color-mix(in srgb,#1b1a18 70%,transparent) 46%,color-mix(in srgb,#1b1a18 28%,transparent))"></div>
      <div style="position:relative;width:100%;max-width:1560px;margin:0 auto;padding:clamp(80px,12vh,150px) clamp(18px,3.4vw,56px) clamp(34px,4vw,64px)">
        <nav aria-label="Breadcrumb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.6;margin-bottom:24px">
          <a href="index.html" style="color:inherit;text-decoration:none">Home</a> <span style="opacity:.5">/</span>
          <a href="sectors.html" style="color:inherit;text-decoration:none">Business Sectors</a> <span style="opacity:.5">/</span>
          <span style="color:var(--color-accent)">${esc(s.title)}</span>
        </nav>
        <p style="display:flex;align-items:baseline;gap:14px;font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent);font-variant-numeric:tabular-nums;margin:0 0 18px;line-height:1.6">
          <span style="width:38px;height:1px;background:var(--color-accent);display:inline-block;flex:none;transform:translateY(-4px)"></span>
          <span>Sector ${esc(s.num)} &middot; ${esc(s.kicker)}</span>
        </p>
        <h2 id="sd-title-${attr(s.slug)}" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(34px,6.2vw,92px);line-height:1;letter-spacing:-.02em;margin:0 0 20px;max-width:22ch;text-wrap:balance">${esc(s.heroTitle)}</h2>
        <p style="font-size:clamp(14.5px,1.1vw,17px);line-height:1.8;opacity:.78;margin:0 0 30px;max-width:62ch">${esc(s.blurb)}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <a class="uai-btn-accent" href="forms.html#request-a-quote" style="white-space:nowrap">${esc(s.cta)} <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
          <a class="uai-btn-outline-light" href="catalogue.html#${attr(s.slug)}" style="white-space:nowrap">View Categories</a>
        </div>
      </div>
    </section>

    <section style="background:var(--color-bg);padding:clamp(50px,7vw,110px) 0">
      <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:clamp(30px,4.5vw,80px);align-items:start">
        <div data-reveal="1">
          <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 20px">The approach</p>
          <p style="font-family:var(--font-heading);font-size:clamp(22px,2.4vw,34px);line-height:1.34;margin:0 0 22px;max-width:38ch">${esc(s.intro)}</p>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${(s.applications || []).map((a) => `<span style="font-size:11.5px;letter-spacing:.06em;border:1px solid var(--color-divider);padding:6px 12px;border-radius:2px;opacity:.78">${esc(a)}</span>`).join("")}
          </div>
        </div>
        <figure data-reveal="1" style="margin:0">
          <div class="plate" style="border-width:8px">
            <img src="${attr(s.plate)}" alt="${attr(altOf(s.plate) || s.title + " — supporting photography")}" loading="lazy" style="width:100%;height:clamp(260px,34vw,470px);object-fit:cover">
          </div>
          <figcaption style="font-size:11px;margin-top:10px;opacity:.55">${esc(PLATE_CAPTIONS[s.slug] || "")}</figcaption>
        </figure>
      </div>
    </section>

    ${s.services ? `<section aria-labelledby="sd-services-${attr(s.slug)}" style="background:var(--color-surface);padding:clamp(50px,7vw,110px) 0">
      <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
        <h2 id="sd-services-${attr(s.slug)}" data-reveal="1" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(28px,3.8vw,58px);line-height:1.05;margin:0 0 clamp(26px,3.4vw,48px);max-width:22ch">What this desk covers</h2>
        <div data-grid-fill="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:1px;background:var(--color-divider)">
          ${s.services.map((v) => `<div data-reveal="1" class="uai-catlink-hover" style="background:var(--color-surface);padding:clamp(20px,2.2vw,32px);display:flex;flex-direction:column;gap:10px;min-height:170px">
            <span style="width:6px;height:6px;background:var(--color-accent);transform:rotate(45deg);display:block"></span>
            <h3 style="font-family:var(--font-heading);font-weight:400;font-size:20px;margin:6px 0 0">${esc(v.name)}</h3>
            <p style="font-size:13.5px;line-height:1.75;opacity:.72;margin:0">${esc(v.text)}</p>
          </div>`).join("")}
        </div>
      </div>
    </section>` : ""}

    ${s.categories ? `<section aria-labelledby="sd-cats-${attr(s.slug)}" style="background:var(--color-surface);padding:clamp(50px,7vw,110px) 0">
      <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
        <div data-reveal="1" style="display:flex;flex-wrap:wrap;gap:18px;align-items:flex-end;justify-content:space-between;margin-bottom:clamp(24px,3.2vw,44px)">
          <h2 id="sd-cats-${attr(s.slug)}" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(28px,3.8vw,58px);line-height:1.05;margin:0;max-width:22ch">Product categories</h2>
          <p style="font-size:13px;opacity:.6;margin:0;max-width:38ch">Categories are catalogue-ready: each expands into subcategories and individual product records as the catalogue is populated.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,290px),1fr));gap:clamp(14px,1.6vw,24px)">
          ${s.categories.map((c) => `<a data-reveal="1" data-zoom="1" href="catalogue.html#${attr(s.slug)}" class="uai-card-hover" style="text-decoration:none;color:inherit;display:flex;flex-direction:column;border:1px solid var(--color-divider);background:var(--color-bg)">
            <span style="display:block;overflow:hidden;background:#1b1a18">
              <img src="${attr(c.img)}" alt="${attr(c.name)}" loading="lazy" style="width:100%;height:clamp(150px,15vw,200px);object-fit:cover;filter:sepia(.18) saturate(.76)">
            </span>
            <span style="padding:16px 18px 20px;display:flex;flex-direction:column;gap:8px;flex:1">
              <span style="display:flex;align-items:center;justify-content:space-between;gap:10px">
                <span style="font-family:var(--font-heading);font-size:19px">${esc(c.name)}</span>
                <span data-arrow="1" style="color:var(--color-accent);font-size:13px;display:inline-block">&#8594;</span>
              </span>
              <span style="font-size:12.5px;line-height:1.7;opacity:.68">${esc(c.text)}</span>
            </span>
          </a>`).join("")}
        </div>
      </div>
    </section>` : ""}

    ${s.groups ? `<section aria-labelledby="sd-groups-${attr(s.slug)}" style="background:var(--color-surface);padding:clamp(50px,7vw,110px) 0">
      <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
        <h2 id="sd-groups-${attr(s.slug)}" data-reveal="1" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(28px,3.8vw,58px);line-height:1.05;margin:0 0 clamp(26px,3.4vw,48px);max-width:24ch">Equipment groups</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:clamp(16px,2vw,28px)">
          ${s.groups.map((g) => `<article data-reveal="1" data-zoom="1" style="border:1px solid var(--color-divider);background:var(--color-bg);display:flex;flex-direction:column">
            <span style="display:block;overflow:hidden;background:#1b1a18">
              <img src="${attr(g.img)}" alt="${attr(g.name)}" loading="lazy" style="width:100%;height:clamp(180px,18vw,250px);object-fit:cover;filter:sepia(.18) saturate(.76)">
            </span>
            <div style="padding:clamp(18px,2vw,26px);display:flex;flex-direction:column;gap:12px;flex:1">
              <h3 style="font-family:var(--font-heading);font-weight:400;font-size:23px;margin:0">${esc(g.name)}</h3>
              <ul style="margin:0;padding:0;list-style:none;display:grid;gap:7px;flex:1">
                ${g.items.map((it) => `<li style="font-size:13.5px;opacity:.75;display:flex;gap:10px;align-items:baseline"><span style="color:var(--color-accent);font-size:9px">&#9670;</span> ${esc(it)}</li>`).join("")}
              </ul>
              <div style="display:flex;gap:10px;flex-wrap:wrap;padding-top:6px;border-top:1px solid var(--color-divider)">
                <a href="catalogue.html#${attr(s.slug)}" style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-accent-700);text-decoration:none">Explore Equipment &#8594;</a>
                <a href="forms.html#request-a-quote" style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.6;text-decoration:none;color:inherit">Request a Quote</a>
              </div>
            </div>
          </article>`).join("")}
        </div>
      </div>
    </section>` : ""}

    ${chain ? `<section aria-labelledby="sd-flow-${attr(s.slug)}" style="background:#1b1a18;color:#f3f2f2;padding:clamp(50px,7vw,110px) 0">
      <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
        <div data-reveal="1" style="max-width:56ch;margin-bottom:clamp(26px,3.4vw,48px)">
          <p style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--color-accent);margin:0 0 18px">${esc(flowKicker)}</p>
          <h2 id="sd-flow-${attr(s.slug)}" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(28px,3.8vw,58px);line-height:1.05;margin:0 0 14px">${esc(flowTitle)}</h2>
          <p style="font-size:14px;line-height:1.8;opacity:.65;margin:0">Select a stage to see what we handle at that point.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,130px),1fr));gap:0;border-top:1px solid color-mix(in srgb,#f3f2f2 18%,transparent)">${flowButtons}
        </div>
        <div style="border:1px solid color-mix(in srgb,#f3f2f2 18%,transparent);border-top:0;padding:clamp(22px,2.6vw,36px);display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;align-items:baseline">${flowPanels}
        </div>
      </div>
    </section>` : ""}

    ${s.steps ? `<section aria-labelledby="sd-steps-${attr(s.slug)}" style="background:#1b1a18;color:#f3f2f2;padding:clamp(50px,7vw,110px) 0">
      <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
        <h2 id="sd-steps-${attr(s.slug)}" data-reveal="1" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(28px,3.8vw,58px);line-height:1.05;margin:0 0 clamp(26px,3.4vw,44px);max-width:24ch">Source &#8594; Evaluate &#8594; Coordinate &#8594; Supply</h2>
        <div data-grid-fill="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:1px;background:color-mix(in srgb,#f3f2f2 16%,transparent)">
          ${s.steps.map((x, i) => `<div data-reveal="1" style="background:#1b1a18;padding:clamp(20px,2.4vw,34px)">
            <p style="font-size:11px;font-variant-numeric:tabular-nums;letter-spacing:.18em;color:var(--color-accent);margin:0 0 14px">0${i + 1}</p>
            <h3 style="font-family:var(--font-heading);font-weight:400;font-size:24px;margin:0 0 10px">${esc(x.name)}</h3>
            <p style="font-size:13.5px;line-height:1.78;opacity:.68;margin:0">${esc(x.text)}</p>
          </div>`).join("")}
        </div>
      </div>
    </section>` : ""}

    <section aria-label="Sector enquiry" style="background:var(--color-bg);padding:clamp(48px,6vw,100px) 0;border-top:1px solid var(--color-divider)">
      <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(24px,3.4vw,60px);align-items:center">
        <div data-reveal="1">
          <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(26px,3.4vw,50px);line-height:1.06;margin:0 0 14px;max-width:24ch">Have a requirement in ${esc(s.title)}?</h2>
          <p style="font-size:14.5px;line-height:1.8;opacity:.72;margin:0;max-width:52ch">Send the specification, quantities and destination. We will confirm feasibility and come back with a commercial route.</p>
        </div>
        <div data-reveal="1" style="display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-start">
          <a class="uai-btn-accent" href="forms.html#request-a-quote" style="white-space:nowrap">${esc(s.cta)} <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
          <a href="contact.html" style="display:inline-flex;align-items:center;gap:9px;padding:15px 26px;border:1px solid var(--color-divider);color:inherit;text-decoration:none;font-family:var(--font-heading);font-size:14px;border-radius:2px;white-space:nowrap">Contact Our Team</a>
        </div>
      </div>
    </section>
    </article>`;
  }).join("");

  return `<section aria-labelledby="sx-title" style="position:relative;background:#1b1a18;color:#f3f2f2;overflow:hidden">
  <img src="${attr(D.img.productionLine)}" alt="${attr(altOf(D.img.productionLine))}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.28;filter:sepia(.2) saturate(.7)">
  <div style="position:relative;max-width:1560px;margin:0 auto;padding:clamp(60px,10vw,150px) clamp(18px,3.4vw,56px) clamp(44px,6vw,90px)">
    <nav aria-label="Breadcrumb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.55;margin-bottom:26px">
      <a href="index.html" style="color:inherit;text-decoration:none">Home</a> <span style="opacity:.5">/</span> Business Sectors
    </nav>
    <h1 id="sx-title" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(36px,6.4vw,96px);line-height:1;letter-spacing:-.02em;margin:0 0 22px;max-width:20ch">Eight Sectors. One Platform.</h1>
    <p style="font-size:clamp(14.5px,1.1vw,17px);line-height:1.8;opacity:.75;margin:0;max-width:62ch">Each sector operates as its own commercial desk with its own supplier base and specification discipline. Shared logistics coordination and administration sit behind all eight, which is what allows a mixed requirement to move as one file.</p>
  </div>
</section>

<section style="background:var(--color-bg);padding:clamp(40px,6vw,90px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;gap:clamp(28px,4vw,64px)">${indexRows}
  </div>
</section>
${detailBlocks}`;
}

module.exports = build;
