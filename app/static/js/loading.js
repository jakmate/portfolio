document.addEventListener("DOMContentLoaded", function () {
  // Add loading class to body
  document.body.classList.add("loading");

  // Remove loading class after page is fully loaded
  window.addEventListener("load", function () {
    setTimeout(() => {
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");
    }, 500);
  });
});
