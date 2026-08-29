#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const { D, page, DIST, ROOT, SITE } = require("./build.js");

const buildHome = require("./pages/home.js");
const buildAbout = require("./pages/about.js");
const buildSolutions = require("./pages/solutions.js");
const buildIndustries = require("./pages/industries.js");
const buildReach = require("./pages/reach.js");
const buildSectors = require("./pages/sectors.js");
const buildCatalogue = require("./pages/catalogue.js");
const buildInsights = require("./pages/insights.js");
const buildLegal = require("./pages/legal.js");
const buildContact = require("./pages/contact.js");
const buildForms = require("./pages/forms.js");


// ---------------------------------------------------------------------
// Search index — same shape/scoring inputs as the original content.js
// index (t/k/url/type), rebuilt with real static file + anchor URLs.
// ---------------------------------------------------------------------
function buildSearchIndex() {
  const SYNONYMS = {
    "iron-metal": "steel rebar sections plate coil beams structural steel metals fabrication galvanised stainless",
    "equipment-machinery": "machinery equipment excavator loader crane forklift plant heavy machines spare parts",
    "building-materials": "cement concrete blocks aggregate timber tiles gypsum insulation pipes construction supply",
    "electrical-electronic": "cables switchgear transformers panels lighting generators motors electronics",
    "chemicals": "chemicals solvents polymers additives lubricants coatings raw materials",
    "logistics-services": "freight shipping forwarding customs clearance warehouse trucking container sea air",
    "housewares": "kitchenware cookware tableware homeware hotel supplies crockery appliances",
    "administrative-services": "documentation paperwork back office administration correspondence coordination",
  };

  const index = [];
  index.push({ t: "Home", k: "company overview trade logistics industrial supply oman", url: "index.html", type: "Page" });
  index.push({ t: "About Us", k: "company positioning approach oman diversified business", url: "about.html", type: "Page" });
  index.push({ t: "Global Reach", k: "oman gcc asia europe international markets connectivity", url: "reach.html", type: "Page" });
  index.push({ t: "Insights", k: "news articles trade market oman gcc procurement", url: "insights.html", type: "Page" });
  index.push({ t: "Contact", k: "contact email phone whatsapp muscat oman enquiry", url: "contact.html", type: "Page" });
  index.push({ t: "Request a Quote", k: "rfq quotation pricing enquiry specification", url: "forms.html#request-a-quote", type: "Conversion" });
  index.push({ t: "Become a Supplier", k: "supplier registration manufacturer distributor export", url: "forms.html#become-a-supplier", type: "Conversion" });
  index.push({ t: "Partner With Us", k: "partnership buyer supplier distributor logistics contractor", url: "forms.html#partner-with-us", type: "Conversion" });
  index.push({ t: "Product Catalogue", k: "catalogue categories products specifications", url: "catalogue.html", type: "Page" });

  D.sectors.forEach((s) => {
    index.push({ t: s.title, k: (s.blurb + " " + (s.applications || []).join(" ") + " " + (SYNONYMS[s.slug] || "")).toLowerCase(), url: "sectors.html#" + s.slug, type: "Business Sector" });
    (s.categories || []).forEach((c) => {
      index.push({ t: c.name, k: (c.text + " " + s.title).toLowerCase(), url: "catalogue.html#" + s.slug, type: "Category · " + s.title });
    });
    (s.groups || []).forEach((g) => {
      index.push({ t: g.name, k: (g.items.join(" ") + " " + s.title).toLowerCase(), url: "catalogue.html#" + s.slug, type: "Category · " + s.title });
    });
    (s.services || []).forEach((v) => {
      index.push({ t: v.name, k: (v.text + " " + s.title).toLowerCase(), url: "sectors.html#" + s.slug, type: "Service · " + s.title });
    });
  });
  D.solutions.forEach((s) => {
    index.push({ t: s.name, k: (s.short + " " + s.text).toLowerCase(), url: "solutions.html#" + s.slug, type: "Solution" });
  });
  D.industries.forEach((i) => {
    index.push({ t: i.name, k: (i.text + " industry").toLowerCase(), url: "industries.html#" + i.slug, type: "Industry" });
  });
  return index;
}

function writeScriptJs() {
  const template = fs.readFileSync(path.join(__dirname, "script.template.js"), "utf8");
  const withIndex = template.replace("__SEARCH_INDEX__", JSON.stringify(buildSearchIndex()));
  fs.writeFileSync(path.join(DIST, "script.js"), withIndex);
}

