// Keyboard navigation accessibility
document.addEventListener("keydown", function (event) {
  if (event.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", function () {
  document.body.classList.remove("keyboard-navigation");
});
