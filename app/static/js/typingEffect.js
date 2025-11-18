document.addEventListener("DOMContentLoaded", function () {
  const heroText = document.querySelector(".hero-text");
  if (!heroText) return;

  const elements = Array.from(heroText.querySelectorAll("p, h1, h2"));

  elements.forEach((el) => {
    el.dataset.original = el.textContent;
    el.textContent = "";
  });

  let elementIndex = 0;
  let charIndex = 0;

  function typeWriter() {
    if (elementIndex >= elements.length) return;

    const currentEl = elements[elementIndex];
    const originalText = currentEl.dataset.original;

    if (charIndex < originalText.length) {
      currentEl.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 50);
    } else {
      elementIndex++;
      charIndex = 0;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();
});
