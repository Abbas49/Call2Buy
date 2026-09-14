(() => {
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);

  function updateToggleIcon(theme) {
    const toggleButton = document.querySelector(".toggle-theme");
    if (!toggleButton) return;
    if (theme === "dark") {
      toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
      toggleButton.setAttribute("title", "Switch to Light Mode");
      toggleButton.setAttribute("aria-label", "Switch to Light Mode");
    } else {
      toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
      toggleButton.setAttribute("title", "Switch to Dark Mode");
      toggleButton.setAttribute("aria-label", "Switch to Dark Mode");
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme") || "dark";
    updateToggleIcon(activeTheme);

    const toggleButton = document.querySelector(".toggle-theme");
    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const nextTheme = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
        updateToggleIcon(nextTheme);
      });
    }
  });
})();