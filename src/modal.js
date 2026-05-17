/**
 * modal.js — Project modal system.
 *
 * Handles:
 * - Opening/closing the modal
 * - Image gallery with thumbnail navigation
 * - Animated fake demo fallback (when no video exists)
 * - Real video demo support
 * - ESC key and click-outside closing
 * - Body scroll lock
 */

import { projects } from "./projects.js";

/* ────────────────────────────────────────────────────
   DEMO STEPS — shown when a project has no video
   ──────────────────────────────────────────────────── */

const demoSteps = [
  {
    icon: "🔍",
    label: "Problema",
    titleKey: "problem",
    descKey: null,
  },
  {
    icon: "💡",
    label: "Solução",
    titleKey: "solution",
    descKey: null,
  },
  {
    icon: "⚙️",
    label: "Funcionalidades",
    titleKey: null,
    featuresKey: "features",
  },
  {
    icon: "🚀",
    label: "Resultado",
    titleKey: "shortDescription",
    descKey: null,
  },
];

/* ────────────────────────────────────────────────────
   SVG ICONS
   ──────────────────────────────────────────────────── */

const icons = {
  github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  deploy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  docs: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  image: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
};

/* ────────────────────────────────────────────────────
   STATE
   ──────────────────────────────────────────────────── */

let currentProject = null;
let galleryIndex = 0;
let fakeDemoInterval = null;
let fakeDemoCurrentStep = 0;

/* ────────────────────────────────────────────────────
   DOM HELPERS
   ──────────────────────────────────────────────────── */

function el(tag, attrs = {}, ...children) {
  const elem = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") elem.className = v;
    else if (k === "html") elem.innerHTML = v;
    else elem.setAttribute(k, v);
  });
  children.forEach((c) => {
    if (typeof c === "string") elem.appendChild(document.createTextNode(c));
    else if (c) elem.appendChild(c);
  });
  return elem;
}

function clamp(str, max = 90) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "…" : str;
}

/* ────────────────────────────────────────────────────
   BUILD MODAL DOM
   ──────────────────────────────────────────────────── */

function buildModal() {
  const overlay = el("div", {
    class: "project-modal-overlay",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Detalhes do projeto",
    id: "projectModal",
  });

  const modal = el("div", { class: "project-modal" });

  // Close row (sticky)
  const closeRow = el("div", { class: "modal-close" });
  const closeBtn = el("button", {
    class: "modal-close-btn",
    "aria-label": "Fechar modal",
    id: "modalCloseBtn",
    html: "×",
  });
  closeRow.appendChild(closeBtn);
  modal.appendChild(closeRow);

  // Inner content (injected on open)
  const inner = el("div", { class: "modal-inner", id: "modalInner" });
  modal.appendChild(inner);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close handlers
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
  });

  return overlay;
}

/* ────────────────────────────────────────────────────
   RENDER MODAL CONTENT
   ──────────────────────────────────────────────────── */

