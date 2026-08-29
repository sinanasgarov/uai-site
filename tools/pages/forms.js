"use strict";
const { D, esc, attr } = require("../build.js");

const sectorOpts = [{ v: "", l: "Select a sector…" }].concat(
  D.sectors.map((s) => ({ v: s.slug, l: s.title }))
);

function schemaFor(kind) {
  if (kind === "supplier") {
    return [
      { legend: "Company", note: "Who you are and where you are based.", fields: [
        { id: "company", label: "Company Name", req: true },
        { id: "country", label: "Country", req: true },
        { id: "website", label: "Website", type: "url", placeholder: "https://" },
        { id: "type", label: "Company type", kind: "radio", req: true, options: ["Manufacturer", "Distributor", "Trader"] },
      ] },
      { legend: "Contact", note: "The person we should correspond with.", fields: [
        { id: "contact", label: "Contact Person", req: true },
        { id: "email", label: "Email", type: "email", req: true },
        { id: "phone", label: "Phone", type: "tel", req: true },
      ] },
      { legend: "Supply profile", note: "What you make or distribute, and at what scale.", fields: [
        { id: "industry", label: "Industry", req: true },
        { id: "categories", label: "Product Categories", req: true, hint: "Separate multiple categories with commas." },
        { id: "markets", label: "Export Markets" },
        { id: "certifications", label: "Certifications", hint: "List only certifications you currently hold." },
        { id: "capacity", label: "Production Capacity" },
        { id: "moq", label: "Minimum Order Quantity" },
        { id: "message", label: "Message", kind: "area", full: true },
      ] },
      { legend: "Documents", note: "Optional, but they speed up evaluation considerably. Attach these files to the email that opens after you submit — mailto: links cannot carry attachments.", fields: [
        { id: "profile", label: "Company Profile", kind: "file", fileLabel: "Attach company profile in your email client", full: true },
        { id: "catalogue", label: "Product Catalogue", kind: "file", fileLabel: "Attach product catalogue in your email client", full: true },
      ] },
    ];
  }
  if (kind === "partner") {
    return [
      { legend: "About you", note: "Company and contact details.", fields: [
        { id: "name", label: "Full Name", req: true },
        { id: "company", label: "Company Name", req: true },
        { id: "position", label: "Position" },
        { id: "email", label: "Email", type: "email", req: true },
        { id: "phone", label: "Phone", type: "tel" },
        { id: "country", label: "Country", req: true },
      ] },
      { legend: "Partnership", note: "What kind of relationship you are proposing.", fields: [
        { id: "side", label: "I am a", kind: "radio", req: true, options: ["Supplier", "Buyer", "Logistics partner", "Contractor", "Other"] },
        { id: "sector", label: "Business Sector", kind: "select", options: sectorOpts },
        { id: "proposal", label: "Proposal", kind: "area", req: true, full: true, hint: "What you are proposing, and what you would need from us." },
      ] },
    ];
  }
  return [
    { legend: "Your details", note: "So we know who to respond to.", fields: [
      { id: "name", label: "Full Name", req: true },
      { id: "company", label: "Company Name", req: true },
      { id: "position", label: "Position" },
      { id: "email", label: "Email", type: "email", req: true },
      { id: "phone", label: "Phone", type: "tel", req: true },
      { id: "country", label: "Country", req: true },
    ] },
    { legend: "Requirement", note: "The more precise this is, the faster the quotation.", fields: [
      { id: "sector", label: "Business Sector", kind: "select", req: true, options: sectorOpts },
      { id: "product", label: "Product / Service Required", req: true, full: true },
      { id: "quantity", label: "Quantity", req: true },
      { id: "spec", label: "Technical Specification", kind: "area", full: true, hint: "Grades, standards, dimensions, ratings — or reference a drawing you are attaching." },
    ] },
    { legend: "Delivery", note: "Where it has to be, and when. Attach drawings and specifications to the email that opens after you submit — mailto: links cannot carry attachments.", fields: [
      { id: "destination", label: "Delivery Location", req: true },
      { id: "date", label: "Required Delivery Date", type: "date" },
      { id: "notes", label: "Additional Information", kind: "area", full: true },
    ] },
  ];
}

