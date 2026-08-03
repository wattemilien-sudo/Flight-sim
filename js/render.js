export function drawWindshieldView(canvas, ctx, plane) {
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
