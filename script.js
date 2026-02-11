/* ========================================
   Dion Wilson | dionwilson.com
   Interactive features
   ======================================== */

const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

/* ---------- MOBILE NAV ---------- */
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

/* ---------- ACTIVE NAV HIGHLIGHTING ---------- */
const sections = document.querySelectorAll("section[id]");

const highlightNav = () => {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active-link");
        }
      });
    }
  });
};

window.addEventListener("scroll", highlightNav, { passive: true });

/* ---------- EXERCISE LIBRARY ---------- */
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

/* ---------- SCROLL REVEAL ANIMATIONS ---------- */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".card, .price-card, .video-card, .library-card, .image-card, .hero-card, .calendar-card, .contact-form, .contact-card, .bitcoin-quote").forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

/* ---------- HEADER SHRINK ON SCROLL ---------- */
const header = document.querySelector(".site-header");

const handleHeaderScroll = () => {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

window.addEventListener("scroll", handleHeaderScroll, { passive: true });

/* ---------- SMOOTH SCROLL FOR HASH LINKS ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
