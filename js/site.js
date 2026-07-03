/* =====================================================================
   SH ELEVATE — Animation engine
   Lenis smooth scroll + GSAP ScrollTrigger
   ===================================================================== */
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  // Treat phones, tablets and any touch device as "mobile": collapse the
  // heavier scroll-driven motion so touch scrolling stays native and smooth.
  const isMobile = window.matchMedia("(max-width: 1024px)").matches || isTouch;
  const hasGSAP = typeof window.gsap !== "undefined";

  /* ---------------- Lenis smooth scroll ----------------
     Desktop / pointer devices only. On touch devices Lenis overrides the
     native momentum + inertia the OS already provides, which is the #1 cause
     of the "draggy" / high-friction scroll feel on phones — so there we let
     the browser scroll natively. */
  let lenis = null;
  if (typeof window.Lenis !== "undefined" && !reduce && !isTouch) {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });
    window.__lenis = lenis;

    if (hasGSAP && window.ScrollTrigger) {
      // Drive Lenis from the GSAP ticker ONLY (avoids double-rAF jank)
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      // Fallback driver when GSAP isn't present
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* ---------------- NAV ---------------- */
  const nav = document.querySelector(".nav");
  const onScrollNav = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  // mobile menu
  const burger = document.querySelector(".nav-burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (burger && mobileMenu) {
    const toggle = (open) => {
      mobileMenu.classList.toggle("open", open);
      burger.classList.toggle("open", open);
      if (lenis) open ? lenis.stop() : lenis.start();
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () => toggle(!mobileMenu.classList.contains("open")));
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => toggle(false))
    );
  }

  // Service Areas mega-menu dropdown
  const areasWrap = document.querySelector(".nav-areas");
  if (areasWrap) {
    const btn = areasWrap.querySelector(".nav-areas-btn");
    let hoverTimer;
    const open = (v) => { areasWrap.classList.toggle("open", v); btn.setAttribute("aria-expanded", v); };
    btn.addEventListener("click", (e) => { e.preventDefault(); open(!areasWrap.classList.contains("open")); });
    areasWrap.addEventListener("mouseenter", () => { clearTimeout(hoverTimer); open(true); });
    areasWrap.addEventListener("mouseleave", () => { hoverTimer = setTimeout(() => open(false), 180); });
    document.addEventListener("click", (e) => { if (!areasWrap.contains(e.target)) open(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); });
  }

  // anchor smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -80 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------------- Reveals (IntersectionObserver — universal) ---------------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll("[data-reveal], .clip-line").forEach((el) => io.observe(el));

  /* ---------------- Premium heading reveal (word-by-word blur-rise) ----------------
     Splits display + section headings into masked words. Hero headings fire as the
     loading intro lifts; the rest reveal on scroll. Inline markup (e.g. .serif-em)
     is preserved as an atomic word so accent colours survive. */
  function splitHeading(el) {
    if (el.dataset.split) return;
    el.dataset.split = "1";
    const nodes = [...el.childNodes];
    el.textContent = "";
    let wi = 0;
    const wrap = (child) => {
      const w = document.createElement("span"); w.className = "rw";
      const i = document.createElement("span"); i.className = "rw-i";
      i.style.transitionDelay = (wi++ * 0.045).toFixed(3) + "s";
      i.appendChild(child); w.appendChild(i); el.appendChild(w);
    };
    nodes.forEach((node) => {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach((tok) => {
          if (tok === "") return;
          if (/^\s+$/.test(tok)) { el.appendChild(document.createTextNode(tok)); return; }
          wrap(document.createTextNode(tok));
        });
      } else {
        wrap(node);
      }
    });
  }
  const headings = [...document.querySelectorAll(".display, .h-section")]
    .filter((el) => !el.closest(".film, .film-loader"));
  headings.forEach(splitHeading);
  const scrollHeads = headings.filter((el) => !el.closest(".hero, .page-hero"));
  const headIO = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); headIO.unobserve(en.target); }
    }),
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  scrollHeads.forEach((el) => headIO.observe(el));

  /* ---------------- Hero entrance (coordinated with the loading intro) ---------------- */
  const heroes = document.querySelectorAll(".hero, .page-hero");
  const revealHeroes = () => heroes.forEach((h) => {
    h.classList.add("sh-reveal");
    h.querySelectorAll(".display, .h-section").forEach((x) => x.classList.add("in"));
  });
  if (document.getElementById("film-loader") && !reduce) {
    window.addEventListener("sh:loaded", revealHeroes, { once: true });
    setTimeout(revealHeroes, 3200); // safety net if the loader event never fires
  } else {
    requestAnimationFrame(() => requestAnimationFrame(revealHeroes));
  }

  /* ---------------- Counters ---------------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split(".")[1] || "").length;
    const dur = 1900;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = dec ? val.toFixed(dec) : Math.round(val).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = dec ? target.toFixed(dec) : target.toLocaleString();
    };
    requestAnimationFrame(step);
  }
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { animateCount(en.target); countIO.unobserve(en.target); }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((o) => {
        if (o !== item) { o.classList.remove("open"); o.querySelector(".faq-a").style.maxHeight = null; }
      });
      item.classList.toggle("open", !open);
      a.style.maxHeight = open ? null : a.scrollHeight + "px";
      if (lenis) setTimeout(() => ScrollTrigger && ScrollTrigger.refresh(), 560);
    });
  });

  /* ---------------- Magnetic buttons ---------------- */
  if (!isMobile && !reduce) {
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      const strength = 0.32;
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });

    /* ---------------- Premium card tilt + cursor spotlight ----------------
       Feeds CSS custom props; the visual treatment lives in site.css so it
       stays disabled on touch / reduced-motion automatically. */
    const bindCard = (card, tilt) => {
      let ticking = false, lastE = null;
      const apply = () => {
        ticking = false;
        const r = card.getBoundingClientRect();
        const px = (lastE.clientX - r.left) / r.width;
        const py = (lastE.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        if (tilt) {
          card.style.setProperty("--rx", ((0.5 - py) * 5).toFixed(2) + "deg");
          card.style.setProperty("--ry", ((px - 0.5) * 5).toFixed(2) + "deg");
        }
      };
      card.addEventListener("mousemove", (e) => {
        lastE = e;
        if (!ticking) { ticking = true; requestAnimationFrame(apply); }
      });
      if (tilt) card.addEventListener("mouseleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    };
    document.querySelectorAll(".svc-card").forEach((c) => bindCard(c, true));
    document.querySelectorAll(".tri-card, .rep-card, .blog-card, .related-card, .city-card").forEach((c) => bindCard(c, false));
  }

  /* ---------------- GSAP ScrollTrigger effects ---------------- */
  if (hasGSAP && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);

    // (Hero entrance handled by CSS for reliability.)

    // Parallax bg layers + image inner-parallax — DESKTOP ONLY.
    // These scrub transforms run on large hero/section images every scroll
    // frame; on mobile that main-thread churn is what makes scrolling feel
    // rough, for little visual payoff — so they're skipped (images sit static).
    if (!isMobile) {
      const parallax = (sel, amt) => {
        document.querySelectorAll(sel).forEach((el) => {
          gsap.to(el, {
            yPercent: amt, ease: "none",
            scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
        });
      };
      parallax(".stats-bg", -12);
      parallax(".contact-bg", -10);

      // Image inner parallax (zoomy)
      document.querySelectorAll("[data-img-parallax]").forEach((el) => {
        gsap.fromTo(el, { yPercent: -8 }, {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: el.closest("section, .frame, .why-media, .philo-media") || el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });
    }

    // PROCESS pinned scrollytelling
    if (!isMobile) {
      const steps = gsap.utils.toArray(".p-step");
      const imgs = gsap.utils.toArray(".process-media img");
      const setActive = (i) => {
        steps.forEach((s, k) => s.classList.toggle("dim", k !== i));
        imgs.forEach((im, k) => im.classList.toggle("active", k === i));
      };
      setActive(0);
      ScrollTrigger.create({
        trigger: ".process-pin",
        start: "top top",
        end: "+=" + (steps.length * 60) + "%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
          setActive(i);
        },
      });
    } else {
      const steps = gsap.utils.toArray(".p-step");
      const imgs = gsap.utils.toArray(".process-media img");
      steps.forEach((s) => s.classList.remove("dim"));
      if (imgs[0]) imgs[0].classList.add("active");
    }

    // Section heading lines subtle parallax fade handled by reveals

    ScrollTrigger.refresh();
  } else {
    // No-GSAP fallback: ensure process visible
    document.querySelectorAll(".p-step").forEach((s) => s.classList.remove("dim"));
    const im = document.querySelector(".process-media img");
    if (im) im.classList.add("active");
  }

  // Refresh on full load (images)
  window.addEventListener("load", () => { if (window.ScrollTrigger) ScrollTrigger.refresh(); });
})();
