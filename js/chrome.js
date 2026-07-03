/* =====================================================================
   SH ELEVATE — Shared chrome: navigation, footer, page transitions
   Injected on every page so markup stays DRY. Runs immediately
   (script lives at end of <body>, so document.body exists).
   Set <body data-active="services|blog|team|areas|contact"> to highlight.
   ===================================================================== */
(function () {
  "use strict";

  const active = document.body.getAttribute("data-active") || "";
  const P = document.body.getAttribute("data-prefix") || ""; // "" at root

  // Shared handset glyph — prefixes every phone number so it reads as tap-to-call.
  const PHONE_SVG = '<svg class="tel-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><path d="M6.6 10.8a12 12 0 0 0 5.6 5.6l1.9-1.9a1 1 0 0 1 1-.24 9.6 9.6 0 0 0 3 .48 1 1 0 0 1 1 1V19a1 1 0 0 1-1 1A15.5 15.5 0 0 1 4 5a1 1 0 0 1 1-1h2.3a1 1 0 0 1 1 1 9.6 9.6 0 0 0 .48 3 1 1 0 0 1-.24 1z"/></svg>';

  const areas = [
    { code: "ON", province: "Ontario", cities: [
      ["Scarborough", P + "scarborough.html"],
      ["Toronto", P + "service-areas.html"],
      ["Hamilton", P + "service-areas.html"],
      ["London", P + "service-areas.html"],
      ["Sudbury", P + "service-areas.html"],
      ["Thunder Bay", P + "service-areas.html"],
    ]},
    { code: "NL", province: "Newfoundland & Labrador", cities: [
      ["Corner Brook", P + "service-areas.html"],
      ["Province-wide", P + "service-areas.html"],
    ]},
    { code: "NS", province: "Nova Scotia", cities: [["Province-wide", P + "service-areas.html"]]},
    { code: "PE", province: "Prince Edward Island", cities: [["Province-wide", P + "service-areas.html"]]},
    { code: "AB", province: "Alberta", cities: [["Grande Prairie", P + "service-areas.html"]]},
  ];

  const navLinks = [
    { key: "home", label: "Home", href: P || "index.html" },
    { key: "services", label: "Services", href: P + "services.html" },
    { key: "blog", label: "Insights", href: P + "blog.html" },
    { key: "team", label: "Team", href: P + "team.html" },
  ];

  const megaCols = areas.map((g) => `
    <div class="mega-col">
      <div class="mega-prov"><span class="mega-code">${g.code}</span>${g.province}</div>
      <div class="mega-cities">
        ${g.cities.map(([n, h]) => `<a href="${h}"><span class="dot"></span>${n}</a>`).join("")}
      </div>
    </div>`).join("");

  /* ---------------- NAV ---------------- */
  const header = document.createElement("header");
  header.className = "nav";
  header.innerHTML = `
    <a href="${P || "index.html"}" class="nav-logo" aria-label="SH Elevate Financial Group">
      <span class="logo-corner">
        <img class="logo-corner-bg" src="${P}images/curve.png" alt="" aria-hidden="true" />
        <img class="logo-corner-mark" src="${P}images/logo-white.png" alt="SH Elevate Financial Group" />
      </span>
    </a>
    <nav class="nav-links">
      ${navLinks.map((l) => `<a class="nav-link ${active === l.key ? "is-active" : ""}" href="${l.href}">${l.label}</a>`).join("")}
      <div class="nav-areas ${active === "areas" ? "is-active" : ""}">
        <button class="nav-link nav-areas-btn" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14" style="opacity:.6"><path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
          Service Areas
          <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" width="13" height="13"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="mega">
          <div class="mega-head">
            <div><h4>Service Areas Across Canada</h4><p>Remote tax services from coast to coast</p></div>
            <a class="mega-all" href="${P}service-areas.html">View All →</a>
          </div>
          <div class="mega-grid">${megaCols}</div>
          <div class="mega-foot">Serving 11+ communities across 5 provinces</div>
        </div>
      </div>
    </nav>
    <div class="nav-right">
      <a class="nav-phone" href="tel:+14379256546" aria-label="Call us at (437) 925-6546">${PHONE_SVG}<span>437·925·6546</span></a>
      <a class="btn btn-gold nav-cta" href="${P}team.html" data-magnetic>Book Appointment</a>
      <button class="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>`;
  document.body.insertBefore(header, document.body.firstChild);

  /* ---------------- MOBILE MENU ---------------- */
  const mm = document.createElement("div");
  mm.className = "mobile-menu";
  mm.innerHTML = `
    <a href="${P || "index.html"}">Home</a>
    <a href="${P}services.html">Services</a>
    <a href="${P}blog.html">Insights</a>
    <a href="${P}team.html">Team</a>
    <a href="${P}service-areas.html">Service Areas</a>
    <a href="${P || "index.html"}#contact">Contact</a>
    <div class="mm-foot">
      <a class="tel-inline" href="tel:+14379256546" aria-label="Call us at (437) 925-6546">${PHONE_SVG}<span>+1 (437) 925-6546</span></a>
      <a href="mailto:info@shelevate.ca">info@shelevate.ca</a>
    </div>`;
  document.body.insertBefore(mm, header.nextSibling);

  /* ---------------- FOOTER ---------------- */
  const footerAreas = [
    { province: "Ontario", cities: [["Thunder Bay"],["Timmins"],["Sudbury"],["Hamilton"],["London"],["Sault Ste. Marie"]] },
    { province: "Atlantic Canada", cities: [["Corner Brook, NL"],["Newfoundland"],["Nova Scotia"],["PEI"]] },
    { province: "Western Canada", cities: [["Grande Prairie, AB"]] },
  ];
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.id = "site-footer";
  footer.innerHTML = `
    <div class="footer-glow"></div>
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <img class="logo-img" src="${P}images/logo-white.png" alt="SH Elevate Financial Group" width="220" height="141" />
          <p>A trusted Canadian tax and accounting firm built on integrity, accuracy, and client-centered service.</p>
          <!-- Social links intentionally omitted until real profile URLs are provided. -->
          <a class="footer-cta-link" href="${P}team.html">Book a free consultation →</a>
        </div>
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="${P || "index.html"}">Home</a></li>
            <li><a href="${P}services.html">Services</a></li>
            <li><a href="${P}service-areas.html">Service Areas</a></li>
            <li><a href="${P}team.html">Our Team</a></li>
            <li><a href="${P}blog.html">Insights</a></li>
            <li><a href="${P || "index.html"}#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="${P}services-personal-tax.html">Personal Tax Services</a></li>
            <li><a href="${P}services-corporate-tax.html">Corporate Tax Services</a></li>
            <li><a href="${P}services-gst-hst.html">GST/HST Registration &amp; Filing</a></li>
            <li><a href="${P}services-business-incorporation.html">Business Incorporation</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@shelevate.ca">info@shelevate.ca</a></li>
            <li><a class="tel-inline" href="tel:+14379256546" aria-label="Call us at (437) 925-6546">${PHONE_SVG}<span>+1 (437) 925-6546</span></a></li>
            <li><a class="tel-inline" href="tel:+19029198696" aria-label="Call our Atlantic line at (902) 919-8696">${PHONE_SVG}<span>+1 (902) 919-8696</span></a></li>
            <li>36 Lee Centre Dr, Scarborough ON M1H 3K2</li>
          </ul>
        </div>
      </div>
      <div class="footer-areas">
        <div class="fa-head"><h4>Service Areas Across Canada</h4><a href="${P}service-areas.html">View All →</a></div>
        <div class="fa-groups">
          ${footerAreas.map((g) => `
            <div class="fa-group">
              <div class="fg-region">${g.province}</div>
              <div class="fg-links">${g.cities.map((c) => `<a href="${P}service-areas.html">${c[0]}</a>`).join("")}</div>
            </div>`).join("")}
        </div>
      </div>
      <div class="footer-bar">
        <span>© 2026 SH Elevate Financial Group Inc. All rights reserved.</span>
        <div class="fb-links"><a href="${P}privacy.html">Privacy Policy</a><a href="${P}terms.html">Terms of Service</a><span>shelevate.ca</span></div>
      </div>
    </div>`;
  document.body.appendChild(footer);

  /* ---------------- PAGE TRANSITION CURTAIN ---------------- */
  const curtain = document.createElement("div");
  curtain.className = "page-curtain";
  curtain.innerHTML = `<img class="logo-img" src="${P}images/logo-white.png" alt="" /><span class="curtain-bar"></span>`;
  document.body.appendChild(curtain);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Enter animation: only if we arrived via an in-site curtain nav
  if (!reduce && sessionStorage.getItem("sh-curtain") === "1") {
    curtain.classList.add("cover");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        curtain.classList.add("lift");
        setTimeout(() => { curtain.classList.remove("cover", "lift"); }, 850);
      });
    });
  }
  sessionStorage.removeItem("sh-curtain");

  // Leave animation on internal links
  const isInternal = (a) => {
    if (!a) return false;
    const href = a.getAttribute("href") || "";
    if (a.target === "_blank" || a.hasAttribute("download")) return false;
    if (/^(mailto:|tel:|#)/.test(href)) return false;
    if (/^https?:\/\//.test(href)) return false;
    return href.endsWith(".html") || href.includes(".html#");
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!isInternal(a)) return;
    if (reduce) return;
    e.preventDefault();
    const href = a.getAttribute("href");
    sessionStorage.setItem("sh-curtain", "1");
    curtain.classList.add("cover", "drop");
    setTimeout(() => { window.location.href = href; }, 560);
  });

  /* ---------------- Click-to-call QR (desktop only) ----------------
     On a phone, tapping a tel: link dials natively — leave it alone. On a
     desktop (no dialer), a click is a dead end, so intercept it and show a
     "scan to call from your phone" QR instead. */
  const canDial = window.matchMedia("(pointer: coarse)").matches;
  if (!canDial) {
    const pop = document.createElement("div");
    pop.className = "callpop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-modal", "true");
    pop.setAttribute("aria-label", "Call SH Elevate Financial Group");
    pop.innerHTML = `
      <div class="callpop-backdrop" data-close></div>
      <div class="callpop-card">
        <button class="callpop-close" data-close aria-label="Close">&times;</button>
        <div class="callpop-eyebrow">Call us</div>
        <div class="callpop-qr"><img alt="QR code — scan with your phone to call" width="188" height="188" /></div>
        <p class="callpop-hint">Point your phone camera here to call</p>
        <a class="callpop-num" href="tel:"></a>
        <button class="callpop-copy" type="button">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>
          <span>Copy number</span>
        </button>
      </div>`;
    document.body.appendChild(pop);

    const qrImg = pop.querySelector(".callpop-qr img");
    const numEl = pop.querySelector(".callpop-num");
    const copyBtn = pop.querySelector(".callpop-copy");
    const copyLabel = copyBtn.querySelector("span");
    let currentTel = "";

    const digitsOf = (tel) => tel.replace(/[^0-9]/g, "");
    const qrFor = (tel) => P + (digitsOf(tel).endsWith("9029198696") ? "images/call-qr-902.svg" : "images/call-qr-437.svg");
    const pretty = (tel) => {
      const d = digitsOf(tel).replace(/^1/, "");
      return d.length === 10 ? `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : tel;
    };

    const onKey = (e) => { if (e.key === "Escape") close(); };
    function open(tel) {
      currentTel = tel;
      qrImg.src = qrFor(tel);
      numEl.href = "tel:" + tel;
      numEl.textContent = pretty(tel);
      copyBtn.classList.remove("copied");
      copyLabel.textContent = "Copy number";
      pop.classList.add("open");
      document.addEventListener("keydown", onKey);
    }
    function close() {
      pop.classList.remove("open");
      document.removeEventListener("keydown", onKey);
    }

    pop.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) close(); });
    copyBtn.addEventListener("click", () => {
      const done = () => { copyBtn.classList.add("copied"); copyLabel.textContent = "Copied ✓"; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(currentTel).then(done, done);
      else done();
    });

    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      e.preventDefault();
      open(a.getAttribute("href").replace(/^tel:/, "").trim());
    });
  }
})();
