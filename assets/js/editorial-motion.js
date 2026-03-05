(function () {
  "use strict";

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduceMotion = motionQuery.matches;
  var revealNodes = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (!revealNodes.length) {
    return;
  }

  function showNode(node) {
    node.classList.add("is-visible");
  }

  function getGroup(node) {
    return (
      node.closest("[data-reveal-group]") ||
      node.closest(".hero-grid") ||
      node.closest(".book-grid") ||
      node.closest(".quote-grid") ||
      node.closest(".two-column") ||
      document.body
    );
  }

  // Assign stagger delays per visual group so related items reveal in sequence.
  var groupCounts = new Map();
  revealNodes.forEach(function (node) {
    var group = getGroup(node);
    var count = groupCounts.get(group) || 0;
    groupCounts.set(group, count + 1);
    node.style.setProperty("--reveal-delay", Math.min(count * 80, 360) + "ms");
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealNodes.forEach(showNode);
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        showNode(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealNodes.forEach(function (node) {
    observer.observe(node);
  });

  // Subtle hero image drift gives the top section more life without distraction.
  var heroImage = document.querySelector(".hero-image img");
  if (!heroImage) {
    return;
  }

  var ticking = false;

  function applyParallax() {
    var rect = heroImage.getBoundingClientRect();
    var viewportMid = window.innerHeight / 2;
    var elementMid = rect.top + rect.height / 2;
    var normalized = (elementMid - viewportMid) / viewportMid;
    var translateY = Math.max(-10, Math.min(10, normalized * -7));
    heroImage.style.transform = "translateY(" + translateY.toFixed(2) + "px) scale(1.015)";
    ticking = false;
  }

  function requestParallax() {
    if (ticking) {
      return;
    }

    window.requestAnimationFrame(applyParallax);
    ticking = true;
  }

  requestParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
})();