function write(file, html) {
  fs.writeFileSync(path.join(DIST, file), html);
  console.log("wrote", file, "(" + html.length + " bytes)");
}

// GitHub Pages deploy-time files. Rewritten on every build (rather than
// hand-maintained only in dist/) so they can never go stale or get lost if
// a future change to this script starts clearing dist/ first — CNAME's
// content is derived from SITE (build.js) so the domain is declared once.
function writeDeployFiles() {
  fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
  const domain = SITE.replace(/^https?:\/\//, "").replace(/\/$/, "");
  fs.writeFileSync(path.join(DIST, "CNAME"), domain + "\n");
  console.log("wrote .nojekyll, CNAME (" + domain + ")");
}

function main() {
  write("index.html", page({
    navKey: "home", title: "United Assets Investments SPC — Trade, Logistics & Industrial Supply, Oman",
    description: D.brand.description,
    canonical: SITE, ogImage: D.img.heroPort,
    main: buildHome(),
  }));

  write("about.html", page({
    navKey: "about", title: "About Us | United Assets Investments",
    description: "How United Assets Investments works: an Oman-based platform built around sourcing, trading, logistics coordination and industrial supply.",
    canonical: SITE + "about.html", ogImage: D.img.office,
    main: buildAbout(),
  }));

  write("sectors.html", page({
    navKey: "sectors", title: "Business Sectors | United Assets Investments",
    description: "Eight business sectors spanning administrative services, logistics, housewares, electrical equipment, chemicals, machinery, building materials and metals.",
    canonical: SITE + "sectors.html", ogImage: D.img.productionLine,
    main: buildSectors(),
  }));

  write("solutions.html", page({
    navKey: "solutions", title: "Solutions | United Assets Investments",
    description: "Strategic sourcing, international trading, supply chain coordination, procurement support, industrial supply, project supply and market access.",
    canonical: SITE + "solutions.html", ogImage: D.img.portCranes,
    main: buildSolutions(),
  }));

  write("industries.html", page({
    navKey: "industries", title: "Industries We Serve | United Assets Investments",
    description: "Supply and sourcing support for construction, infrastructure, manufacturing, engineering, logistics, hospitality, energy and industrial projects.",
    canonical: SITE + "industries.html", ogImage: D.img.welding,
    main: buildIndustries(),
  }));

  write("reach.html", page({
    navKey: "reach", title: "Global Reach | United Assets Investments",
    description: "Oman as a commercial base connected to GCC, Middle East, Asia, Europe and international supply markets.",
    canonical: SITE + "reach.html", ogImage: D.img.terminal,
    main: buildReach(),
  }));

  write("insights.html", page({
    navKey: "insights", title: "Insights | United Assets Investments",
    description: "Editorial notes on trade, logistics, procurement and industrial supply across Oman and the GCC.",
    canonical: SITE + "insights.html", ogImage: D.img.notebook,
    main: buildInsights(),
  }));

  write("catalogue.html", page({
    navKey: "catalogue", title: "Product Catalogue | United Assets Investments",
    description: "Sector, category and product architecture across the group's trading and industrial supply activities.",
    canonical: SITE + "catalogue.html", ogImage: D.img.boxes,
    main: buildCatalogue(),
  }));

  write("forms.html", page({
    navKey: "forms", title: "Request a Quote, Become a Supplier & Partner With Us | United Assets Investments",
    description: "Submit a request for quotation, register as a supplier, or start a partnership conversation with United Assets Investments.",
    canonical: SITE + "forms.html", ogImage: D.img.handshake,
    noSticky: true,
    main: buildForms(),
  }));

  write("contact.html", page({
    navKey: "contact", title: "Contact | United Assets Investments",
    description: "Contact United Assets Investments in Muscat, Oman for trading, logistics and industrial supply enquiries.",
    canonical: SITE + "contact.html", ogImage: D.img.desk,
    noSticky: true,
    main: buildContact(),
  }));

  write("legal.html", page({
    navKey: "legal", title: "Privacy Policy, Terms of Use & Cookie Policy | United Assets Investments",
    description: "How United Assets Investments handles information submitted through this website, the terms governing its use, and the cookies it sets.",
    canonical: SITE + "legal.html", ogImage: D.img.documents,
    main: buildLegal(),
  }));

  writeScriptJs();
  writeDeployFiles();
  console.log("\nBuild complete →", DIST);
}

main();
