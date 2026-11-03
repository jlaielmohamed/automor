// Automor landing page: mobile menu + email form
// Paste your n8n Webhook (Production URL) between the quotes below.
const WEBHOOK_URL = "";

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

function setMenu(open) {
  if (!navToggle || !mainNav) return;
  mainNav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
  });

  // Close the menu after tapping a link
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Close with Escape or when tapping outside
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) setMenu(false);
  });

  // Reset when the screen grows back to desktop width
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });