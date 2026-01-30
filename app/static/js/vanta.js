document.addEventListener("DOMContentLoaded", () => {
  if (typeof VANTA !== "undefined" && document.getElementById("home")) {
    try {
      const vantaEffect = VANTA.NET({
        el: "#home",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 0.3,
        color: 0x00d4ff,
        backgroundColor: 0x0a0a0a,
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
