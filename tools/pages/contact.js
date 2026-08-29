"use strict";
const { D, esc, attr } = require("../build.js");

function build() {
  const c = D.contact;
  const mailHref = c.email && c.email.indexOf("@") > -1 && c.email.indexOf("confirmed") === -1 ? "mailto:" + c.email : "contact.html";
  const telHref = c.phone && /\d{4}/.test(c.phone) ? "tel:" + c.phone.replace(/[^+0-9]/g, "") : "contact.html";

  const channels = [
    { label: "Email", value: c.email, href: mailHref },
    { label: "Phone", value: c.phone, href: telHref },
    { label: "WhatsApp", value: c.whatsapp, href: "contact.html" },
    { label: "Registered office", value: c.address, href: "contact.html" },
  ];
  const channelsHtml = channels.map((ch) => `
        <a href="${attr(ch.href)}" style="display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px clamp(20px,2.2vw,30px);text-decoration:none;color:inherit;border-bottom:1px solid var(--color-divider)" class="uai-row-hover-tint">
          <span>
            <span style="display:block;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;opacity:.5;margin-bottom:5px">${esc(ch.label)}</span>
            <span style="display:block;font-size:14px;font-family:var(--font-heading)">${esc(ch.value)}</span>
          </span>
          <span data-arrow="1" style="color:var(--color-accent);font-size:14px;display:inline-block">&#8594;</span>
        </a>`).join("");

  const mapLines = ["M0 12 H100", "M0 24 H100", "M0 36 H100", "M0 48 H100", "M16 0 V60", "M36 0 V60", "M58 0 V60", "M80 0 V60"];
  const mapLinesHtml = mapLines.map((l) => `<path d="${l}" fill="none" stroke="#f3f2f2" stroke-width=".2" opacity=".14"></path>`).join("");

  const fields = [
    { id: "name", label: "Name", req: true },
    { id: "company", label: "Company", req: true },
    { id: "email", label: "Email", type: "email", req: true },
    { id: "phone", label: "Phone", type: "tel" },
    { id: "country", label: "Country", req: true },
    { id: "subject", label: "Subject", req: true, full: true },
    { id: "message", label: "Message", kind: "area", req: true, full: true },
  ];
  const fieldsHtml = fields.map((f) => `
              <div style="${f.full ? "grid-column:1/-1" : ""}">
                <label for="ct-${f.id}" style="display:block;font-size:11.5px;letter-spacing:.06em;margin-bottom:6px;opacity:.75">${esc(f.label)} <span style="color:var(--color-accent);opacity:${f.req ? "1" : "0"}">*</span></label>
                ${f.kind === "area"
    ? `<textarea id="ct-${f.id}" name="${f.id}" rows="5" data-label="${attr(f.label)}"${f.req ? " required" : ""} style="width:100%;min-height:130px;resize:vertical;padding:9px 12px;font:inherit;font-size:14px;line-height:1.7;background:var(--color-bg);border:1px solid var(--color-divider);border-radius:2px;color:var(--color-text);caret-color:var(--color-accent)"></textarea>`
    : `<input id="ct-${f.id}" name="${f.id}" type="${f.type || "text"}" data-label="${attr(f.label)}"${f.req ? " required" : ""} style="width:100%;min-height:42px;padding:9px 12px;font:inherit;font-size:14px;background:var(--color-bg);border:1px solid var(--color-divider);border-radius:2px;color:var(--color-text);caret-color:var(--color-accent)">`}
              </div>`).join("");

  const routes = [
    { t: "Request a Quote", s: "Pricing against a specification", url: "forms.html#request-a-quote" },
    { t: "Become a Supplier", s: "Register your company profile", url: "forms.html#become-a-supplier" },
    { t: "Partner With Us", s: "Commercial partnership routes", url: "forms.html#partner-with-us" },
  ];
  const routesHtml = routes.map((r) => `
        <a href="${attr(r.url)}" style="background:var(--color-bg);padding:18px 20px;text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:6px" class="uai-row-hover-tint">
          <span style="font-family:var(--font-heading);font-size:17px">${esc(r.t)}</span>
          <span style="font-size:12px;line-height:1.6;opacity:.65">${esc(r.s)}</span>
          <span data-arrow="1" style="color:var(--color-accent);font-size:13px;display:inline-block;margin-top:4px">&#8594;</span>
        </a>`).join("");

  return `<section aria-labelledby="ct-title" style="background:var(--color-bg);border-bottom:1px solid var(--color-divider)">
  <div style="max-width:1560px;margin:0 auto;padding:clamp(44px,7vw,110px) clamp(18px,3.4vw,56px) clamp(32px,4vw,64px)">
    <nav aria-label="Breadcrumb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.55;margin-bottom:24px">
      <a href="index.html" style="color:inherit;text-decoration:none">Home</a> <span style="opacity:.5">/</span> <span style="color:var(--color-accent-700)">Contact</span>
    </nav>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(24px,4vw,70px);align-items:end">
      <h1 id="ct-title" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(36px,6vw,88px);line-height:1;letter-spacing:-.02em;margin:0;max-width:18ch">Let's Start a Conversation</h1>
      <p style="font-size:15px;line-height:1.82;opacity:.72;margin:0;max-width:52ch">Enquiries, quotations, supplier introductions or a question about what we can source &mdash; this reaches the commercial desk directly.</p>
    </div>
  </div>
</section>

<section style="background:var(--color-bg);padding:clamp(36px,5.5vw,90px) 0">
  <div class="uai-sidebar-layout" style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:minmax(280px,360px) minmax(0,1fr);gap:clamp(26px,3.4vw,64px);align-items:start">

    <aside>
      <div style="border:1px solid var(--color-divider);background:var(--color-surface)">
        <div style="padding:clamp(20px,2.2vw,30px);border-bottom:1px solid var(--color-divider)">
          <p style="font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--color-accent);margin:0 0 12px">Company</p>
          <p style="font-family:var(--font-heading);font-size:21px;margin:0 0 6px">${esc(D.brand.legal)}</p>
          <p style="font-size:13.5px;line-height:1.7;opacity:.7;margin:0">${esc(c.location)}</p>
          <p style="font-size:12.5px;line-height:1.7;opacity:.55;margin:8px 0 0">${esc(c.hours)}</p>
        </div>${channelsHtml}
        <div style="padding:16px clamp(20px,2.2vw,30px)">
          <p style="font-size:11.5px;line-height:1.7;opacity:.55;margin:0">Contact details marked &ldquo;to be confirmed&rdquo; are placeholders. They are held in the site configuration and appear here the moment the company supplies them.</p>
        </div>
      </div>

      <div style="border:1px solid var(--color-divider);margin-top:20px;background:var(--color-surface)">
        <div style="position:relative;height:clamp(200px,22vw,280px);overflow:hidden;background:#1b1a18">
          <svg viewBox="0 0 100 60" style="position:absolute;inset:0;width:100%;height:100%" role="img" aria-label="Schematic locator: Muscat on the Gulf of Oman coast">
            <rect x="0" y="0" width="100" height="60" fill="#1b1a18"></rect>${mapLinesHtml}
            <path d="M4 44 Q26 36 44 30 Q64 23 96 14" fill="none" stroke="#b68235" stroke-width=".5" opacity=".8"></path>
            <circle cx="58" cy="25" r="1.6" fill="#b68235"></circle>
            <circle cx="58" cy="25" r="4.5" fill="none" stroke="#b68235" stroke-width=".25" style="animation:uai-pulse 3.4s ease-in-out infinite"></circle>
          </svg>
          <span style="position:absolute;left:58%;top:25%;transform:translate(-50%,-190%);font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:#b68235;white-space:nowrap">Muscat</span>
          <span style="position:absolute;bottom:12px;left:14px;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:color-mix(in srgb,#f3f2f2 55%,transparent)">Gulf of Oman coast</span>
        </div>
        <div style="padding:16px clamp(18px,2vw,26px)">
          <p style="font-size:12.5px;line-height:1.7;opacity:.65;margin:0">A live embedded map replaces this locator once the registered office address is confirmed.</p>
        </div>
      </div>
    </aside>

    <div>
      <div id="uai-contact-success" hidden role="status" style="border:1px solid var(--color-accent);background:var(--color-surface);padding:clamp(26px,3.4vw,52px)">
        <span style="display:inline-block;width:11px;height:11px;background:var(--color-accent);transform:rotate(45deg);margin-bottom:20px"></span>
        <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(24px,3vw,42px);line-height:1.08;margin:0 0 14px">Your email client should have opened.</h2>
        <p style="font-size:14.5px;line-height:1.8;opacity:.74;margin:0 0 22px;max-width:52ch">Send the drafted message and a member of the commercial team will respond during Oman working hours. If nothing opened, email us directly at <strong style="font-family:var(--font-heading);color:var(--color-accent-700)">${esc(c.email)}</strong>.</p>
      </div>

      <form id="uai-contact-form" data-mailto data-mailto-to="${attr(c.email)}" data-mailto-subject-field="subject" data-mailto-success="uai-contact-success" novalidate style="border:1px solid var(--color-divider);background:var(--color-surface);padding:clamp(22px,2.6vw,40px);display:grid;gap:clamp(14px,1.8vw,22px)">
        <div>
          <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(22px,2.4vw,34px);margin:0 0 6px">Send a message</h2>
          <p style="font-size:12.5px;opacity:.6;margin:0">Fields marked <span style="color:var(--color-accent)">*</span> are required. Submitting opens a pre-filled email in your mail client &mdash; there is no server-side inbox behind this form yet.</p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:clamp(14px,1.6vw,20px)">${fieldsHtml}
        </div>

        <label style="display:flex;gap:12px;align-items:flex-start;font-size:13px;line-height:1.65;cursor:pointer;border-top:1px solid var(--color-divider);padding-top:16px">
          <input type="checkbox" required style="margin-top:3px;accent-color:#b68235;width:16px;height:16px">
          <span>I consent to my details being used to respond to this enquiry, in line with the <a href="legal.html#privacy">Privacy Policy</a>.</span>
        </label>

        <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center">
          <button type="submit" style="display:inline-flex;align-items:center;gap:10px;padding:14px 28px;font:inherit;font-family:var(--font-heading);font-weight:600;font-size:14px;border-radius:2px;cursor:pointer;background:transparent;border:1px solid var(--color-accent);color:var(--color-accent-700)">Send Message</button>
          <p style="font-size:11.5px;opacity:.55;margin:0">Or use the RFQ form for pricing requests.</p>
        </div>
      </form>

      <div data-grid-fill="1" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:1px;background:var(--color-divider);margin-top:20px;border:1px solid var(--color-divider)">${routesHtml}
      </div>
    </div>
  </div>
</section>`;
}

module.exports = build;
