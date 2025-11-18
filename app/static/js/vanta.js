document.addEventListener("DOMContentLoaded", function () {
  if (typeof VANTA !== "undefined" && document.getElementById("home")) {
    try {
      const vantaEffect = VANTA.NET({
        el: "#home",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 0.3,
        color: 0x00d4ff,
        backgroundColor: 0x0a0a0a,
        points: 8.0,
        maxDistance: 25.0,
        spacing: 20.0,
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
