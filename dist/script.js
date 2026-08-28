/* United Assets Investments — static site interactivity.
   Vanilla JS, no dependencies. Replaces what the Claude Design / React
   runtime used to do with component state: header behavior, the mega/
   mobile/search overlays, scroll reveals, in-page pickers (finder, sector
   flow, reach corridors, insights filter) and the mailto: form handler.
   SEARCH_INDEX below is generated at build time from content.js by
   tools/generate.js — see that file for the source of truth. */
"use strict";
(function () {
  var SEARCH_INDEX = [{"t":"Home","k":"company overview trade logistics industrial supply oman","url":"index.html","type":"Page"},{"t":"About Us","k":"company positioning approach oman diversified business","url":"about.html","type":"Page"},{"t":"Global Reach","k":"oman gcc asia europe international markets connectivity","url":"reach.html","type":"Page"},{"t":"Insights","k":"news articles trade market oman gcc procurement","url":"insights.html","type":"Page"},{"t":"Contact","k":"contact email phone whatsapp muscat oman enquiry","url":"contact.html","type":"Page"},{"t":"Request a Quote","k":"rfq quotation pricing enquiry specification","url":"forms.html#request-a-quote","type":"Conversion"},{"t":"Become a Supplier","k":"supplier registration manufacturer distributor export","url":"forms.html#become-a-supplier","type":"Conversion"},{"t":"Partner With Us","k":"partnership buyer supplier distributor logistics contractor","url":"forms.html#partner-with-us","type":"Conversion"},{"t":"Product Catalogue","k":"catalogue categories products specifications","url":"catalogue.html","type":"Page"},{"t":"Administrative Services","k":"structured business and administrative support that keeps commercial processes moving between suppliers, customers and authorities. procurement teams trading operations project offices suppliers entering the region documentation paperwork back office administration correspondence coordination","url":"sectors.html#administrative-services","type":"Business Sector"},{"t":"Business Administration","k":"day-to-day commercial administration for transactions, orders and supplier accounts. administrative services","url":"sectors.html#administrative-services","type":"Service · Administrative Services"},{"t":"Documentation Coordination","k":"preparation, review and tracking of commercial and shipping documentation. administrative services","url":"sectors.html#administrative-services","type":"Service · Administrative Services"},{"t":"Commercial Support","k":"quotation handling, order confirmation and commercial correspondence. administrative services","url":"sectors.html#administrative-services","type":"Service · Administrative Services"},{"t":"Supplier Coordination","k":"a single point of contact across multiple suppliers and production timelines. administrative services","url":"sectors.html#administrative-services","type":"Service · Administrative Services"},{"t":"Client Coordination","k":"status reporting and structured follow-up on open requirements. administrative services","url":"sectors.html#administrative-services","type":"Service · Administrative Services"},{"t":"Operational Assistance","k":"support for recurring operational tasks that sit between departments. administrative services","url":"sectors.html#administrative-services","type":"Service · Administrative Services"},{"t":"Business Process Support","k":"documented, repeatable processes for procurement and supply routines. administrative services","url":"sectors.html#administrative-services","type":"Service · Administrative Services"},{"t":"Logistics Services","k":"coordinated logistics supporting the movement of goods across commercial and international supply chains. industrial supply project cargo retail and wholesale goods equipment movement freight shipping forwarding customs clearance warehouse trucking container sea air","url":"sectors.html#logistics-services","type":"Business Sector"},{"t":"Freight Coordination","k":"sea, road and air freight arranged against the commercial terms of the order. logistics services","url":"sectors.html#logistics-services","type":"Service · Logistics Services"},{"t":"Cargo Coordination","k":"consolidation, documentation and handover between carriers. logistics services","url":"sectors.html#logistics-services","type":"Service · Logistics Services"},{"t":"Transportation","k":"inland movement to site, yard, warehouse or port. logistics services","url":"sectors.html#logistics-services","type":"Service · Logistics Services"},{"t":"Warehousing Coordination","k":"short and longer-term storage arranged with warehouse partners. logistics services","url":"sectors.html#logistics-services","type":"Service · Logistics Services"},{"t":"Import & Export Coordination","k":"coordination of customs formalities and clearance requirements. logistics services","url":"sectors.html#logistics-services","type":"Service · Logistics Services"},{"t":"Supply Chain Support","k":"planning support where several suppliers feed one delivery programme. logistics services","url":"sectors.html#logistics-services","type":"Service · Logistics Services"},{"t":"Regional Distribution","k":"onward distribution across oman and neighbouring markets. logistics services","url":"sectors.html#logistics-services","type":"Service · Logistics Services"},{"t":"Delivery Coordination","k":"scheduled delivery windows and confirmed receipt at destination. logistics services","url":"sectors.html#logistics-services","type":"Service · Logistics Services"},{"t":"Housewares Trade","k":"connecting quality household and hospitality products with commercial buyers across regional markets. retail wholesale distribution hotels and hospitality facility management kitchenware cookware tableware homeware hotel supplies crockery appliances","url":"sectors.html#housewares","type":"Business Sector"},{"t":"Kitchenware","k":"cookware, utensils, preparation and serving items. housewares trade","url":"catalogue.html#housewares","type":"Category · Housewares Trade"},{"t":"Household Products","k":"everyday household goods for retail and wholesale channels. housewares trade","url":"catalogue.html#housewares","type":"Category · Housewares Trade"},{"t":"Home Equipment","k":"small equipment and appliances for domestic use. housewares trade","url":"catalogue.html#housewares","type":"Category · Housewares Trade"},{"t":"Hospitality Supplies","k":"guest room, housekeeping and food service supplies. housewares trade","url":"catalogue.html#housewares","type":"Category · Housewares Trade"},{"t":"Consumer Goods","k":"fast-moving consumer lines for distribution. housewares trade","url":"catalogue.html#housewares","type":"Category · Housewares Trade"},{"t":"General Merchandise","k":"mixed-category sourcing for wholesale buyers. housewares trade","url":"catalogue.html#housewares","type":"Category · Housewares Trade"},{"t":"Electrical & Electronic Equipment","k":"sourcing and supply of electrical and electronic equipment for commercial, industrial and infrastructure requirements. industrial commercial infrastructure construction engineering cables switchgear transformers panels lighting generators motors electronics","url":"sectors.html#electrical-electronic","type":"Business Sector"},{"t":"Electrical Equipment","k":"distribution, protection and switching equipment. electrical & electronic equipment","url":"catalogue.html#electrical-electronic","type":"Category · Electrical & Electronic Equipment"},{"t":"Electronic Equipment","k":"instrumentation and electronic assemblies. electrical & electronic equipment","url":"catalogue.html#electrical-electronic","type":"Category · Electrical & Electronic Equipment"},{"t":"Industrial Electrical Products","k":"products specified for industrial environments and duty cycles. electrical & electronic equipment","url":"catalogue.html#electrical-electronic","type":"Category · Electrical & Electronic Equipment"},{"t":"Control Equipment","k":"control panels, starters and automation hardware. electrical & electronic equipment","url":"catalogue.html#electrical-electronic","type":"Category · Electrical & Electronic Equipment"},{"t":"Components","k":"component-level supply against drawings and part numbers. electrical & electronic equipment","url":"catalogue.html#electrical-electronic","type":"Category · Electrical & Electronic Equipment"},{"t":"Commercial Electrical Products","k":"equipment for commercial buildings and facilities. electrical & electronic equipment","url":"catalogue.html#electrical-electronic","type":"Category · Electrical & Electronic Equipment"},{"t":"Power Equipment","k":"generation, conversion and power distribution equipment. electrical & electronic equipment","url":"catalogue.html#electrical-electronic","type":"Category · Electrical & Electronic Equipment"},{"t":"Technology Hardware","k":"it and communications hardware for commercial use. electrical & electronic equipment","url":"catalogue.html#electrical-electronic","type":"Category · Electrical & Electronic Equipment"},{"t":"Chemicals Trading","k":"connecting industrial requirements with reliable sourcing and commercial supply across chemical and manufacturing applications. manufacturing processing industries water and utilities construction chemicals maintenance operations chemicals solvents polymers additives lubricants coatings raw materials","url":"sectors.html#chemicals","type":"Business Sector"},{"t":"Industrial Chemicals","k":"bulk and packaged chemicals for industrial processes. chemicals trading","url":"catalogue.html#chemicals","type":"Category · Chemicals Trading"},{"t":"Chemical Raw Materials","k":"input materials for manufacturing and blending. chemicals trading","url":"catalogue.html#chemicals","type":"Category · Chemicals Trading"},{"t":"Manufacturing Inputs","k":"process inputs supplied to an agreed specification. chemicals trading","url":"catalogue.html#chemicals","type":"Category · Chemicals Trading"},{"t":"Specialty Products","k":"application-specific products sourced to requirement. chemicals trading","url":"catalogue.html#chemicals","type":"Category · Chemicals Trading"},{"t":"Industrial Consumables","k":"recurring consumable supply against forecast. chemicals trading","url":"catalogue.html#chemicals","type":"Category · Chemicals Trading"},{"t":"Equipment & Machinery Trading","k":"sourcing, commercial supply and delivery coordination for construction, industrial and material handling equipment. construction infrastructure manufacturing warehousing industrial projects machinery equipment excavator loader crane forklift plant heavy machines spare parts","url":"sectors.html#equipment-machinery","type":"Business Sector"},{"t":"Construction Equipment","k":"excavators loaders cranes heavy equipment equipment & machinery trading","url":"catalogue.html#equipment-machinery","type":"Category · Equipment & Machinery Trading"},{"t":"Industrial Equipment","k":"production machinery processing equipment industrial systems equipment & machinery trading","url":"catalogue.html#equipment-machinery","type":"Category · Equipment & Machinery Trading"},{"t":"Material Handling","k":"warehouse equipment handling equipment equipment & machinery trading","url":"catalogue.html#equipment-machinery","type":"Category · Equipment & Machinery Trading"},{"t":"Specialized Equipment","k":"application-specific machinery sourced to requirement equipment & machinery trading","url":"catalogue.html#equipment-machinery","type":"Category · Equipment & Machinery Trading"},{"t":"Building Materials Trading","k":"material supply coordinated to construction programmes, from structural packages through finishing works. building construction civil works infrastructure industrial facilities fit-out cement concrete blocks aggregate timber tiles gypsum insulation pipes construction supply","url":"sectors.html#building-materials","type":"Business Sector"},{"t":"Construction Materials","k":"general materials for building and civil works. building materials trading","url":"catalogue.html#building-materials","type":"Category · Building Materials Trading"},{"t":"Structural Materials","k":"load-bearing and structural material packages. building materials trading","url":"catalogue.html#building-materials","type":"Category · Building Materials Trading"},{"t":"Finishing Materials","k":"interior and exterior finishing supply. building materials trading","url":"catalogue.html#building-materials","type":"Category · Building Materials Trading"},{"t":"Infrastructure Materials","k":"materials for roads, utilities and public works. building materials trading","url":"catalogue.html#building-materials","type":"Category · Building Materials Trading"},{"t":"Industrial Construction Supplies","k":"supply for industrial builds and plant works. building materials trading","url":"catalogue.html#building-materials","type":"Category · Building Materials Trading"},{"t":"Project Supplies","k":"consolidated project supply against a programme. building materials trading","url":"catalogue.html#building-materials","type":"Category · Building Materials Trading"},{"t":"Iron & Metal Industry","k":"commercial sourcing and supply of iron and metal products for construction, infrastructure, manufacturing and industrial requirements. construction infrastructure manufacturing engineering industrial projects steel rebar sections plate coil beams structural steel metals fabrication galvanised stainless","url":"sectors.html#iron-metal","type":"Business Sector"},{"t":"Iron Products","k":"iron products for construction and industrial use. iron & metal industry","url":"catalogue.html#iron-metal","type":"Category · Iron & Metal Industry"},{"t":"Steel Products","k":"sections, plate, bar and coil supplied to standard. iron & metal industry","url":"catalogue.html#iron-metal","type":"Category · Iron & Metal Industry"},{"t":"Metal Materials","k":"ferrous and non-ferrous material supply. iron & metal industry","url":"catalogue.html#iron-metal","type":"Category · Iron & Metal Industry"},{"t":"Industrial Metals","k":"metals specified for industrial fabrication. iron & metal industry","url":"catalogue.html#iron-metal","type":"Category · Iron & Metal Industry"},{"t":"Structural Materials","k":"structural steel packages for building and civil works. iron & metal industry","url":"catalogue.html#iron-metal","type":"Category · Iron & Metal Industry"},{"t":"Metal Supply","k":"recurring supply programmes for fabricators. iron & metal industry","url":"catalogue.html#iron-metal","type":"Category · Iron & Metal Industry"},{"t":"Strategic Sourcing","k":"identify suitable products, suppliers and commercial opportunities. sourcing begins with the requirement, not the catalogue. we define what the specification actually demands, map who can supply it credibly, and bring back options that can be compared on the same terms.","url":"solutions.html#strategic-sourcing","type":"Solution"},{"t":"International Trading","k":"facilitate commercial connections between buyers and suppliers. we act as the commercial bridge between an international supplier and a regional buyer — negotiating terms, holding both sides to an agreed sequence, and carrying the transaction through documentation and delivery.","url":"solutions.html#international-trading","type":"Solution"},{"t":"Supply Chain Coordination","k":"coordinate requirements from sourcing through delivery. where several suppliers feed one delivery date, someone has to own the critical path. we hold that role: consolidating schedules, flagging slippage early and re-planning around it.","url":"solutions.html#supply-chain-coordination","type":"Solution"},{"t":"Procurement Support","k":"support supplier identification, quotations and commercial communication. an extension of your procurement desk for categories or geographies where you have no established supply base — running enquiries, chasing quotations and normalising offers for comparison.","url":"solutions.html#procurement-support","type":"Solution"},{"t":"Industrial Supply","k":"support industrial and infrastructure requirements. recurring supply of equipment, materials and consumables to operating facilities, planned around production schedules and maintenance windows rather than one-off orders.","url":"solutions.html#industrial-supply","type":"Solution"},{"t":"Project Supply","k":"coordinate material and equipment requirements for projects. project packages sequenced to the build programme, with material tracked by package rather than by invoice, so site knows what is arriving and when.","url":"solutions.html#project-supply","type":"Solution"},{"t":"Market Access","k":"connect international suppliers with regional commercial opportunities. for manufacturers outside the region, we provide a commercial route in: local presence, buyer introductions and the administrative structure needed to trade here.","url":"solutions.html#market-access","type":"Solution"},{"t":"Construction","k":"material packages and equipment sequenced to build programmes. industry","url":"industries.html#construction","type":"Industry"},{"t":"Infrastructure","k":"supply for roads, utilities and public works programmes. industry","url":"industries.html#infrastructure","type":"Industry"},{"t":"Manufacturing","k":"process inputs, spares and equipment for operating plants. industry","url":"industries.html#manufacturing","type":"Industry"},{"t":"Engineering","k":"specification-led sourcing against drawings and standards. industry","url":"industries.html#engineering","type":"Industry"},{"t":"Logistics","k":"handling equipment, warehouse fit-out and movement coordination. industry","url":"industries.html#logistics","type":"Industry"},{"t":"Hospitality","k":"guest room, housekeeping and food service supply programmes. industry","url":"industries.html#hospitality","type":"Industry"},{"t":"Energy","k":"equipment and consumable supply for energy operations. industry","url":"industries.html#energy","type":"Industry"},{"t":"Industrial Projects","k":"consolidated supply for plant construction and expansion. industry","url":"industries.html#industrial-projects","type":"Industry"},{"t":"Commercial Development","k":"fit-out, finishing and building services material supply. industry","url":"industries.html#commercial-development","type":"Industry"},{"t":"Procurement","k":"category support for teams sourcing into new markets. industry","url":"industries.html#procurement","type":"Industry"},{"t":"Trading","k":"wholesale and distribution supply across mixed categories. industry","url":"industries.html#trading","type":"Industry"}];

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initMegaMenu();
    initMobileMenu();
    initSearch();
    initReveal();
    initConsent();
    initFinder();
    initFlowPickers();
    initRegionPicker();
    initInsightsFilter();
    initMailtoForms();
    initActiveNav();
    initEscapeKey();
  });

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // ---- header: compact-on-scroll -----------------------------------
  function initHeaderScroll() {
    var header = $("#uai-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-compact", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- mega menu (desktop hover + keyboard/click toggle) ------------
  // #uai-mega is *not* a DOM descendant of #uai-mega-wrap (it renders as a
  // full-width panel right below the header, same as the original's
  // conditionally-mounted <sc-if> block) — so visibility toggles on the
  // panel itself, not through a `.wrap.is-open .panel` descendant rule.
  function initMegaMenu() {
    var wrap = $("#uai-mega-wrap");
    var toggle = $("#uai-mega-toggle");
    var mega = $("#uai-mega");
    if (!wrap || !toggle || !mega) return;
    var hoverOpenedAt = 0;
    var open = function () {
      if (window.innerWidth < 1181) return;
      wrap.classList.add("is-open");
      mega.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };
    var close = function () {
      wrap.classList.remove("is-open");
      mega.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    wrap.addEventListener("mouseenter", function () { hoverOpenedAt = Date.now(); open(); });
    wrap.addEventListener("mouseleave", close);
    mega.addEventListener("mouseenter", open);
    mega.addEventListener("mouseleave", close);
    toggle.addEventListener("click", function () {
      // A physical mouse click is always preceded by its own mouseenter on
      // `wrap`, which may have *just* opened the menu — treat a click that
      // immediately follows that hover as "keep open" rather than a
      // toggle-close, or hovering-then-clicking would instantly re-close
      // the menu it just opened. A later click (or one with no preceding
      // hover, e.g. keyboard/touch) still toggles normally.
      if (mega.classList.contains("is-open") && Date.now() - hoverOpenedAt < 400) return;
      mega.classList.contains("is-open") ? close() : open();
    });
    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target) && !mega.contains(e.target)) close();
    });
    window._uaiCloseMega = close;
  }

  // ---- mobile menu ----------------------------------------------------
  function initMobileMenu() {
    var panel = $("#uai-mobile-panel");
    var openBtn = $("#uai-mobile-open");
    var closeBtn = $("#uai-mobile-close");
    if (!panel || !openBtn) return;
    var open = function () { panel.classList.add("is-open"); document.body.style.overflow = "hidden"; };
    var close = function () { panel.classList.remove("is-open"); document.body.style.overflow = ""; };
    openBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    $all("a", panel).forEach(function (a) { a.addEventListener("click", close); });
    window._uaiCloseMobile = close;
  }

  // ---- search modal ---------------------------------------------------
  function scoreEntry(entry, terms) {
    var hay = (entry.t + " " + entry.k + " " + entry.type).toLowerCase();
    var titleLower = entry.t.toLowerCase();
    var score = 0;
    terms.forEach(function (t) {
      if (titleLower.indexOf(t) === 0) score += 6;
      else if (titleLower.indexOf(t) > -1) score += 4;
      if (hay.indexOf(t) > -1) score += 1;
    });
    return score;
  }
  function search(q) {
    if (!q || q.trim().length < 2) return [];
    var terms = q.toLowerCase().trim().split(/\s+/);
    return SEARCH_INDEX
      .map(function (r) { return { r: r, score: scoreEntry(r, terms) }; })
      .filter(function (x) { return x.score > 1; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 12)
      .map(function (x) { return x.r; });
  }
  function initSearch() {
    var backdrop = $("#uai-search-backdrop");
    var openBtn = $("#uai-search-open");
    var closeBtn = $("#uai-search-close");
    var input = $("#uai-search-input");
    var results = $("#uai-search-results");
    if (!backdrop || !input || !results) return;

    var SUGGESTIONS = ["Machinery", "Steel", "Logistics", "Building materials", "Electrical equipment", "Chemicals", "Warehousing", "Supplier registration"];

    function render(q) {
      var qLen = q.trim().length;
      if (qLen < 2) {
        results.innerHTML = '<div class="uai-search-idle"><p style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;opacity:.5;margin:0 0 12px">Frequent searches</p><div class="uai-search-suggestions">' +
          SUGGESTIONS.map(function (s) { return '<button type="button" class="uai-search-chip" data-suggestion="' + s + '">' + s + "</button>"; }).join("") +
          "</div></div>";
        $all("[data-suggestion]", results).forEach(function (b) {
          b.addEventListener("click", function () { input.value = b.getAttribute("data-suggestion"); render(input.value); input.focus(); });
        });
        return;
      }
      var hits = search(q);
      if (!hits.length) {
        results.innerHTML = '<div class="uai-search-empty"><p style="font-family:var(--font-heading);font-size:22px;margin:0 0 6px">No matches for &ldquo;' + escapeHtml(q) + '&rdquo;</p>' +
          '<p style="font-size:13.5px;opacity:.65;margin:0 0 18px">Try a sector name, a material, or a service &mdash; or send us the requirement directly.</p>' +
          '<a href="forms.html#request-a-quote" style="font-size:13px;color:var(--color-accent);text-decoration:none;border-bottom:1px solid color-mix(in srgb,#b68235 45%,transparent)">Request a quote &#8594;</a></div>';
        return;
      }
      results.innerHTML = hits.map(function (r) {
        return '<a class="uai-search-row" href="' + r.url + '"><span class="uai-search-row-title">' + escapeHtml(r.t) +
          '</span><span class="uai-search-row-type">' + escapeHtml(r.type) + "</span><span style=\"color:var(--color-accent);font-size:13px\">&#8594;</span></a>";
      }).join("");
    }
    function escapeHtml(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

    function open() {
      backdrop.classList.add("is-open");
      input.value = "";
      render("");
      setTimeout(function () { input.focus(); }, 30);
      document.body.style.overflow = "hidden";
    }
    function close() {
      backdrop.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    openBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) close(); });
    input.addEventListener("input", function () { render(input.value); });
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); open(); }
    });
    window._uaiCloseSearch = close;
  }

  function initEscapeKey() {
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (window._uaiCloseSearch) window._uaiCloseSearch();
      if (window._uaiCloseMobile) window._uaiCloseMobile();
      if (window._uaiCloseMega) window._uaiCloseMega();
    });
  }

  // ---- scroll reveal ----------------------------------------------------
  function initReveal() {
    var els = $all("[data-reveal]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("uai-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("uai-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---- cookie consent ----------------------------------------------------
  function initConsent() {
    var box = $("#uai-consent");
    if (!box) return;
    var KEY = "uai:cookie-consent";
    var accept = $("#uai-consent-accept");
    var decline = $("#uai-consent-decline");
    try {
      if (localStorage.getItem(KEY)) { box.classList.add("is-hidden"); return; }
    } catch (e) {}
    function choose(v) {
      try { localStorage.setItem(KEY, v); } catch (e) {}
      box.classList.add("is-hidden");
    }
    if (accept) accept.addEventListener("click", function () { choose("all"); });
    if (decline) decline.addEventListener("click", function () { choose("essential"); });
  }

  // ---- home page "smart business finder" --------------------------------
  function initFinder() {
    var btns = $all("[data-finder-btn]");
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var slug = btn.getAttribute("data-slug");
        btns.forEach(function (b) { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        $all("[data-finder-panel]").forEach(function (p) {
          var match = p.getAttribute("data-finder-panel") === slug;
          p.hidden = !match;
          p.style.display = match ? "grid" : "none";
        });
      });
    });
  }

  // ---- sector "flow" stage pickers (sectors.html) ------------------------
  function initFlowPickers() {
    var groups = {};
    $all("[data-flow-btn]").forEach(function (btn) {
      var g = btn.getAttribute("data-flow-group");
      (groups[g] = groups[g] || []).push(btn);
    });
    Object.keys(groups).forEach(function (g) {
      groups[g].forEach(function (btn) {
        btn.addEventListener("click", function () {
          var i = btn.getAttribute("data-i");
          groups[g].forEach(function (b) {
            var active = b === btn;
            b.classList.toggle("is-active", active);
            b.setAttribute("aria-pressed", active ? "true" : "false");
          });
          $all('[data-flow-panel][data-flow-group="' + g + '"]').forEach(function (p) {
            p.hidden = p.getAttribute("data-i") !== i;
          });
        });
      });
    });
  }

  // ---- global reach corridor picker --------------------------------------
  function initRegionPicker() {
    var btns = $all("[data-region-btn]");
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = btn.getAttribute("data-i");
        btns.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
          if (!b.classList.contains("uai-region-is-home")) {
            b.style.color = active ? "#b68235" : "color-mix(in srgb,#f3f2f2 68%,transparent)";
          }
          b.style.borderBottomColor = active ? "#b68235" : "transparent";
        });
        $all("[data-region-dot]").forEach(function (d) {
          var active = d.getAttribute("data-i") === i;
          d.setAttribute("r", active ? "1.7" : (d.getAttribute("data-home") === "1" ? "2.1" : "1.2"));
          if (d.getAttribute("data-home") !== "1") d.setAttribute("fill", active ? "#b68235" : "color-mix(in srgb,#b68235 28%,transparent)");
        });
        $all("[data-region-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-i") !== i; });
      });
    });
  }

  // ---- insights category filter ------------------------------------------
  function initInsightsFilter() {
    var chips = $all(".uai-insight-chip");
    var cards = $all("#uai-programme-grid [data-cat]");
    var empty = $("#uai-insight-empty");
    var grid = $("#uai-programme-grid");
    if (!chips.length || !cards.length) return;
    function apply(cat) {
      var shown = 0;
      cards.forEach(function (c) {
        var match = cat === "All" || c.getAttribute("data-cat") === cat;
        c.style.display = match ? "" : "none";
        if (match) shown++;
      });
      if (grid) grid.hidden = shown === 0;
      if (empty) empty.hidden = shown !== 0;
      chips.forEach(function (c) { c.classList.toggle("is-active", c.getAttribute("data-filter") === cat); });
    }
    chips.forEach(function (c) {
      c.addEventListener("click", function (e) {
        e.preventDefault();
        apply(c.getAttribute("data-filter"));
      });
    });
    var reset = $("#uai-insight-reset");
    if (reset) reset.addEventListener("click", function (e) { e.preventDefault(); apply("All"); });
  }

  // ---- mailto forms -------------------------------------------------------
  // No backend exists yet (see handoff/README.md — Next.js API routes are
  // specified there). Until that is wired up, submitting drafts a plain-text
  // email in the visitor's own mail client. Attachments cannot travel over a
  // mailto: link, so file fields say so explicitly in their label/hint.
  function initMailtoForms() {
    $all("form[data-mailto]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.reportValidity()) return;

        var to = form.getAttribute("data-mailto-to");
        var lines = [];
        $all("input[name], textarea[name], select[name]", form).forEach(function (el) {
          if (el.type === "checkbox" || el.type === "radio") {
            if (el.type === "radio" && !el.checked) return;
            if (el.type === "checkbox") return; // consent checkbox — not a body field
          }
          var label = el.getAttribute("data-label") || el.name;
          var value = (el.value || "").trim();
          if (!value) return;
          lines.push(label + ": " + value);
        });
        var body = lines.join("\n");
        var subjectField = form.getAttribute("data-mailto-subject-field");
        var subject = form.getAttribute("data-mailto-subject") ||
          (subjectField ? (form.querySelector('[name="' + subjectField + '"]') || {}).value : "") ||
          "Website enquiry";

        var href = "mailto:" + encodeURIComponent(to) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        window.location.href = href;

        var successId = form.getAttribute("data-mailto-success");
        if (successId) {
          var successEl = document.getElementById(successId);
          if (successEl) {
            successEl.hidden = false;
            form.hidden = true;
            successEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  // ---- active nav highlight ------------------------------------------------
  function initActiveNav() {
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $all(".uai-footer-link, .uai-mobile-link").forEach(function (a) {
      var target = (a.getAttribute("href") || "").split("#")[0].toLowerCase();
      if (target && target === here) a.setAttribute("aria-current", "page");
    });
  }
})();
