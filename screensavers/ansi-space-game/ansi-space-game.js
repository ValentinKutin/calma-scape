const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 10; // Size of each grid cell in pixels
const FONT_SIZE = 10; // Font size for ANSI characters
const DUST_COUNT = 100; // Number of space dust particles
const ASTEROID_COUNT = 10; // Number of asteroids
const SPACESHIP_COUNT = 5; // Number of spaceships

let canvasWidth, canvasHeight;
let gridWidth, gridHeight;

let spaceDust = [];
let asteroids = [];
let spaceships = [];

function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    gridWidth = Math.floor(canvasWidth / GRID_SIZE);
    gridHeight = Math.floor(canvasHeight / GRID_SIZE);

    ctx.font = `${FONT_SIZE}px 'Monospace', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Reinitialize dust, asteroids, spaceships on resize
    initSpaceDust();
    initAsteroids();
    initSpaceships();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial resize

// Space Dust
function initSpaceDust() {
    spaceDust = [];
    for (let i = 0; i < DUST_COUNT; i++) {
        spaceDust.push({
            x: Math.random() * gridWidth,
            y: Math.random() * gridHeight,
            char: '.',
            color: 'rgba(255, 255, 255, 0.5)',
            speed: (Math.random() * 0.1) + 0.05 // Slower movement
        });
    }
}

function drawSpaceDust() {
    ctx.fillStyle = '#FFF';
    spaceDust.forEach(dust => {
        const charX = dust.x * GRID_SIZE + GRID_SIZE / 2;
        const charY = dust.y * GRID_SIZE + GRID_SIZE / 2;
        ctx.fillStyle = dust.color;
        ctx.fillText(dust.char, charX, charY);

        dust.x -= dust.speed; // Move left
        if (dust.x < 0) {
            dust.x = gridWidth; // Wrap around
            dust.y = Math.random() * gridHeight; // New random y
        }
    });
}

// Asteroids
function initAsteroids() {
    asteroids = [];
    const asteroidChars = ['O', '0', '@', '*'];
    for (let i = 0; i < ASTEROID_COUNT; i++) {
        asteroids.push({
            x: Math.random() * gridWidth,
            y: Math.random() * gridHeight,
            char: asteroidChars[Math.floor(Math.random() * asteroidChars.length)],
            color: '#AAA',
            speed: (Math.random() * 0.2) + 0.1,
            size: Math.floor(Math.random() * 2) + 1 // 1 or 2 grid units
        });
    }
}

function drawAsteroids() {
    asteroids.forEach(asteroid => {
        ctx.fillStyle = asteroid.color;
        for (let y = 0; y < asteroid.size; y++) {
            for (let x = 0; x < asteroid.size; x++) {
                const charX = (asteroid.x + x) * GRID_SIZE + GRID_SIZE / 2;
                const charY = (asteroid.y + y) * GRID_SIZE + GRID_SIZE / 2;
                ctx.fillText(asteroid.char, charX, charY);
            }
        }

        asteroid.x -= asteroid.speed; // Move left
        if (asteroid.x < -asteroid.size) {
            asteroid.x = gridWidth; // Wrap around
            asteroid.y = Math.random() * gridHeight;
        }
    });
}

// Spaceships
function initSpaceships() {
    spaceships = [];
    const spaceshipChars = ['>', '<', '^', 'v', 'A', 'V']; // Simple spaceship characters
    for (let i = 0; i < SPACESHIP_COUNT; i++) {
        spaceships.push({
            x: Math.random() * gridWidth,
            y: Math.random() * gridHeight,
            char: spaceshipChars[Math.floor(Math.random() * spaceshipChars.length)],
            color: '#0FF',
            speed: (Math.random() * 0.3) + 0.15,
            direction: Math.random() < 0.5 ? 1 : -1 // 1 for right, -1 for left
        });
    }
}

function drawSpaceships() {
    spaceships.forEach(ship => {
        ctx.fillStyle = ship.color;
        const charX = ship.x * GRID_SIZE + GRID_SIZE / 2;
        const charY = ship.y * GRID_SIZE + GRID_SIZE / 2;
        ctx.fillText(ship.char, charX, charY);

        ship.x += ship.speed * ship.direction; // Move based on direction

        // Wrap around or change direction
        if (ship.direction === 1 && ship.x > gridWidth) {
            ship.x = -1; // Start from left
            ship.y = Math.random() * gridHeight;
        } else if (ship.direction === -1 && ship.x < -1) {
            ship.x = gridWidth; // Start from right
            ship.y = Math.random() * gridHeight;
        }
    });
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)'; // Faint green grid lines
    for (let x = 0; x < canvasWidth; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }
    for (let y = 0; y < canvasHeight; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }
}

function drawPlayerStation() {
    const stationChar = '#';
    const stationColor = '#0F0';
    const stationSize = 5; // Size of the station in grid units

    const startX = Math.floor(gridWidth / 2) - Math.floor(stationSize / 2);
    const startY = Math.floor(gridHeight / 2) - Math.floor(stationSize / 2);

    ctx.fillStyle = stationColor;
    for (let y = 0; y < stationSize; y++) {
        for (let x = 0; x < stationSize; x++) {
            const charX = (startX + x) * GRID_SIZE + GRID_SIZE / 2;
            const charY = (startY + y) * GRID_SIZE + GRID_SIZE / 2;
            ctx.fillText(stationChar, charX, charY);
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGrid();
    drawSpaceDust();
    drawAsteroids();
    drawSpaceships();
    drawPlayerStation();
    requestAnimationFrame(gameLoop);
}

gameLoop();