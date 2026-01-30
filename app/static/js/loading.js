document.addEventListener("DOMContentLoaded", () => {
  // Add loading class to body
  document.body.classList.add("loading");

  // Remove loading class after page is fully loaded
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");
    }, 500);
  });
});
