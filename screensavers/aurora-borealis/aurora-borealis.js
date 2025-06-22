// JavaScript for Aurora Borealis screensaver
console.log("Aurora Borealis screensaver script loaded.");

const canvas = document.getElementById("aurora-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Aurora band parameters
const bands = [
  {
    colorStops: [
      "rgba(127,255,212,0.7)",
      "rgba(0,255,128,0.3)",
      "rgba(0,0,0,0)",
    ],
    baseY: 0.3,
    amplitude: 60,
    speed: 0.12,
    phase: 0,
  },
  {
    colorStops: ["rgba(0,255,255,0.5)", "rgba(0,128,255,0.2)", "rgba(0,0,0,0)"],
    baseY: 0.5,
    amplitude: 80,
    speed: 0.09,
    phase: 1.5,
  },
  {
    colorStops: ["rgba(255,0,255,0.3)", "rgba(0,255,128,0.2)", "rgba(0,0,0,0)"],
    baseY: 0.7,
    amplitude: 40,
    speed: 0.15,
    phase: 3,
  },
];

function drawAuroraBand({ colorStops, baseY, amplitude, speed, phase }, t) {
  const w = canvas.width;
  const h = canvas.height;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, h * baseY);
  for (let x = 0; x <= w; x += 4) {
    const y =
      h * baseY +
      Math.sin((x / w) * 6 * Math.PI + t * speed + phase) *
        amplitude *
        Math.sin(t * 0.2 + phase);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  // Create gradient
  const grad = ctx.createLinearGradient(w / 2, h * baseY, w / 2, h);
  colorStops.forEach((color, i) =>
    grad.addColorStop(i / (colorStops.length - 1), color)
  );
  ctx.fillStyle = grad;
  ctx.globalAlpha = 0.8;
  ctx.shadowColor = colorStops[0];
  ctx.shadowBlur = 60;
  ctx.fill();
  ctx.restore();
}

function animateAurora(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bands.forEach((band, i) => drawAuroraBand(band, t / 1000 + i * 0.5));
  requestAnimationFrame(animateAurora);
}

animateAurora(0);
