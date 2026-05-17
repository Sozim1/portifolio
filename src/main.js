import "./styles.css";

const root = document.documentElement;
const introText = document.querySelector("#introText");
const introPhrases = [
  "hello portfolio",
  "hello projects",
  "hello systems",
  "hello integrations",
];

if (introText) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    introText.textContent = "Desenvolvimento full-stack, automação e produto";
    document.documentElement.classList.add("intro-complete");
  } else {
    document.documentElement.classList.add("intro-active");

    let phraseIndex = 0;
    const swapDelay = 1350;

    const swapIntroText = () => {
      phraseIndex += 1;

      if (phraseIndex >= introPhrases.length) {
        window.setTimeout(() => {
          introText.textContent = "Desenvolvimento full-stack, automação e produto";
          document.documentElement.classList.remove("intro-active");
          document.documentElement.classList.add("intro-complete");
        }, 420);
        return;
      }

      introText.classList.add("is-switching");

      window.setTimeout(() => {
        introText.textContent = introPhrases[phraseIndex];
        introText.classList.remove("is-switching");
        window.setTimeout(swapIntroText, swapDelay);
      }, 320);
    };

    window.setTimeout(swapIntroText, swapDelay);
  }
}

const canUseScrollAero = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUseScrollAero) {
  root.classList.add("scroll-aero-enabled");

  let ticking = false;

  const updateScrollAero = () => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(window.scrollY / maxScroll, 1);
    const heroProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);

    root.style.setProperty("--scroll-progress", progress.toFixed(4));
    root.style.setProperty("--hero-scroll", heroProgress.toFixed(4));
    ticking = false;
  };

  const requestScrollAero = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateScrollAero);
    }
  };

  updateScrollAero();
  window.addEventListener("scroll", requestScrollAero, { passive: true });
  window.addEventListener("resize", requestScrollAero);
}

const revealItems = document.querySelectorAll(
  ".section-heading, .project-panel, .project-card, .stack-columns > div, .site-footer",
);

if (revealItems.length) {
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 360)}ms`);
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}
