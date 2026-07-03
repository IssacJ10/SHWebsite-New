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

  /* ---------- 1) HERO — natural scroll, no pin ----------
     The header scrolls away like any normal section. The photo eases in a gentle
     scale as you scroll past it, for a whisper of depth — but the page is never
     "held", so the scroll stays completely natural. Scale-only never exposes the
     image edges, so it's safe on every hero/page-hero. */
  function cineHero(heroSel, imgSel) {
    const hero = document.querySelector(heroSel);
    if (!hero) return;
    const img = hero.querySelector(imgSel);
    if (!img) return;
    gsap.fromTo(img, { scale: 1.0 }, {
      scale: 1.12, ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }
  cineHero(".hero", ".hero-bg img");
  cineHero(".page-hero", ".page-hero-bg img");

  /* ---------- 2) Scrubbed zoom on full-bleed mid-page image bands ---------- */
  gsap.utils.toArray(".stats-bg img, .contact-bg img").forEach((img) => {
    const sec = img.closest("section");
    gsap.fromTo(img, { scale: 1.04 }, {
      scale: 1.2, ease: "none",
      scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true },
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
      scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  setTimeout(() => ScrollTrigger.refresh(), 200);
})();
