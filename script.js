const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const introSkip = document.getElementById("introSkip");
const introPlay = document.getElementById("introPlay");
let introFallbackTimer;

const finishIntro = () => {
  if (!intro) {
    return;
  }
  intro.classList.add("is-exiting");
  body.classList.remove("is-intro");
  setTimeout(() => {
    intro.remove();
  }, 900);
};

const showLogo = () => {
  if (!intro) {
    return;
  }
  intro.classList.remove("needs-play");
  intro.classList.add("show-logo");
  setTimeout(finishIntro, 1800);
};

const scheduleIntroFallback = () => {
  clearTimeout(introFallbackTimer);
  introFallbackTimer = setTimeout(() => {
    if (intro && !intro.classList.contains("show-logo")) {
      showLogo();
    }
  }, 15000);
};

const markNeedsPlay = () => {
  if (!intro) {
    return;
  }
  intro.classList.add("needs-play");
};

const attemptIntroPlay = () => {
  if (!introVideo) {
    return;
  }
  const playPromise = introVideo.play();
  if (playPromise && typeof playPromise.then === "function") {
    playPromise
      .then(() => {
        if (intro) {
          intro.classList.remove("needs-play");
        }
        scheduleIntroFallback();
      })
      .catch(markNeedsPlay);
  } else {
    scheduleIntroFallback();
  }
};

if (intro) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    showLogo();
  } else if (introVideo) {
    attemptIntroPlay();
    introVideo.addEventListener("ended", showLogo, { once: true });
    introVideo.addEventListener("error", showLogo, { once: true });
  } else {
    showLogo();
  }

  if (introPlay) {
    introPlay.addEventListener("click", () => {
      if (introVideo) {
        introVideo.currentTime = 0;
      }
      attemptIntroPlay();
    });
  }

  if (introSkip) {
    introSkip.addEventListener("click", () => {
      if (introVideo) {
        introVideo.pause();
      }
      finishIntro();
    });
  }
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const filterButtons = document.querySelectorAll(".filter");
const libraryCards = document.querySelectorAll(".library-card");
const searchInput = document.getElementById("librarySearch");
let activeFilter = "all";

const filterLibrary = () => {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

  libraryCards.forEach((card) => {
    const category = card.dataset.category || "";
    const tags = card.dataset.tags || "";
    const text = `${card.textContent} ${tags}`.toLowerCase();
    const matchesFilter = activeFilter === "all" || category === activeFilter;
    const matchesSearch = !query || text.includes(query);
    card.classList.toggle("hidden", !(matchesFilter && matchesSearch));
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter || "all";
    filterLibrary();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", filterLibrary);
}
