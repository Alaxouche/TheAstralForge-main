(() => {
  const storageKey = "sg-theme";
  const root = document.documentElement;

  /* ─── Helpers ─────────────────────────────────────────────────── */

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  };

  const syncButton = (button, theme) => {
    button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    button.dataset.theme = theme;
    const label = button.querySelector(".theme-toggle-label");
    if (label) label.textContent = theme === "light" ? "Light" : "Dark";
  };

  /* ─── Apply theme immediately (runs before DOMContentLoaded) ───── */
  /* The <head> inline script has already set data-theme; this call   */
  /* is a safety net for browsers where the inline script is missing. */
  const initialTheme = getPreferredTheme();
  root.setAttribute("data-theme", initialTheme);

  /* ─── Button & interactive logic — waits for DOM ───────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-toggle");
    if (!button) return; // no toggle on this page — theme already applied above

    const current = root.getAttribute("data-theme") || "dark";
    syncButton(button, current);

    button.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      localStorage.setItem(storageKey, nextTheme);
      // Smooth CSS transition
      root.classList.add("theme-transitioning");
      setTimeout(() => root.classList.remove("theme-transitioning"), 300);
      root.setAttribute("data-theme", nextTheme);
      syncButton(button, nextTheme);
    });

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
        // Respect explicit user choice; only follow system if no manual preference.
        if (localStorage.getItem(storageKey)) return;
        const systemTheme = event.matches ? "light" : "dark";
        root.setAttribute("data-theme", systemTheme);
        syncButton(button, systemTheme);
      });
    }
  });
})();
