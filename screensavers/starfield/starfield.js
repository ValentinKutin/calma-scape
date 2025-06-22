const canvas = document.getElementById("starfieldCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 1000; // More stars for a denser field

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width, // Z-coordinate for parallax
      size: 0, // Will be calculated based on z
      speed: 0, // Will be calculated based on z
      color: "white",
    });
  }
}

function drawMilkyWay() {
  ctx.save();
  ctx.filter = "blur(10px)"; // Apply blur for a diffuse look

  // Draw a large, faint ellipse for the main band of the Milky Way
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)"; // Very faint white
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 2,
    canvas.height / 2,
    canvas.width * 0.4,
    canvas.height * 0.1,
    Math.PI / 4,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Add some smaller, slightly brighter patches for variation
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
  ctx.beginPath();
  ctx.ellipse(
    canvas.width * 0.3,
    canvas.height * 0.7,
    canvas.width * 0.2,
    canvas.height * 0.05,
    -Math.PI / 6,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(
    canvas.width * 0.7,
    canvas.height * 0.3,
    canvas.width * 0.15,
    canvas.height * 0.04,
    Math.PI / 3,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.filter = "none"; // Reset filter
  ctx.restore();
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMilkyWay(); // Draw Milky Way first

  for (let i = 0; i < numStars; i++) {
    const star = stars[i];

    // Update Z for movement
    star.z -= 1; // Speed of movement
    if (star.z <= 0) {
      star.z = canvas.width; // Reset to far end
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    }

    // Calculate parallax effect
    const parallax = canvas.width / star.z;
    star.size = parallax * 1.5; // Larger for closer stars
    star.speed = parallax * 0.5; // Faster for closer stars

    const x = star.x - canvas.width / 2;
    const y = star.y - canvas.height / 2;

    const sx = x * parallax + canvas.width / 2;
    const sy = y * parallax + canvas.height / 2;

    // Draw star
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(star.size / 3, 1)})`; // Brighter for closer stars
    ctx.beginPath();
    ctx.arc(sx, sy, star.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

window.addEventListener("resize", init);
init();
animate();
