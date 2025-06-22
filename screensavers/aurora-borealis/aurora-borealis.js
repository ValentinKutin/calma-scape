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
let bands = [
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

// --- Controls ---
const speedSlider = document.getElementById("speed-slider");
const amplitudeSlider = document.getElementById("amplitude-slider");
const brightnessSlider = document.getElementById("brightness-slider");
const blurSlider = document.getElementById("blur-slider");
const bandsCountInput = document.getElementById("bands-count");
const colorPickers = [
  document.getElementById("color1"),
  document.getElementById("color2"),
  document.getElementById("color3"),
  // Add more if you increase max bands
];

// --- Show/hide controls on hover ---
const controls = document.getElementById("aurora-controls");
let hideControlsTimeout = null;

function showControls() {
  document.body.classList.add("show-controls");
  if (hideControlsTimeout) {
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = null;
  }
}

function hideControls() {
  document.body.classList.remove("show-controls");
}

// Show controls on mouse move anywhere in the window
window.addEventListener("mousemove", showControls);

// Hide controls if mouse leaves the window or after a delay
function scheduleHideControls() {
  if (hideControlsTimeout) clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(() => {
    // Only hide if not hovering controls
    if (!controls.matches(":hover")) {
      hideControls();
    }
  }, 1200); // 1.2s after last mouse movement
}

window.addEventListener("mouseleave", hideControls);
window.addEventListener("mousemove", scheduleHideControls);
controls.addEventListener("mouseenter", showControls);
controls.addEventListener("mouseleave", scheduleHideControls);

function updateBandsCount() {
  const count = parseInt(bandsCountInput.value, 10);
  while (bands.length < count) {
    // Add new band with default values
    bands.push({
      colorStops: [
        `rgba(127,255,212,0.7)`,
        `rgba(0,255,128,0.3)`,
        `rgba(0,0,0,0)`,
      ],
      baseY: 0.3 + 0.4 * (bands.length / (count - 1)),
      amplitude: parseFloat(amplitudeSlider.value),
      speed: parseFloat(speedSlider.value),
      phase: Math.random() * Math.PI * 2,
    });
  }
  while (bands.length > count) {
    bands.pop();
  }
  updateColorPickers();
}

function updateColorPickers() {
  const colorPickersDiv = document.getElementById("color-pickers");
  colorPickersDiv.innerHTML = "";
  for (let i = 0; i < bands.length; i++) {
    const color = bands[i].colorStops[0];
    // Convert rgba to hex for color input
    let hex = "#7fffd4";
    const match = color.match(/rgba?\((\d+),(\d+),(\d+)/);
    if (match) {
      hex =
        "#" +
        (
          (1 << 24) +
          (parseInt(match[1]) << 16) +
          (parseInt(match[2]) << 8) +
          parseInt(match[3])
        )
          .toString(16)
          .slice(1);
    }
    colorPickersDiv.innerHTML += `<label>Band ${
      i + 1
    } Color: <input type="color" id="color${i + 1}" value="${hex}"></label>`;
  }
}

speedSlider.addEventListener("input", () => {
  bands.forEach((band) => (band.speed = parseFloat(speedSlider.value)));
});
amplitudeSlider.addEventListener("input", () => {
  bands.forEach((band) => (band.amplitude = parseFloat(amplitudeSlider.value)));
});
brightnessSlider.addEventListener("input", () => {
  updateCanvasFilter();
});
blurSlider.addEventListener("input", () => {
  updateCanvasFilter();
});
bandsCountInput.addEventListener("input", () => {
  updateBandsCount();
});

document.getElementById("color-pickers").addEventListener("input", (e) => {
  if (e.target.type === "color") {
    const idx = parseInt(e.target.id.replace("color", "")) - 1;
    if (bands[idx]) {
      // Update only the first color stop (main color)
      const hex = e.target.value;
      // Convert hex to rgba
      const rgb = hexToRgb(hex);
      bands[idx].colorStops[0] = `rgba(${rgb.r},${rgb.g},${rgb.b},0.7)`;
    }
  }
});

function hexToRgb(hex) {
  const v = hex.replace("#", "");
  return {
    r: parseInt(v.substring(0, 2), 16),
    g: parseInt(v.substring(2, 4), 16),
    b: parseInt(v.substring(4, 6), 16),
  };
}

function updateCanvasFilter() {
  const blur = blurSlider.value;
  const brightness = brightnessSlider.value;
  canvas.style.filter = `blur(${blur}px) brightness(${brightness}) drop-shadow(0 0 60px #7fffd4)`;
}

// Initialize controls
updateCanvasFilter();
updateBandsCount();

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
