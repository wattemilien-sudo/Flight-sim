// The Master Plane State
export const plane = {
    altitude: 0,       // Feet
    airspeed: 0,       // Knots
    throttle: 0,       // Percentage (0 to 100)
    pitch: 0,          // Degrees (-30 to +30)
    verticalSpeed: 0   // Feet per minute
};

// Update physics every frame
export function updatePhysics(keys) {
    // 1. Throttle control
    if (keys['w'] || keys['W']) plane.throttle = Math.min(100, plane.throttle + 0.5);
    if (keys['s'] || keys['S']) plane.throttle = Math.max(0, plane.throttle - 0.5);

    // 2. Pitch control (Nose up/down)
    if (keys['ArrowUp']) plane.pitch = Math.min(30, plane.pitch + 0.5);
    if (keys['ArrowDown']) plane.pitch = Math.max(-30, plane.pitch - 0.5);
    
    // Auto-level slightly if no pitch keys are pressed
    if (!keys['ArrowUp'] && !keys['ArrowDown']) {
        plane.pitch *= 0.98;
    }

    // 3. Calculate Airspeed based on throttle and pitch
    let targetSpeed = plane.throttle * 2.5;
    plane.airspeed += (targetSpeed - plane.airspeed) * 0.05; // Smooth acceleration

    // 4. Calculate Lift & Vertical Speed
    // If you have enough speed and pitch up, you climb. If speed is too low, you stall!
    if (plane.airspeed > 60) {
        plane.verticalSpeed = (plane.pitch * 15) + ((plane.airspeed - 100) * 2);
    } else {
        plane.verticalSpeed = -200; // Stall/sink rate
    }

    // 5. Update Altitude
    plane.altitude += plane.verticalSpeed / 60; // Scale to 60fps
    if (plane.altitude < 0) {
        plane.altitude = 0; // Grounded
        plane.verticalSpeed = 0;
    }
}
