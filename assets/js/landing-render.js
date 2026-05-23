/**
 * landing-render.js
 * ==========================================================
 * Tiny dependency-free template engine that hydrates a
 * static HTML page from `window.MRX_CONFIG`.
 *
 * The page renders correctly even if this script never
 * loads — every bound element is authored with a fallback
 * default inside it. This script's job is to overwrite
 * those fallbacks when a real config value is available.
 *
 * Directives recognized:
 *   data-bind="path.to.value"
 *   data-bind-attr="attr1:path1; attr2:path2"
 *   data-bind-list="path" data-bind-list-tpl="<li>{value}</li>"
 *   data-bind-show="path"
 *   data-track="event_name"
 *
 * Tracking:
 *   window.mrxTrack(eventName) — forwards to gtag/fbq if
 *   present, then console.debug("[mrx.track]", eventName).
 *   Event names only. No PHI. No partner-clinic identifiers.
 * ========================================================== */

(function () {
  "use strict";

  var PLACEHOLDER = "[CLIENT TO CONFIRM]";

  // ---------- helpers --------------------------------------------------------

  function resolve(path, root) {
    if (!path || !root) return undefined;
    var parts = String(path).split(".");
    var cur = root;
    for (var i = 0; i < parts.length; i++) {
      if (cur === null || cur === undefined) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function isPlaceholder(v) {
    if (typeof v === "string" && v.indexOf(PLACEHOLDER) === 0) return true;
    return false;
  }

  function isMeaningful(v) {
    if (v === null || v === undefined) return false;
    if (typeof v === "string") {
      var s = v.trim();
      if (!s) return false;
      if (isPlaceholder(s)) return false;
      return true;
    }
    if (Array.isArray(v)) {
      if (!v.length) return false;
      // empty if every entry is empty/placeholder
      for (var i = 0; i < v.length; i++) {
        if (isMeaningful(v[i])) return true;
      }
      return false;
    }
    if (typeof v === "object") return Object.keys(v).length > 0;
    return true; // booleans, numbers
  }

  function toText(v) {
    if (v === null || v === undefined) return "";
    if (Array.isArray(v)) return v.filter(isMeaningful).join(", ");
    return String(v);
  }

  // A fallback is "obviously authoring shorthand" (e.g. $XXX, [TBD], ...)
  // and therefore safe to overwrite with a placeholder badge. Anything else
  // is treated as real content and is left alone — this protects retrofitted
  // pages whose `data-bind` fallback is the production copy.
  function isObviousAuthoringStub(text) {
    if (!text) return true;
    var t = String(text).trim();
    if (!t) return true;
    if (t.length <= 3) return true;
    if (/^\[.*\]$/.test(t)) return true;                 // [TBD], [TODO], etc.
    if (/^\$?[X\u2026\u2014\u2013\-\.]+$/.test(t)) return true; // $XXX, XXX, …
    return false;
  }

  function applyText(el, value) {
    if (value === undefined) return;                       // leave fallback
    if (isPlaceholder(value)) {
      // Only stamp the QA-yellow placeholder when the existing fallback is
      // obvious authoring shorthand. Real production copy is preserved.
      if (isObviousAuthoringStub(el.textContent)) {
        el.textContent = PLACEHOLDER;
        el.classList.add("lp-placeholder");
      }
      return;
    }
    if (!isMeaningful(value)) return;                      // leave fallback
    el.textContent = toText(value);
    el.classList.remove("lp-placeholder");
  }

  function applyAttrs(el, spec, cfg) {
    if (!spec) return;
    var pairs = spec.split(";");
    for (var i = 0; i < pairs.length; i++) {
      var p = pairs[i].trim();
      if (!p) continue;
      var idx = p.indexOf(":");
      if (idx === -1) continue;
      var attr = p.slice(0, idx).trim();
      var path = p.slice(idx + 1).trim();
      var v = resolve(path, cfg);
      if (v === undefined || v === null || isPlaceholder(v) || v === "") continue;
      el.setAttribute(attr, toText(v));
    }
  }

  function renderTemplate(tpl, item) {
    if (item === null || item === undefined) return "";
    if (typeof item !== "object" || Array.isArray(item)) {
      return tpl.replace(/\{value\}/g, escapeHtml(toText(item)));
    }
    return tpl.replace(/\{([a-zA-Z0-9_]+)\}/g, function (_, k) {
      return escapeHtml(toText(item[k]));
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function applyList(el, listVal, tpl) {
    if (!Array.isArray(listVal)) return;
    var meaningful = listVal.filter(isMeaningful);
    if (!meaningful.length) return;       // leave fallback markup
    var html = meaningful.map(function (item) {
      return renderTemplate(tpl, item);
    }).join("");
    el.innerHTML = html;
  }

  function applyShow(el, value) {
    if (!isMeaningful(value)) {
      el.style.display = "none";
    }
  }

  // ---------- pass over the DOM ---------------------------------------------

  function hydrate(cfg) {
    if (!cfg) return;

    // 1. data-bind-show first, so subsequent passes skip hidden subtrees if any
    var showEls = document.querySelectorAll("[data-bind-show]");
    for (var i = 0; i < showEls.length; i++) {
      var path = showEls[i].getAttribute("data-bind-show");
      applyShow(showEls[i], resolve(path, cfg));
    }

    // 2. data-bind-list
    var listEls = document.querySelectorAll("[data-bind-list]");
    for (var j = 0; j < listEls.length; j++) {
      var el = listEls[j];
      var p = el.getAttribute("data-bind-list");
      var tpl = el.getAttribute("data-bind-list-tpl") || "<li>{value}</li>";
      applyList(el, resolve(p, cfg), tpl);
    }

    // 3. data-bind-attr
    var attrEls = document.querySelectorAll("[data-bind-attr]");
    for (var k = 0; k < attrEls.length; k++) {
      applyAttrs(attrEls[k], attrEls[k].getAttribute("data-bind-attr"), cfg);
    }

    // 4. data-bind (text)
    var bindEls = document.querySelectorAll("[data-bind]");
    for (var l = 0; l < bindEls.length; l++) {
      var bp = bindEls[l].getAttribute("data-bind");
      applyText(bindEls[l], resolve(bp, cfg));
    }
  }

  // ---------- tracking -------------------------------------------------------

  function mrxTrack(eventName) {
    if (typeof eventName !== "string" || !eventName) return;
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName);
      }
    } catch (e) { /* swallow */ }
    try {
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", eventName);
      }
    } catch (e) { /* swallow */ }
    try { console.debug("[mrx.track]", eventName); } catch (e) {}
  }

  window.mrxTrack = mrxTrack;

  // Delegate click tracking
  document.addEventListener("click", function (ev) {
    var el = ev.target;
    while (el && el !== document.body) {
      if (el.hasAttribute && el.hasAttribute("data-track")) {
        mrxTrack(el.getAttribute("data-track"));
        return;
      }
      el = el.parentNode;
    }
  }, true);

  // ---------- boot -----------------------------------------------------------

  function boot() {
    var cfg = window.MRX_CONFIG || {};
    try {
      hydrate(cfg);
    } catch (e) {
      try { console.warn("[mrx.render] hydration failed", e); } catch (_) {}
    }
    mrxTrack("page_view");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
