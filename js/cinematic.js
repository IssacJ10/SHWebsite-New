/* =====================================================================
   SH ELEVATE — Cinematic scroll layer (site-wide)
   Every page opens with a PINNED hero "scene": as you scroll, the hero
   image zooms in while the headline drifts up & fades, then it releases
   into the page. Plus layered drift + scrubbed zooms through the page so
   the whole scroll feels like film. Transform/opacity only — no reflow.
   Loaded on every page AFTER site.js.
   ===================================================================== */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ force3D: true });

  // Phones, tablets and touch devices: skip the pinned hero zoom + every
  // scrubbed parallax/drift below. Pinning the hero makes the page feel
  // "stuck" while you try to scroll, and per-frame transforms on large images
  // add friction — so on these devices the hero and sections just scroll
  // naturally (the cheap IntersectionObserver reveals in site.js still play).
  // Desktop keeps the full cinematic treatment.
  if (window.matchMedia("(max-width: 1024px)").matches ||
      window.matchMedia("(pointer: coarse)").matches) return;

  const k = 1;

  /* ---------- 1) PINNED HERO SCENE (the headline cinematic move) ---------- */
  function cineHero(heroSel, imgSel, innerSel, extraSel) {
    const hero = document.querySelector(heroSel);
    if (!hero) return;
    const img = hero.querySelector(imgSel);
    const inner = hero.querySelector(innerSel);
    const extra = extraSel ? hero.querySelector(extraSel) : null;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero, start: "top top", end: "+=70%",
        pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
      },
    });
    if (img) tl.fromTo(img, { scale: 1.02 }, { scale: 1.3, ease: "none" }, 0);
    if (inner) tl.fromTo(inner, { y: 0, opacity: 1 }, { y: -130, opacity: 0, ease: "none" }, 0);
    if (extra) tl.fromTo(extra, { opacity: 1 }, { opacity: 0, ease: "none" }, 0);
  }
  cineHero(".hero", ".hero-bg img", ".hero-inner", ".scroll-ind");
  cineHero(".page-hero", ".page-hero-bg img", ".page-hero-inner");

  /* ---------- 2) Scrubbed zoom on full-bleed mid-page image bands ---------- */
  gsap.utils.toArray(".stats-bg img, .contact-bg img").forEach((img) => {
    const sec = img.closest("section");
    gsap.fromTo(img, { scale: 1.04 }, {
      scale: 1.2, ease: "none",
      scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.6 },
    });
  });

  /* ---------- 3) Layered drift through every page ---------- */
  function drift(sel, from, to, scrub) {
    gsap.utils.toArray(sel).forEach((el) => {
      el.style.willChange = "transform";
      gsap.fromTo(el, { y: from * k }, {
        y: to * k, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.4 },
      });
    });
  }
  drift(".section-head", 60, -40);
  drift(".split-media, .feat-card-panel", 70, -46);
  drift(".philo-media, .why-media", 64, -48);
  drift(".stat-badge", 26, -50);

  /* ---------- 4) Framed images inner-parallax ---------- */
  gsap.utils.toArray(".split-media img, .why-media img, .philo-media .frame img, .blog-feature .bf-media img").forEach((img) => {
    const box = img.parentElement;
    gsap.fromTo(img, { yPercent: -8 }, {
      yPercent: 8, ease: "none",
      scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: 0.6 },
    });
  });

  setTimeout(() => ScrollTrigger.refresh(), 200);
})();
