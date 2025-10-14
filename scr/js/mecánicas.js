import * as THREE from "three";

//  teclas 
export const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});



// jugador 
export const player = {
    speed: 0,
    maxSpeed: 10,
    acceleration: 20,
    deceleration: 15,
    currentSteering: 0,
    maxSteering: Math.PI / 6,
    steeringDamping: 5,
    rotationSpeed: 2
};



// actualizaciones
export function updatePlayer(deltaTime) {
    // Aceleración
    if (keys['w'] || keys['W']) {
        player.speed += player.acceleration * deltaTime;
    } else if (keys['s'] || keys['S']) {
        player.speed -= player.acceleration * deltaTime;
    } else {
        const friction = player.deceleration * deltaTime;
        if (player.speed > 0) {
            player.speed = Math.max(0, player.speed - friction);
        } else if (player.speed < 0) {
            player.speed = Math.min(0, player.speed + friction);
        }
    }

    player.speed = Math.max(-player.maxSpeed, Math.min(player.speed, player.maxSpeed));



    // Giro
    let targetSteering = 0;
    if (keys['a'] || keys['A']) {
        targetSteering = player.maxSteering;
    } else if (keys['d'] || keys['D']) {
        targetSteering = -player.maxSteering;
    }

    player.currentSteering += (targetSteering - player.currentSteering) * player.steeringDamping * deltaTime;
    player.currentSteering = Math.max(-player.maxSteering, Math.min(player.currentSteering, player.maxSteering));
}



// posicion del carrito
export function updateVehiclePosition(vehicle, deltaTime) {
    if (Math.abs(player.speed) > 0.1) {
        vehicle.rotation.y += player.currentSteering * player.rotationSpeed * deltaTime;
    }

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(vehicle.quaternion);
    vehicle.position.add(forward.clone().multiplyScalar(player.speed * deltaTime));
}



// ruedas
export function updateWheelRotation(vehicle, deltaTime) {
    const wheelRotation = player.speed * deltaTime * 5;

    vehicle.children.forEach(child => {
        if (child.geometry && child.geometry.type === 'CylinderGeometry') {
            if (child.material && child.material.color.getHex() === 0x222222) {
                child.rotation.x += wheelRotation;
                const isFront = Math.abs(child.position.z) > 1.5;
                if (isFront) {
                    child.rotation.y = player.currentSteering;
                }
            }
        }
    });
}