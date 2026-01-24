const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

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