function renderModalContent(project) {
  const inner = document.getElementById("modalInner");
  inner.innerHTML = "";

  const accent = project.accentColor || "rgba(255,255,255,0.6)";
  const overlay = document.getElementById("projectModal");
  overlay.style.setProperty("--modal-accent", accent);

  // ── Cover image ──
  const cover = el("div", { class: "modal-cover" });
  if (project.cover) {
    const img = el("img", {
      class: "modal-cover-img",
      src: project.cover,
      alt: `${project.title} — capa`,
      loading: "lazy",
    });
    img.addEventListener("load", () => img.classList.add("is-loaded"));
    cover.appendChild(img);
  } else {
    const placeholder = el("div", {
      class: "modal-cover-placeholder",
      html: icons.image,
    });
    cover.appendChild(placeholder);
  }
  cover.appendChild(el("div", { class: "modal-cover-gradient" }));
  inner.appendChild(cover);

  // ── Body ──
  const body = el("div", { class: "modal-body" });

  // Header
  const header = el("div", { class: "modal-header" });
  header.appendChild(el("h2", { class: "modal-title" }, project.title));
  header.appendChild(
    el("p", { class: "modal-subtitle" }, project.shortDescription)
  );

  // Tech badges
  if (project.techs?.length) {
    const techRow = el("div", { class: "modal-techs", role: "list", "aria-label": "Tecnologias" });
    project.techs.forEach((t) => {
      const badge = el("span", { class: "modal-tech-badge", role: "listitem" }, t);
      techRow.appendChild(badge);
    });
    header.appendChild(techRow);
  }
  body.appendChild(header);

  // Problem + Solution
  const twoCol = el("div", { class: "modal-two-col" });

  const problemSection = el("div", { class: "modal-section" });
  problemSection.appendChild(el("span", { class: "modal-section-label" }, "Problema"));
  problemSection.appendChild(
    el("p", { class: "modal-section-text" }, project.problem || "—")
  );
  twoCol.appendChild(problemSection);

  const solutionSection = el("div", { class: "modal-section" });
  solutionSection.appendChild(el("span", { class: "modal-section-label" }, "Solução"));
  solutionSection.appendChild(
    el("p", { class: "modal-section-text" }, project.solution || "—")
  );
  twoCol.appendChild(solutionSection);

  body.appendChild(twoCol);

  // Features
  if (project.features?.length) {
    const featSection = el("div", { class: "modal-section" });
    featSection.appendChild(
      el("span", { class: "modal-section-label" }, "Funcionalidades")
    );
    const list = el("ul", { class: "modal-features-list" });
    project.features.forEach((f) => {
      list.appendChild(el("li", {}, f));
    });
    featSection.appendChild(list);
    body.appendChild(featSection);
  }

  // Gallery
  const allImages = [
    ...(project.cover ? [project.cover] : []),
    ...(project.images || []),
  ].filter(Boolean);

  if (allImages.length > 0) {
    const gallerySection = el("div", { class: "modal-section modal-gallery" });
    gallerySection.appendChild(
      el("span", { class: "modal-section-label" }, "Galeria")
    );

    const mainWrap = el("div", { class: "gallery-main" });
    const mainImg = el("img", {
      class: "gallery-main-img",
      src: allImages[0],
      alt: `${project.title} — tela principal`,
      loading: "lazy",
      id: "galleryMainImg",
    });
    mainWrap.appendChild(mainImg);
    gallerySection.appendChild(mainWrap);
    galleryIndex = 0;

    if (allImages.length > 1) {
      const thumbRow = el("div", { class: "gallery-thumbs", role: "list" });
      allImages.forEach((src, i) => {
        const thumb = el("div", {
          class: `gallery-thumb${i === 0 ? " is-active" : ""}`,
          role: "button",
          tabindex: "0",
          "aria-label": `Ver tela ${i + 1}`,
        });
        const tImg = el("img", {
          src,
          alt: `Miniatura ${i + 1}`,
          loading: "lazy",
        });
        thumb.appendChild(tImg);
        thumb.addEventListener("click", () => setGalleryImage(i, allImages));
        thumb.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") setGalleryImage(i, allImages);
        });
        thumbRow.appendChild(thumb);
      });
      gallerySection.appendChild(thumbRow);
    }

    body.appendChild(gallerySection);
  }

  // Demo — video or fake
  const demoSection = el("div", { class: "modal-section modal-demo" });
  demoSection.appendChild(el("span", { class: "modal-section-label" }, "Demo"));

  if (project.demoVideo) {
    const videoWrap = el("div", { class: "modal-demo-video" });
    const video = document.createElement("video");
    video.src = project.demoVideo;
    video.controls = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("preload", "metadata");
    if (project.cover) video.poster = project.cover;
    videoWrap.appendChild(video);
    demoSection.appendChild(videoWrap);
  } else {
    demoSection.appendChild(buildFakeDemo(project));
  }

  body.appendChild(demoSection);

  // Links
  const linksExist = Object.values(project.links || {}).some(Boolean);
  if (linksExist) {
    const linksSection = el("div", { class: "modal-section" });
    linksSection.appendChild(el("span", { class: "modal-section-label" }, "Links"));

    const linksRow = el("div", { class: "modal-links" });

    if (project.links.github) {
      const a = el("a", {
        class: "modal-link-btn",
        href: project.links.github,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Ver repositório no GitHub",
        html: `${icons.github} GitHub`,
      });
      linksRow.appendChild(a);
    }
    if (project.links.deploy) {
      const a = el("a", {
        class: "modal-link-btn",
        href: project.links.deploy,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Ver deploy ao vivo",
        html: `${icons.deploy} Deploy`,
      });
      linksRow.appendChild(a);
    }
    if (project.links.docs) {
      const a = el("a", {
        class: "modal-link-btn",
        href: project.links.docs,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Ver documentação",
        html: `${icons.docs} Docs`,
      });
      linksRow.appendChild(a);
    }

    linksSection.appendChild(linksRow);
    body.appendChild(linksSection);
  }

  // Bottom padding spacer
  body.appendChild(el("div", { style: "height:8px" }));

  inner.appendChild(body);
}

