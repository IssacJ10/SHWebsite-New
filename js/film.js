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

    const dur = 1700, t0 = performance.now();
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

  if (reduce || typeof ScrollTrigger === "undefined") {
    // static fallback — show first chapter
    paint(0.0001);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  paint(0);
  // Phones/tablets/touch: shorter pin distance + snappier scrub so the film
  // doesn't "hold" the scroll for 4+ screen-heights (the chaptered crossfade
  // still plays, it just tracks the finger more closely and releases sooner).
  const lite = window.matchMedia("(max-width: 1024px)").matches ||
               window.matchMedia("(pointer: coarse)").matches;
  ScrollTrigger.create({
    trigger: ".film",
    start: "top top",
    end: "+=" + (N * (lite ? 55 : 90)) + "%",
    pin: ".film-stage",
    scrub: lite ? 0.35 : 0.6,
    onUpdate: (self) => paint(self.progress),
    onRefresh: (self) => paint(self.progress),
  });

  setTimeout(() => ScrollTrigger.refresh(), 250);

  window.__film = { paint, killLoader() { if (loader) loader.remove(); if (window.__lenis) window.__lenis.start(); document.body.style.overflow = ""; } };
})();
