"use strict";
const { D, esc, attr } = require("../build.js");

function build() {
  const index = D.solutions.map((s) => `<a href="#${attr(s.slug)}" style="flex:none;padding:14px 0;font-size:12.5px;letter-spacing:.06em;text-decoration:none;color:inherit;border-bottom:2px solid transparent;white-space:nowrap" class="uai-solutions-index-link">${esc(s.name)}</a>`).join("");

  const articles = D.solutions.map((s, i) => {
    const order = i % 2 === 0 ? 0 : 2;
    const bg = i % 2 === 0 ? "var(--color-bg)" : "var(--color-surface)";
    return `
  <article id="${attr(s.slug)}" style="display:block;background:${bg};border-top:1px solid var(--color-divider);scroll-margin-top:112px">
    <div style="max-width:1560px;margin:0 auto;padding:clamp(46px,6.5vw,104px) clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:clamp(28px,4vw,76px);align-items:center">
      <div data-reveal="1" style="order:${order}">
        <figure style="margin:0">
          <div class="plate" style="border-width:8px">
            <img src="${attr(s.img)}" alt="${attr(s.name)}" loading="lazy" style="width:100%;height:clamp(250px,30vw,410px);object-fit:cover">
          </div>
        </figure>
      </div>
      <div data-reveal="1">
        <p style="display:flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--color-accent);font-variant-numeric:tabular-nums;margin:0 0 16px">
          <span style="width:30px;height:1px;background:var(--color-accent);display:inline-block"></span>0${i + 1}
        </p>
        <h2 style="font-family:var(--font-heading);font-weight:400;font-size:clamp(27px,3.4vw,52px);line-height:1.06;margin:0 0 16px">${esc(s.name)}</h2>
        <p style="font-family:var(--font-heading);font-size:clamp(18px,1.7vw,24px);line-height:1.4;margin:0 0 16px;opacity:.9;max-width:40ch">${esc(s.short)}</p>
        <p style="font-size:15px;line-height:1.85;text-align:justify;hyphens:auto;opacity:.78;margin:0 0 26px;max-width:54ch">${esc(s.text)}</p>
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:26px">
          ${s.process.map((p) => `<span style="display:inline-flex;align-items:center;gap:8px;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;opacity:.8"><span style="width:5px;height:5px;background:var(--color-accent);transform:rotate(45deg);display:inline-block"></span>${esc(p)}</span>`).join("")}
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <a href="forms.html#request-a-quote" style="display:inline-flex;align-items:center;gap:9px;padding:13px 22px;border:1px solid var(--color-accent);color:var(--color-accent-700);text-decoration:none;font-family:var(--font-heading);font-size:13.5px;border-radius:2px" class="uai-btn-accent">Submit an Inquiry <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
          <a href="sectors.html" style="display:inline-flex;align-items:center;gap:9px;padding:13px 22px;border:1px solid var(--color-divider);color:inherit;text-decoration:none;font-family:var(--font-heading);font-size:13.5px;border-radius:2px">Related sectors</a>
        </div>
      </div>
    </div>
  </article>`;
  }).join("");

  return `<section aria-labelledby="so-title" style="position:relative;background:#1b1a18;color:#f3f2f2;overflow:hidden">
  <img src="${attr(D.img.portCranes)}" alt="${attr(D.altFor(D.img.portCranes))}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.3;filter:sepia(.2) saturate(.7)">
  <div style="position:relative;max-width:1560px;margin:0 auto;padding:clamp(64px,10vw,150px) clamp(18px,3.4vw,56px) clamp(44px,6vw,88px)">
    <nav aria-label="Breadcrumb" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.6;margin-bottom:24px">
      <a href="index.html" style="color:inherit;text-decoration:none">Home</a> <span style="opacity:.5">/</span> <span style="color:var(--color-accent)">Solutions</span>
    </nav>
    <h1 id="so-title" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(36px,6.4vw,94px);line-height:1;letter-spacing:-.02em;margin:0 0 20px;max-width:20ch">Seven Ways We Take On Work</h1>
    <p style="font-size:clamp(14.5px,1.1vw,17px);line-height:1.8;opacity:.76;margin:0;max-width:62ch">A requirement can arrive as a part number, a drawing, a tender document or a conversation. These are the engagement models we work under &mdash; most projects combine two or three.</p>
  </div>
</section>

<nav aria-label="Solutions index" style="background:var(--color-surface);border-bottom:1px solid var(--color-divider);position:sticky;top:64px;z-index:40">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:flex;gap:clamp(14px,2vw,30px);overflow-x:auto;scrollbar-width:none">${index}
  </div>
</nav>

<section style="background:var(--color-bg)">${articles}
</section>

<section aria-label="Solutions CTA" style="background:#1b1a18;color:#f3f2f2;padding:clamp(48px,6vw,100px) 0">
  <div style="max-width:1560px;margin:0 auto;padding:0 clamp(18px,3.4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(24px,3.4vw,60px);align-items:center">
    <h2 data-reveal="1" style="font-family:var(--font-heading);font-weight:400;font-size:clamp(26px,3.6vw,54px);line-height:1.05;margin:0;max-width:24ch">Not sure which route fits your requirement?</h2>
    <div data-reveal="1" style="display:flex;gap:12px;flex-wrap:wrap">
      <a class="uai-btn-accent" href="contact.html">Discuss Your Requirement <span data-arrow="1" style="display:inline-block">&#8594;</span></a>
      <a class="uai-btn-outline-light" href="forms.html#partner-with-us">Partner With Us</a>
    </div>
  </div>
</section>`;
}

module.exports = build;
