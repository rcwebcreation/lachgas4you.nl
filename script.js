/**
 * Lenis + GSAP ScrollTrigger — hero intro, scroll reveals, floating WhatsApp FAB, UI micro-motion
 */
(function () {
  "use strict";

  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function revealFallback() {
    document.querySelectorAll(".js-prep").forEach(function (el) {
      el.classList.remove("js-prep");
    });
    var bar = document.querySelector(".js-sticky-bar");
    if (bar) {
      bar.style.opacity = "";
      bar.style.transform = "";
    }
  }

  function initHeroIntro(gsap) {
    var heroEyebrow = document.querySelector(".js-hero-eyebrow");
    var titleInners = document.querySelectorAll(".hero__title-line-inner");
    var heroLede = document.querySelector(".js-hero-lede");
    var heroCtas = document.querySelectorAll(".js-hero-cta .btn");
    var siteBg = document.querySelector(".site-bg");
    var heroVeil = document.querySelector(".hero__veil");
    var brand = document.querySelector(".js-header-brand");
    var tag = document.querySelector(".js-header-tag");

    var tl = gsap.timeline({
      defaults: { ease: "power4.out" },
    });

    tl.fromTo(
      siteBg,
      { opacity: 0.35, scale: 1.14 },
      { opacity: 1, scale: 1, duration: 1.65, ease: "power3.out" },
      0
    )
      .fromTo(
        brand,
        { opacity: 0, y: -18, skewX: -4 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.85 },
        0.12
      )
      .fromTo(
        tag,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.28
      )
      .fromTo(
        heroVeil,
        { opacity: 0 },
        { opacity: 1, duration: 1.05 },
        0
      )
      .fromTo(
        heroEyebrow,
        { opacity: 0, x: -52, letterSpacing: "0.4em", filter: "blur(6px)" },
        { opacity: 1, x: 0, letterSpacing: "0.24em", filter: "blur(0px)", duration: 0.95 },
        0.35
      );

    if (titleInners.length >= 2) {
      tl.fromTo(
        titleInners[0],
        { xPercent: -140, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
        0.5
      ).fromTo(
        titleInners[1],
        { xPercent: 140, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
        0.58
      );
    } else {
      tl.fromTo(
        titleInners,
        { xPercent: -100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1, stagger: 0.12 },
        0.55
      );
    }

    tl.fromTo(
        heroLede,
        { opacity: 0, y: 40, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 1 },
        "-=0.55"
      )
      .fromTo(
        heroCtas,
        { opacity: 0, y: 42, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.12, ease: "back.out(1.55)" },
        "-=0.45"
      );
  }

  function initStickyBarEntrance(gsap) {
    var bar = document.querySelector(".js-sticky-bar");
    if (!bar) return;
    gsap.fromTo(
      bar,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.95, ease: "power3.out", delay: 1.95 }
    );
  }

  function initHeaderScroll() {
    var header = document.querySelector(".js-header");
    if (!header) return;
    function sync() {
      if (window.scrollY > 40) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }
    window.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  function initBenefitCards(gsap, ScrollTrigger) {
    document.querySelectorAll(".js-sfx-benefit").forEach(function (card) {
      var rule = card.querySelector(".benefit__rule");
      var inner = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });
      inner.fromTo(
        card,
        { opacity: 0, y: 72, skewY: 2.5 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.92,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
      inner.fromTo(
        rule,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, ease: "power2.out", transformOrigin: "left center" },
        "-=0.72"
      );
      inner.fromTo(card.querySelectorAll(".benefit__title, .benefit__text"), { opacity: 0, y: 18 }, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: "power2.out",
      }, "-=0.52");
    });
  }

  function initSectionTitlesAndLedges(gsap, ScrollTrigger) {
    document.querySelectorAll(".js-sfx-title").forEach(function (title) {
      gsap.fromTo(
        title,
        { opacity: 0, x: -56, skewX: -5, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          clearProps: "transform,filter",
          scrollTrigger: {
            trigger: title,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    document.querySelectorAll(".js-sfx-lede").forEach(function (lede) {
      gsap.fromTo(
        lede,
        { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lede,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }

  function initSpecCards(gsap, ScrollTrigger) {
    document.querySelectorAll(".js-sfx-card").forEach(function (card, idx) {
      var parts = card.querySelectorAll(".spec-card__tag, .spec-card__title, .spec-card__text");
      gsap
        .timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        })
        .fromTo(
          card,
          {
            opacity: 0,
            y: 64,
            rotateX: 11,
            transformPerspective: 900,
            transformOrigin: "center top",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.92,
            delay: idx * 0.04,
            ease: "power3.out",
            clearProps: "transform",
          }
        )
        .fromTo(
          parts,
          { opacity: 0, x: idx % 2 === 0 ? -26 : 26 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.55, ease: "power2.out" },
          "-=0.72"
        );
    });
  }

  function initFinalCta(gsap, ScrollTrigger) {
    var btnsWrap = document.querySelector(".js-sfx-cta-btns");
    var tlBox = gsap.timeline({
      scrollTrigger: {
        trigger: ".final-cta",
        start: "top 78%",
        toggleActions: "play none none none",
      },
    });

    tlBox.fromTo(
      ".final-cta__inner",
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.75, ease: "power3.out" }
    );

    tlBox.fromTo(
      ".js-sfx-cta-head",
      { opacity: 0, y: 40, letterSpacing: "0.2em" },
      { opacity: 1, y: 0, letterSpacing: "0.08em", duration: 0.9, ease: "power3.out" },
      "-=0.46"
    );
    tlBox.fromTo(
      ".js-sfx-cta-text",
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.65 },
      "-=0.55"
    );
    if (btnsWrap && btnsWrap.children.length) {
      tlBox.fromTo(
        btnsWrap.children,
        { opacity: 0, y: 36, rotateX: 16, transformPerspective: 800 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.12, duration: 0.72, ease: "back.out(1.2)" },
        "-=0.4"
      );
    }
  }

  function initFooterReveal(gsap, ScrollTrigger) {
    var foot = document.querySelector(".js-sfx-footer");
    if (!foot) return;
    gsap.fromTo(
      foot,
      { opacity: 0, filter: "blur(6px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.85,
        scrollTrigger: {
          trigger: foot,
          start: "top 98%",
          toggleActions: "play none none none",
        },
      }
    );
  }

  function initMagnetic(gsap) {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    var maxMain = 10;
    var maxSticky = 7;

    document.querySelectorAll(".magnetic").forEach(function (el) {
      var move;
      if (typeof gsap.quickTo === "function") {
        var xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
        var yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
        move = function (xv, yv) {
          xTo(xv);
          yTo(yv);
        };
      }
      move = move || function (xv, yv) {
        gsap.to(el, { x: xv, y: yv, duration: 0.32, overwrite: "auto", ease: "power3.out" });
      };
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var xv = ((e.clientX - rect.left) / rect.width - 0.5) * maxMain * 2;
        var yv = ((e.clientY - rect.top) / rect.height - 0.5) * maxMain * 2;
        move(xv, yv);
      });
      el.addEventListener("mouseleave", function () {
        move(0, 0);
      });
    });

    document.querySelectorAll(".magnetic-sticky").forEach(function (el) {
      function setXY(xv, yv) {
        gsap.to(el, { x: xv, y: yv, duration: 0.38, overwrite: "auto", ease: "power2.out" });
      }
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var xv = ((e.clientX - rect.left) / rect.width - 0.5) * maxSticky * 2;
        var yv = ((e.clientY - rect.top) / rect.height - 0.5) * maxSticky * 2;
        setXY(xv, yv);
      });
      el.addEventListener("mouseleave", function () {
        setXY(0, 0);
      });
    });
  }

  function initLenisScrollTrigger(prefersReduced, gsap, ScrollTrigger) {
    if (prefersReduced) return null;

    var L = window.Lenis;
    var LenisCtor = L && typeof L.default === "function" ? L.default : L;
    if (typeof LenisCtor !== "function") return null;

    var lenis;
    try {
      lenis = new LenisCtor({
        duration: 1.08,
        smoothWheel: true,
        syncTouch: false,
      });
    } catch (e) {
      return null;
    }

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return lenis;
  }

  function bootAnimations(gsap, ScrollTrigger) {
    initStickyBarEntrance(gsap);
    initHeroIntro(gsap);
    initHeaderScroll();
    initBenefitCards(gsap, ScrollTrigger);
    initSectionTitlesAndLedges(gsap, ScrollTrigger);
    initSpecCards(gsap, ScrollTrigger);
    initFinalCta(gsap, ScrollTrigger);
    initFooterReveal(gsap, ScrollTrigger);
    initMagnetic(gsap);
  }

  function onDomReady() {
    setYear();

    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var gsapLib = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;

    if (typeof gsapLib === "undefined" || typeof ScrollTrigger === "undefined") {
      revealFallback();
      return;
    }

    gsapLib.registerPlugin(ScrollTrigger);
    initLenisScrollTrigger(prefersReduced, gsapLib, ScrollTrigger);

    if (prefersReduced) {
      revealFallback();
      return;
    }

    gsapLib.config({ nullTargetWarn: false });

    bootAnimations(gsapLib, ScrollTrigger);

    window.addEventListener(
      "load",
      function () {
        ScrollTrigger.refresh();
      },
      { once: true }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onDomReady);
  } else {
    onDomReady();
  }
})();