/* ────────────────────────────────────────────────────
   GALLERY NAVIGATION
   ──────────────────────────────────────────────────── */

function setGalleryImage(index, images) {
  const mainImg = document.getElementById("galleryMainImg");
  const thumbs = document.querySelectorAll(".gallery-thumb");

  if (!mainImg) return;

  mainImg.classList.add("is-fading");
  setTimeout(() => {
    mainImg.src = images[index];
    mainImg.alt = `Tela ${index + 1}`;
    mainImg.classList.remove("is-fading");
  }, 200);

  thumbs.forEach((t, i) => t.classList.toggle("is-active", i === index));
  galleryIndex = index;
}

/* ────────────────────────────────────────────────────
   FAKE DEMO ANIMATION
   ──────────────────────────────────────────────────── */

function buildFakeDemo(project) {
  const steps = [
    {
      icon: "🔍",
      label: "Problema",
      title: clamp(project.problem, 110),
      desc: null,
    },
    {
      icon: "💡",
      label: "Solução",
      title: clamp(project.solution, 110),
      desc: null,
    },
    {
      icon: "⚙️",
      label: "Funcionalidades",
      title: project.features?.slice(0, 3).join(" · ") || "",
      desc: null,
    },
    {
      icon: "🚀",
      label: "Stack",
      title: project.techs?.join(" · ") || "",
      desc: null,
    },
  ];

  const wrapper = el("div", { class: "fake-demo" });

  // Browser chrome
  const bar = el("div", { class: "fake-demo-bar" });
  bar.appendChild(el("div", { class: "fake-demo-dot" }));
  bar.appendChild(el("div", { class: "fake-demo-dot" }));
  bar.appendChild(el("div", { class: "fake-demo-dot" }));
  bar.appendChild(el("div", { class: "fake-demo-url" }));
  wrapper.appendChild(bar);

  // Content area
  const content = el("div", { class: "fake-demo-content" });

  const stepEls = steps.map((s, i) => {
    const stepEl = el("div", {
      class: `fake-demo-step${i === 0 ? " is-active" : ""}`,
    });
    stepEl.appendChild(el("div", { class: "fake-demo-step-icon" }, s.icon));
    stepEl.appendChild(el("div", { class: "fake-demo-step-label" }, s.label));
    stepEl.appendChild(el("div", { class: "fake-demo-step-title" }, s.title || "—"));
    if (s.desc) {
      stepEl.appendChild(el("div", { class: "fake-demo-step-desc" }, s.desc));
    }
    content.appendChild(stepEl);
    return stepEl;
  });

  // Progress dots
  const progress = el("div", { class: "fake-demo-progress" });
  const dotEls = steps.map((_, i) => {
    const d = el("div", {
      class: `fake-demo-progress-dot${i === 0 ? " is-active" : ""}`,
    });
    progress.appendChild(d);
    return d;
  });
  content.appendChild(progress);

  wrapper.appendChild(content);

  // Kick off animation after mount (use a small timeout)
  let currentStep = 0;
  function advanceFakeDemo() {
    const prev = currentStep;
    currentStep = (currentStep + 1) % steps.length;

    stepEls[prev].classList.remove("is-active");
    stepEls[prev].classList.add("is-leaving");
    setTimeout(() => stepEls[prev].classList.remove("is-leaving"), 400);

    stepEls[currentStep].classList.add("is-active");

    dotEls[prev].classList.remove("is-active");
    dotEls[currentStep].classList.add("is-active");
  }

  // Store interval on wrapper so we can clear it on modal close
  wrapper._fakeDemoInterval = null;
  setTimeout(() => {
    wrapper._fakeDemoInterval = setInterval(advanceFakeDemo, 2800);
  }, 100);

  return wrapper;
}

