(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canvas = document.querySelector("#refraction");
  const context = canvas?.getContext("2d");

  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    root.classList.add("motion");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("seen");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

    for (const item of document.querySelectorAll("[data-enter]")) observer.observe(item);
  }

  if (!canvas || !context || reducedMotion.matches) return;

  let width = 0;
  let height = 0;
  let frame = 0;
  const pointer = { x: innerWidth / 2, y: innerHeight / 2, targetX: innerWidth / 2, targetY: innerHeight / 2 };
  const rings = [];

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = innerWidth;
    height = innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function ripple(x, y) {
    rings.push({ x, y, radius: 8, alpha: 0.22, hue: Math.random() * 90 + 205 });
    if (rings.length > 5) rings.shift();
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);
    pointer.x += (pointer.targetX - pointer.x) * 0.085;
    pointer.y += (pointer.targetY - pointer.y) * 0.085;

    const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 170);
    glow.addColorStop(0, "rgba(60,100,255,.12)");
    glow.addColorStop(0.38, "rgba(184,72,255,.055)");
    glow.addColorStop(0.72, "rgba(255,75,117,.025)");
    glow.addColorStop(1, "rgba(255,75,117,0)");
    context.fillStyle = glow;
    context.fillRect(pointer.x - 170, pointer.y - 170, 340, 340);

    context.lineWidth = 0.65;
    for (let line = 0; line < 3; line += 1) {
      const gradient = context.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(23,68,255,0)");
      gradient.addColorStop(0.35, `rgba(23,68,255,${0.055 - line * 0.012})`);
      gradient.addColorStop(0.62, `rgba(129,77,255,${0.05 - line * 0.01})`);
      gradient.addColorStop(1, "rgba(255,76,104,0)");
      context.strokeStyle = gradient;
      context.beginPath();

      for (let x = -20; x <= width + 20; x += 15) {
        const y = height * (0.24 + line * 0.25)
          + Math.sin(x * 0.005 + time * 0.00022 + line) * 42
          + Math.sin(x * 0.0015 - time * 0.00012) * 75;
        if (x === -20) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();
    }

    for (let index = rings.length - 1; index >= 0; index -= 1) {
      const ring = rings[index];
      ring.radius += 0.55;
      ring.alpha *= 0.988;
      context.strokeStyle = `hsla(${ring.hue},90%,52%,${ring.alpha})`;
      context.beginPath();
      context.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
      context.stroke();
      if (ring.alpha < 0.006) rings.splice(index, 1);
    }

    frame = requestAnimationFrame(draw);
  }

  window.addEventListener("pointermove", (event) => {
    pointer.targetX = event.clientX;
    pointer.targetY = event.clientY;
    root.style.setProperty("--x", `${event.clientX}px`);
    root.style.setProperty("--y", `${event.clientY}px`);
  }, { passive: true });

  document.querySelectorAll("a, .act").forEach((item) => {
    item.addEventListener("pointerenter", () => {
      const bounds = item.getBoundingClientRect();
      ripple(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    });
  });

  window.addEventListener("resize", resize, { passive: true });
  reducedMotion.addEventListener("change", () => {
    cancelAnimationFrame(frame);
    canvas.hidden = reducedMotion.matches;
    if (!reducedMotion.matches) draw(0);
  });

  resize();
  draw(0);
})();