const COPY = {
  quote: {
    crumb: "Request a Quote", title: "Request a Quote",
    intro: "Send the requirement with as much detail as you have. Incomplete enquiries are still welcome — we will come back with the questions we need answered.",
    heroImg: D.img.earthworks, submit: "Submit Request",
    note: "Reviewed within one business day during Oman working hours.",
  },
  supplier: {
    crumb: "Become a Supplier", title: "Become a Supplier",
    intro: "We welcome manufacturers, suppliers and commercial partners interested in developing long-term business opportunities across regional and international markets.",
    heroImg: D.img.factory, submit: "Submit Supplier Profile",
    note: "Profiles are held for sourcing enquiries in your categories.",
  },
  partner: {
    crumb: "Partner With Us", title: "Build With Us",
    intro: "Manufacturers, suppliers, distributors, logistics companies, contractors, engineering and trading companies, project and procurement organisations — there are two ways in.",
    heroImg: D.img.handshake, submit: "Submit Enquiry",
    note: "Routed to the desk closest to your proposal.",
  },
};

function fieldHtml(kind, f) {
  const idAttr = `fm-${kind}-${f.id}`;
  const req = f.req ? " required" : "";
  const wrap = f.full ? "grid-column:1/-1" : "";
  const inputBase = "width:100%;min-height:42px;padding:9px 12px;font:inherit;font-size:14px;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:2px;color:var(--color-text);caret-color:var(--color-accent)";

  let control;
  if (f.kind === "area") {
    control = `<textarea id="${idAttr}" name="${f.id}" data-label="${attr(f.label)}" placeholder="${attr(f.placeholder || "")}" rows="4"${req} style="${inputBase};min-height:110px;resize:vertical;line-height:1.65"></textarea>`;
  } else if (f.kind === "select") {
    control = `<select id="${idAttr}" name="${f.id}" data-label="${attr(f.label)}"${req} style="${inputBase}">
                    ${f.options.map((o) => `<option value="${attr(o.v)}">${esc(o.l)}</option>`).join("")}
                  </select>`;
  } else if (f.kind === "radio") {
    control = `<div role="radiogroup" aria-label="${attr(f.label)}" style="display:flex;flex-wrap:wrap;gap:8px;padding-top:2px">
                    ${f.options.map((o, i) => `<label style="font:inherit;font-size:13px;cursor:pointer;padding:10px 16px;border-radius:2px;border:1px solid var(--color-divider);display:inline-flex;align-items:center;gap:8px">
                      <input type="radio" name="${f.id}" value="${attr(o)}" data-label="${attr(f.label)}"${i === 0 && f.req ? " required" : ""} style="accent-color:#b68235">${esc(o)}
                    </label>`).join("")}
                  </div>`;
  } else if (f.kind === "file") {
    control = `<label for="${idAttr}" style="display:flex;align-items:center;justify-content:space-between;gap:14px;border:1px dashed color-mix(in srgb,#201f1d 28%,transparent);padding:16px 18px;cursor:pointer;background:var(--color-surface)">
                    <span>
                      <span style="display:block;font-size:13px">${esc(f.fileLabel)}</span>
                      <span style="display:block;font-size:11px;opacity:.55;margin-top:3px">PDF, DOC, DOCX, XLS, XLSX, JPG, PNG &middot; max 10 MB per file</span>
                    </span>
                    <span style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-accent-700);white-space:nowrap">Choose files</span>
                  </label>
                  <input id="${idAttr}" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" style="position:absolute;width:1px;height:1px;opacity:0;overflow:hidden">`;
  } else {
    control = `<input id="${idAttr}" name="${f.id}" type="${f.type || "text"}" data-label="${attr(f.label)}" placeholder="${attr(f.placeholder || "")}"${req} style="${inputBase}">`;
  }

  return `
                <div style="${wrap}">
                  <label for="${idAttr}" style="display:block;font-size:11.5px;letter-spacing:.06em;margin-bottom:6px;opacity:.75">${esc(f.label)} <span style="color:var(--color-accent);opacity:${f.req ? "1" : "0"}">${f.req ? "*" : ""}</span></label>
                  ${control}
                  ${f.hint ? `<p style="font-size:11px;line-height:1.6;opacity:.5;margin:6px 0 0">${esc(f.hint)}</p>` : ""}
                </div>`;
}

