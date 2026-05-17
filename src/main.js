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

const canUsePointerAero =
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUsePointerAero) {
  root.classList.add("aero-enabled");

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let rafId = 0;

  const updateAero = () => {
    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;

    root.style.setProperty("--aero-x", `${currentX}px`);
    root.style.setProperty("--aero-y", `${currentY}px`);
    root.style.setProperty("--aero-nx", `${(currentX / window.innerWidth - 0.5).toFixed(4)}`);
    root.style.setProperty("--aero-ny", `${(currentY / window.innerHeight - 0.5).toFixed(4)}`);

    rafId = window.requestAnimationFrame(updateAero);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      root.classList.add("aero-has-pointer");
    },
    { passive: true },
  );

  window.addEventListener(
    "pointerleave",
    () => {
      root.classList.remove("aero-has-pointer");
    },
    { passive: true },
  );

  rafId = window.requestAnimationFrame(updateAero);

  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(rafId);
  });
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

const interactiveCards = document.querySelectorAll(".project-panel, .project-card, .stack-columns > div");

if (canUsePointerAero && interactiveCards.length) {
  interactiveCards.forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--card-x", `${x.toFixed(2)}%`);
        card.style.setProperty("--card-y", `${y.toFixed(2)}%`);
      },
      { passive: true },
    );
  });
}
