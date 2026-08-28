/* United Assets Investments — static site interactivity.
   Vanilla JS, no dependencies. Replaces what the Claude Design / React
   runtime used to do with component state: header behavior, the mega/
   mobile/search overlays, scroll reveals, in-page pickers (finder, sector
   flow, reach corridors, insights filter) and the mailto: form handler.
   SEARCH_INDEX below is generated at build time from content.js by
   tools/generate.js — see that file for the source of truth. */
"use strict";
(function () {
  var SEARCH_INDEX = __SEARCH_INDEX__;

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
