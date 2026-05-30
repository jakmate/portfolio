const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

document.addEventListener("DOMContentLoaded", () => {
  if (typeof VANTA !== "undefined" && document.getElementById("home")) {
    try {
      const vantaEffect = VANTA.NET({
        el: "#home",
        mouseControls: !isMobile,
        touchControls: isMobile,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 0.5,
        color: 0xcc3333,
        backgroundColor: 0x111111,
        points: 8,
        maxDistance: 25,
        spacing: 20,
        showDots: true,
      });
      window.addEventListener("beforeunload", () => {
        if (vantaEffect) vantaEffect.destroy();
      });
    } catch (error) {
      console.warn("VANTA.js failed to initialize:", error);
    }
  }
});