function formSection(kind) {
  const copy = COPY[kind];
  const schema = schemaFor(kind);
  const groupsHtml = schema.map((g) => `
        <fieldset style="border:1px solid var(--color-divider);background:var(--color-bg);padding:clamp(20px,2.4vw,34px);margin:0">
          <legend style="font-family:var(--font-heading);font-size:clamp(18px,1.8vw,24px);padding:0 10px;margin-left:-10px">${esc(g.legend)}</legend>
          <p style="font-size:12.5px;opacity:.6;margin:2px 0 20px">${esc(g.note)}</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(14px,1.6vw,22px)">
            ${g.fields.map((f) => fieldHtml(kind, f)).join("")}
          </div>
        </fieldset>`).join("");

  return `
<article id="${kind === "quote" ? "request-a-quote" : kind === "supplier" ? "become-a-supplier" : "partner-with-us"}" style="scroll-margin-top:88px">
<section aria-labelledby="fm-title-${kind}" style="position:relative;background:#1b1a18;color:#f3f2f2;overflow:hidden">
  <img src="${attr(copy.heroImg)}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.28;filter:sepia(.2) saturate(.7)">
  <div style="position:relative;max-width:1560px;margin:0 auto;padding:clamp(60px,9vw,140px) clamp(18px,3.4vw,56px) clamp(38px,5vw,80px)">
    <nav aria-label="Breadcrumb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.6;margin-bottom:22px">
      <a href="index.html" style="color:inherit;text-decoration:none">Home</a> <span style="opacity:.5">/</span> <span style="color:var(--color-accent)">${esc(copy.crumb)}</span>
    </nav>
    <h1 id="fm-title-${kind}" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(34px,6vw,88px);line-height:1;letter-spacing:-.02em;margin:0 0 18px;max-width:20ch">${esc(copy.title)}</h1>
    <p style="font-size:clamp(14.5px,1.1vw,17px);line-height:1.8;opacity:.76;margin:0;max-width:62ch">${esc(copy.intro)}</p>
  </div>
</section>

${kind === "partner" ? `<section aria-label="Partnership routes" style="background:var(--color-bg);padding:clamp(44px,6.5vw,104px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:clamp(16px,2.4vw,32px);margin-bottom:clamp(34px,4.5vw,66px)">
      <a data-reveal="1" data-zoom="1" href="#become-a-supplier" class="uai-card-hover" style="border:1px solid var(--color-divider);text-decoration:none;color:inherit;display:flex;flex-direction:column;background:var(--color-bg)">
        <span style="display:block;overflow:hidden;background:#1b1a18">
          <img src="${attr(D.img.productionLine)}" alt="I Am a Supplier" loading="lazy" style="width:100%;height:clamp(180px,20vw,260px);object-fit:cover;filter:sepia(.19) saturate(.76)">
        </span>
        <span style="padding:clamp(20px,2.4vw,32px);display:flex;flex-direction:column;gap:12px;flex:1">
          <span style="font-family:var(--font-heading);font-size:clamp(23px,2.4vw,34px);line-height:1.15">I Am a Supplier</span>
          <span style="font-size:14px;line-height:1.8;opacity:.72;flex:1">You manufacture, distribute or trade products and want a commercial route into Oman and the wider region.</span>
          <span style="display:flex;flex-direction:column;gap:6px;padding-top:12px;border-top:1px solid var(--color-divider)">
            ${["Manufacturers", "Distributors", "Trading companies", "Industrial producers"].map((w) => `<span style="font-size:12.5px;opacity:.66;display:flex;gap:9px;align-items:baseline"><span style="color:var(--color-accent);font-size:8px">&#9670;</span>${esc(w)}</span>`).join("")}
          </span>
          <span style="display:inline-flex;align-items:center;gap:9px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-accent-700);margin-top:6px">Register as supplier <span data-arrow="1" style="display:inline-block">&#8594;</span></span>
        </span>
      </a>
      <a data-reveal="1" data-zoom="1" href="#request-a-quote" class="uai-card-hover" style="border:1px solid var(--color-divider);text-decoration:none;color:inherit;display:flex;flex-direction:column;background:var(--color-bg)">
        <span style="display:block;overflow:hidden;background:#1b1a18">
          <img src="${attr(D.img.construction)}" alt="I Am a Buyer" loading="lazy" style="width:100%;height:clamp(180px,20vw,260px);object-fit:cover;filter:sepia(.19) saturate(.76)">
        </span>
        <span style="padding:clamp(20px,2.4vw,32px);display:flex;flex-direction:column;gap:12px;flex:1">
          <span style="font-family:var(--font-heading);font-size:clamp(23px,2.4vw,34px);line-height:1.15">I Am a Buyer</span>
          <span style="font-size:14px;line-height:1.8;opacity:.72;flex:1">You need materials, equipment or logistics support and want one counterparty to carry the requirement.</span>
          <span style="display:flex;flex-direction:column;gap:6px;padding-top:12px;border-top:1px solid var(--color-divider)">
            ${["Contractors", "Project companies", "Procurement organisations", "Industrial operators"].map((w) => `<span style="font-size:12.5px;opacity:.66;display:flex;gap:9px;align-items:baseline"><span style="color:var(--color-accent);font-size:8px">&#9670;</span>${esc(w)}</span>`).join("")}
          </span>
          <span style="display:inline-flex;align-items:center;gap:9px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-accent-700);margin-top:6px">Request a quote <span data-arrow="1" style="display:inline-block">&#8594;</span></span>
        </span>
      </a>
    </div>
    <div data-reveal="1" style="border-top:1px solid var(--color-divider);padding-top:clamp(24px,3vw,44px)">
      <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(22px,2.6vw,38px);margin:0 0 18px">Or send a general partnership enquiry</h2>
      <p style="font-size:14px;line-height:1.8;opacity:.72;margin:0 0 6px;max-width:56ch">Complete the form below and it will be routed to the relevant desk.</p>
    </div>
  </div>
</section>` : ""}

<section aria-label="Form" style="background:var(--color-surface);border-top:1px solid var(--color-divider);padding:clamp(40px,6vw,100px) 0">
  <div style="max-width:1180px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px)">

    <div id="fm-success-${kind}" hidden role="status" style="border:1px solid var(--color-accent);background:var(--color-bg);padding:clamp(28px,4vw,64px);text-align:center">
      <span style="display:inline-block;width:12px;height:12px;background:var(--color-accent);transform:rotate(45deg);margin-bottom:24px"></span>
      <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(28px,3.6vw,54px);line-height:1.06;margin:0 0 16px">Your email client should have opened</h2>
      <p style="font-size:15px;line-height:1.8;opacity:.76;margin:0 auto 26px;max-width:52ch">Review the drafted message and send it &mdash; that is what reaches us today. Once a mail provider is connected (see the handoff notes) this page will submit directly and issue a reference number.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">
        <a href="index.html" style="padding:14px 24px;border:1px solid var(--color-accent);color:var(--color-accent-700);text-decoration:none;font-family:var(--font-heading);font-size:14px;border-radius:2px">Back to Home</a>
      </div>
    </div>

    <form id="fm-form-${kind}" data-mailto data-mailto-to="${attr(D.contact.email)}" data-mailto-subject="${attr(copy.crumb)} — ${attr(D.brand.name)}" data-mailto-success="fm-success-${kind}" novalidate style="display:grid;gap:clamp(22px,2.6vw,38px)">
      ${groupsHtml}

      <div style="display:grid;gap:16px;border:1px solid var(--color-divider);background:var(--color-bg);padding:clamp(18px,2.2vw,30px)">
        <label style="display:flex;gap:12px;align-items:flex-start;font-size:13px;line-height:1.65;cursor:pointer">
          <input type="checkbox" required style="margin-top:3px;accent-color:#b68235;width:16px;height:16px">
          <span>I confirm the information provided is accurate and consent to it being used to respond to this submission, in line with the <a href="legal.html#privacy">Privacy Policy</a>.</span>
        </label>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center">
        <button type="submit" style="display:inline-flex;align-items:center;gap:10px;padding:15px 30px;font:inherit;font-family:var(--font-heading);font-weight:600;font-size:14.5px;border-radius:2px;cursor:pointer;background:transparent;border:1px solid var(--color-accent);color:var(--color-accent-700)">${esc(copy.submit)}</button>
        <p style="font-size:11.5px;opacity:.55;margin:0;max-width:44ch">${esc(copy.note)}</p>
      </div>
    </form>
  </div>
</section>
</article>`;
}

function build() {
  const assurances = [
    { t: "Reviewed by a person", s: "Submissions go to the sector desk, not an autoresponder queue." },
    { t: "Held in confidence", s: "Specifications and drawings are shared with suppliers only to obtain pricing." },
    { t: "Answered either way", s: "If we cannot serve the requirement, we say so rather than going quiet." },
  ];
  const assurancesHtml = assurances.map((a) => `
    <div style="background:var(--color-bg);padding:clamp(18px,2.2vw,30px)">
      <p style="font-family:var(--font-heading);font-size:18px;margin:0 0 8px">${esc(a.t)}</p>
      <p style="font-size:13px;line-height:1.75;opacity:.7;margin:0">${esc(a.s)}</p>
    </div>`).join("");

  return `${formSection("quote")}
${formSection("supplier")}
${formSection("partner")}

<section style="background:var(--color-bg);border-top:1px solid var(--color-divider);padding:clamp(36px,5vw,80px) 0">
  <div data-grid-fill="1" style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:1px;background:var(--color-divider)">${assurancesHtml}
  </div>
</section>`;
}

module.exports = build;
