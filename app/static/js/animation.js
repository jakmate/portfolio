class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    this.init();
  }

  init() {
    const elementsToAnimate = document.querySelectorAll("[data-animate]");
    elementsToAnimate.forEach((el) => {
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Initialize animation observer when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AnimationObserver();
});

// Enhanced parallax effect for floating elements
document.addEventListener("DOMContentLoaded", () => {
  const floatingElements = document.querySelectorAll(".float-element");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    floatingElements.forEach((element, index) => {
      const speed = element.dataset.speed || 1;
      const yPos = rate * speed * (index + 1) * 0.1;
      element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
  });
});
