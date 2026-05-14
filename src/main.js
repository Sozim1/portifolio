import "./styles.css";

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
