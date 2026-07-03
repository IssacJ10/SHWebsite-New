/* =====================================================================
   SH ELEVATE — Cinematic scroll "film"
   Loading-% intro + pinned chaptered scenes that crossfade with a slow
   Ken-Burns zoom as you scroll, plus chapter counter + progress HUD.
   Keeps the brand theme — this is motion/layout only.
   Requires gsap + ScrollTrigger + (optional) Lenis via window.__lenis.
   ===================================================================== */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Loading intro ---------------- */
  const loader = document.getElementById("film-loader");
  if (loader && !reduce) {
    const pctEl = loader.querySelector(".fl-pct");
    const barEl = loader.querySelector(".fl-bar span");
    const lenis = window.__lenis;
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";

    let finished = false;
    const finish = () => {
      if (finished) return; finished = true;
      pctEl.textContent = "100"; barEl.style.width = "100%";
      loader.classList.add("done");
      window.dispatchEvent(new Event("sh:loaded"));   // cue the hero entrance
      if (lenis) lenis.start();
      document.body.style.overflow = "";
      setTimeout(() => loader && loader.remove(), 1000);
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    };

    const dur = 850, t0 = performance.now();
    (function tick(now) {
      const k = Math.min(1, ((now || performance.now()) - t0) / dur);
      const p = Math.round((1 - Math.pow(1 - k, 2)) * 100);
      pctEl.textContent = String(p).padStart(3, "0");
      barEl.style.width = p + "%";
      if (k < 1 && !finished) requestAnimationFrame(tick);
      else if (!finished) setTimeout(finish, 240);
    })(t0);

    // Hard safety net: never let the loader hang / lock scroll (throttled rAF, bg tab, etc.)
    setTimeout(finish, dur + 1400);
  } else if (loader) {
    loader.remove();
  }

  /* ---------------- The film ---------------- */
  const film = document.querySelector(".film");
  if (!film) return;
  const imgs = Array.from(film.querySelectorAll(".chapter-img"));
  const texts = Array.from(film.querySelectorAll(".chapter-text"));
  const N = imgs.length;
  const countCur = film.querySelector(".fh-count b");
  const progBar = film.querySelector(".fh-progress span");
  const ticks = Array.from(film.querySelectorAll(".fh-chapters i"));

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const pad = (n) => String(n).padStart(2, "0");

  function paint(progress) {
    const t = progress * N;                 // 0..N
    let active = clamp(Math.floor(t), 0, N - 1);
    for (let i = 0; i < N; i++) {
      const fadeIn = clamp((t - (i - 0.18)) / 0.36, 0, 1);
      const fadeOut = clamp(((i + 1.18) - t) / 0.36, 0, 1);
      const vis = Math.min(fadeIn, fadeOut);
      const within = clamp(t - i, 0, 1);     // 0..1 progress through chapter
      imgs[i].style.opacity = vis.toFixed(3);
      imgs[i].style.transform = `scale(${(1.14 - within * 0.14).toFixed(4)})`;
      if (texts[i]) {
        texts[i].style.opacity = vis.toFixed(3);
        texts[i].style.transform = `translateY(${((0.5 - within) * 46).toFixed(1)}px)`;
      }
    }
    if (countCur) countCur.textContent = pad(active + 1);
    if (progBar) progBar.style.width = (progress * 100).toFixed(1) + "%";
    ticks.forEach((tk, i) => tk.classList.toggle("on", i <= active));
  }

  // Phones / tablets / touch: DON'T pin. A pinned, scrubbed section fights the
  // finger and feels heavy on touch. Instead the background is CSS-sticky and an
  // IntersectionObserver swaps the active chapter image + reveals each text as it
  // reaches mid-screen — native momentum scroll, zero scroll-jacking. Needs no
  // GSAP (so it survives a ScrollTrigger load failure); under reduced-motion the
  // CSS simply drops the fades and text appears as you scroll to it.
  const lite = window.matchMedia("(max-width: 1024px)").matches ||
               window.matchMedia("(pointer: coarse)").matches;
  if (lite) {
    imgs.forEach((im) => { im.style.transform = "none"; });
    let cur = -1;
    const setActive = (i) => {
      if (i === cur) return;
      cur = i;
      imgs.forEach((im, k) => { im.style.opacity = k === i ? "1" : "0"; });
      if (countCur) countCur.textContent = pad(i + 1);
      if (progBar) progBar.style.width = (((i + 1) / N) * 100).toFixed(1) + "%";
      ticks.forEach((tk, k) => tk.classList.toggle("on", k <= i));
    };
    // Cheap, PASSIVE scroll read (no preventDefault, no pin → zero scroll-jack):
    // the chapter whose centre is nearest the viewport centre is active, and each
    // reveals as it rises into view. rAF-throttled; DOM only written on a real
    // chapter change. Bound to native scroll AND Lenis (if it's active), so it
    // works on touch (Lenis off) and narrow desktop (Lenis on) alike.
    const update = () => {
      const vh = window.innerHeight, mid = vh / 2;
      let best = 0, bestDist = Infinity;
      texts.forEach((t, k) => {
        const r = t.getBoundingClientRect();
        const d = Math.abs((r.top + r.height / 2) - mid);
        if (d < bestDist) { bestDist = d; best = k; }
        if (r.top < vh * 0.82) t.classList.add("in");
      });
      setActive(best);
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    if (window.__lenis && window.__lenis.on) window.__lenis.on("scroll", onScroll);
    return;
  }

  if (reduce || typeof ScrollTrigger === "undefined") {
    // static fallback — show first chapter
    paint(0.0001);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  paint(0);
  ScrollTrigger.create({
    trigger: ".film",
    start: "top top",
    end: "+=" + (N * 110) + "%",
    pin: ".film-stage",
    scrub: 0.6,
    onUpdate: (self) => paint(self.progress),
    onRefresh: (self) => paint(self.progress),
  });

  setTimeout(() => ScrollTrigger.refresh(), 250);

  window.__film = { paint, killLoader() { if (loader) loader.remove(); if (window.__lenis) window.__lenis.start(); document.body.style.overflow = ""; } };
})();
