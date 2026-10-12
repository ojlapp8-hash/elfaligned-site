/* ELFALIGNED LLC — progressive enhancement only.
   Everything below degrades gracefully; the site is fully usable with JS off. */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile nav disclosure --------------------------------------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-nav-panel]");

  /* ---- Skip link: JS fallback for environments where :focus
     pseudo-class doesn't apply (headless/automation edge cases).
     Real browsers handle this via CSS alone; this is belt-and-braces. */
  var skip = document.querySelector(".skip-link");
  if (skip) {
    skip.addEventListener("focus", function () { skip.classList.add("is-visible"); });
    skip.addEventListener("blur", function () { skip.classList.remove("is-visible"); });
  }

  function setNav(open) {
    if (!toggle || !panel) return;
    panel.setAttribute("data-open", open ? "true" : "false");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    var label = toggle.querySelector("[data-nav-label]");
    if (label) label.textContent = open ? "Close" : "Menu";
  }

  if (toggle && panel) {
    setNav(false);
    toggle.addEventListener("click", function () {
      setNav(panel.getAttribute("data-open") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.getAttribute("data-open") === "true") {
        setNav(false);
        toggle.focus();
      }
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
  }

  /* ---- Footer year ------------------------------------------------ */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---- Contact form: client validation + mailto fallback ----------
     Primary submit path is a real POST to the form endpoint (set via
     data-endpoint on the <form>). If no endpoint is configured, or the
     POST fails, we fall back to opening the visitor's mail client with
     the message pre-filled so no enquiry is ever silently dropped.

     Applies to any form carrying data-contact-form — the contact page
     and the consultation page share this logic. */
  var forms = document.querySelectorAll("[data-contact-form]");

  forms.forEach(function (form) {
    initForm(form);
  });

  function initForm(form) {
    var status = form.querySelector("[data-form-status]");
    var submitBtn = form.querySelector("[data-form-submit]");
    var endpoint = form.getAttribute("data-endpoint") || "";
    var mailto = form.getAttribute("data-mailto") || "";
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function show(el, msg, isError) {
    el.hidden = false;
    el.textContent = msg;
    el.style.borderColor = isError ? "#ff8f7a" : "";
    el.setAttribute("role", isError ? "alert" : "status");
  }

  function fail(input, msg) {
    var field = input.closest(".field");
    var err = field.querySelector(".field__error");
    if (!err) return;
    err.hidden = false;
    err.textContent = msg;
    field.classList.add("field--error");
    input.setAttribute("aria-invalid", "true");
    if (err.id) input.setAttribute("aria-describedby", err.id);
  }

  function clear(input) {
    var field = input.closest(".field");
    var err = field.querySelector(".field__error");
    if (err) err.hidden = true;
    field.classList.remove("field--error");
    input.removeAttribute("aria-invalid");
  }

  form.addEventListener("input", function (e) {
    if (e.target.matches("input, textarea, select")) clear(e.target);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!status) return;

    // Validate whatever required controls this form actually declares, so the
    // same code serves the contact form and the consultation form.
    var required = [].slice.call(form.querySelectorAll("[required]"));
    var ok = true;

    required.forEach(clear);

    required.forEach(function (el) {
      var val = (el.value || "").trim();
      if (el.type === "email") {
        if (!EMAIL_RE.test(val)) {
          fail(el, "Please enter a valid email address, e.g. you@company.com.");
          ok = false;
        }
        return;
      }
      if (el.tagName === "TEXTAREA") {
        if (val.length < 10) {
          fail(el, "A sentence or two is plenty — but please write something.");
          ok = false;
        }
        return;
      }
      if (!val) {
        fail(el, "Please fill this in.");
        ok = false;
      }
    });

    if (!ok) {
      status.hidden = true;
      var firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
      return;
    }

    var payload = {
      name: (form.querySelector("#name") || { value: "" }).value.trim(),
      email: (form.querySelector("#email") || { value: "" }).value.trim(),
      org: (form.querySelector("#org") || {}).value || "",
      topic: (form.querySelector("#topic") || {}).value || "",
      budget: (function () {
        var b = form.querySelector("#budget");
        return b && b.value ? b.value : "";
      })(),
      message: (form.querySelector("#message") || { value: "" }).value.trim()
    };

    if (endpoint) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        show(status, "Thanks — your message is in. A real person will read it and reply.", false);
        form.reset();
      }).catch(function () {
        openMailto(payload);
        show(status, "The online form is unreachable right now, so we opened your email app with the message ready to send. Nothing is lost.", true);
      }).then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      });
      return;
    }

    // No endpoint configured — open the visitor's mail client with the
    // message pre-filled. Nothing is lost.
    openMailto(payload);
    show(status, "No form endpoint is configured yet — we opened your email app with the message ready to send.", true);
  });

  /* Build the email body from whatever fields the form actually has,
     using each control's <label> text as the line label. This keeps one
     code path for the contact form and the consultation form. */
  function openMailto(p) {
    if (!mailto) return;
    var labelFor = function (el) {
      // Radios/checkboxes in a group share one name and usually have no id;
      // their data-label carries the human-readable group label.
      if ((el.type === "radio" || el.type === "checkbox") && el.getAttribute("data-label")) {
        return el.getAttribute("data-label");
      }
      if (!el.id) return el.name || "Field";
      var lab = form.querySelector('label[for="' + el.id + '"]');
      if (!lab) return el.name || "Field";
      // strip the "(optional)" hint span before reading the text
      var clone = lab.cloneNode(true);
      var hint = clone.querySelector(".hint");
      if (hint) hint.parentNode.removeChild(hint);
      return clone.textContent.replace(/\s+/g, " ").trim();
    };

    var lines = [];
    var seen = {};
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      if (el.type === "hidden" || el.type === "submit") return;
      var val = "";
      if (el.type === "radio") {
        if (!el.checked) return;
        val = el.value;
      } else if (el.type === "checkbox") {
        val = el.checked ? "Yes" : "";
      } else {
        val = (el.value || "").trim();
      }
      if (!val) return;
      // one line per group: a checked radio is the only one that emits
      var label = labelFor(el);
      if (seen[label]) return;
      seen[label] = true;
      lines.push(label + ": " + val);
    });

    var subjectPrefix = form.getAttribute("data-subject-prefix") || "Website enquiry";
    var subject = subjectPrefix + " — " + (p.org || p.name || "New enquiry");

    window.location.href =
      "mailto:" + mailto +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }
  }
})();
