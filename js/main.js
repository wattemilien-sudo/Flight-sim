import { plane, updatePhysics } from './physics.js';

const canvas = document.getElementById('skyCanvas');
const ctx = canvas.getContext('2d');

// Track keyboard inputs
let keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Render the moving sky and ground on the canvas window
function drawWindshieldView() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Horizon shifts up or down depending on pitch
    let horizonY = 150 + (plane.pitch * 4);

    // Sky
    ctx.fillStyle = "#10316b";
    ctx.fillRect(0, 0, canvas.width, horizonY);

    // Ground
    ctx.fillStyle = "#1e381e";
    ctx.fillRect(0, horizonY, canvas.width, canvas.height - horizonY);

    // Horizon Line
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(canvas.width, horizonY);
    ctx.stroke();

    // Runway visual cue when close to ground
    if (plane.altitude < 500) {
        ctx.fillStyle = "#ffcc00";
        ctx.fillRect(canvas.width / 2 - 4, horizonY + 15, 8, 25);
    }
}

// Update HTML text elements with live physics data
function updateUI() {
    document.getElementById('val-speed').innerText = Math.floor(plane.airspeed);
    document.getElementById('val-alt').innerText = Math.floor(plane.altitude);
    document.getElementById('val-throttle').innerText = Math.floor(plane.throttle);
    document.getElementById('val-vs').innerText = Math.floor(plane.verticalSpeed);
    document.getElementById('hud-pitch').innerText = Math.floor(plane.pitch);
    
    let statusEl = document.getElementById('hud-status');
    if (plane.altitude <= 0 && plane.throttle === 0) {
        statusEl.innerText = "PARKED / GROUNDED";
        statusEl.style.color = "#00ffcc";
    } else if (plane.altitude <= 0) {
        statusEl.innerText = "TOUCHDOWN";
        statusEl.style.color = "#ff3333";
    } else if (plane.airspeed < 60 && plane.altitude > 10) {
        statusEl.innerText = "STALL WARNING!";
        statusEl.style.color = "#ff3333";
    } else {
        statusEl.innerText = "AIRBORNE";
        statusEl.style.color = "#00ffcc";
    }
}

// Master Game Loop (Runs ~60 frames per second)
function gameLoop() {
    updatePhysics(keys);
    drawWindshieldView();
    updateUI();
    requestAnimationFrame(gameLoop);
}

// Kick off the loop
gameLoop();