function stopFakeDemo() {
  const fakeDemo = document.querySelector(".fake-demo");
  if (fakeDemo?._fakeDemoInterval) {
    clearInterval(fakeDemo._fakeDemoInterval);
    fakeDemo._fakeDemoInterval = null;
  }
}

/* ────────────────────────────────────────────────────
   OPEN / CLOSE
   ──────────────────────────────────────────────────── */

let overlay = null;

export function openModal(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;
  currentProject = project;

  if (!overlay) overlay = buildModal();

  renderModalContent(project);

  requestAnimationFrame(() => {
    overlay.classList.add("is-open");
    document.body.classList.add("modal-open");
    document.getElementById("modalCloseBtn")?.focus();
  });
}

export function closeModal() {
  if (!overlay) return;
  stopFakeDemo();
  overlay.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  // Pause any playing video
  const video = overlay.querySelector("video");
  if (video) video.pause();

  currentProject = null;
}

/* ────────────────────────────────────────────────────
   WIRE UP CARDS
   ──────────────────────────────────────────────────── */

export function initProjectCards() {
  // Map project order in HTML to projects array by index
  // Panels (featured, large) = projects 0 and 1
  // Cards (grid) = projects 2 onwards
  const panels = document.querySelectorAll(".project-panel");
  const cards = document.querySelectorAll(".project-card");

  function wireCard(elem, project) {
    if (!project) return;

    elem.setAttribute("role", "button");
    elem.setAttribute("tabindex", "0");
    elem.setAttribute("aria-label", `Ver detalhes: ${project.title}`);
    elem.setAttribute("data-project-id", project.id);

    // Set CSS accent variable
    if (project.accentColor) {
      elem.style.setProperty("--card-accent", project.accentColor);
    }

    // Accent line element
    const accentLine = document.createElement("div");
    accentLine.className = "project-card-accent";
    elem.appendChild(accentLine);

    // "View details" hint
    const hint = document.createElement("div");
    hint.className = "card-open-hint";
    hint.setAttribute("aria-hidden", "true");
    hint.textContent = "Ver projeto";
    elem.appendChild(hint);

    // Cover image (lazy loaded in background)
    if (project.cover) {
      const img = document.createElement("img");
      img.className = "project-card-img";
      img.src = project.cover;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.setAttribute("loading", "lazy");
      img.addEventListener("load", () => img.classList.add("is-loaded"));
      elem.insertBefore(img, elem.firstChild);
    }

    elem.addEventListener("click", () => openModal(project.id));
    elem.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(project.id);
      }
    });
  }

  panels.forEach((panel, i) => wireCard(panel, projects[i]));
  cards.forEach((card, i) => wireCard(card, projects[i + panels.length]));
}
