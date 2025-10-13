import * as THREE from 'three';
import * as PS from "./pista";

export const player = {
    speed: 0,
    maxSpeed: 5,
    acceleration: 0.05,
    deceleration: 0.1,  
    steering: 0,
    maxSteering: 0.1,
    items: [],
    currentCamera: 'thirdPerson',

    // para suavizar el giro
    targetSteering: 0,
    currentSteering: 0,
    steeringDamping: 0.8
};

// Control de teclas

export const keys = {};
window.addEventListener('keydown', (e) => { keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key] = false; });


// actualizar jugador 

export function updatePlayer(deltaTime) {
    // movimiento con W 
    if (keys['w'] || keys['W']) {
        player.speed += player.acceleration * deltaTime;
    }
    // movimiento con S 
    else if (keys['s'] || keys['S']) {
        player.speed -= player.deceleration * deltaTime;
    }
    // detenerse inmediatamente
    else {
        player.speed = 0;
    }
    
    // Límites de velocidad
    player.speed = Math.max(-player.maxSpeed, Math.min(player.speed, player.maxSpeed));
    
    // ángulo para la dirección
    let targetSteering = 0;
    if (keys['a'] || keys['A']) {
        targetSteering = player.maxSteering;
    } else if (keys['d'] || keys['D']) {
        targetSteering = -player.maxSteering;
    }
    
    
    player.currentSteering = player.currentSteering + 
        (targetSteering - player.currentSteering) * player.steeringDamping;
    player.currentSteering = Math.max(-player.maxSteering, Math.min(player.currentSteering, player.maxSteering));
}




// Actualizar posición del vehículo

export function updateVehiclePosition(vehicle) {
   
    // actualizar rotación del carrito
    //vehicle.rotation.y += player.currentSteering * deltaTime;

    // vector para la dirección hacia adelante
    const forwardDirection = new THREE.Vector3(0, 0, -1);
    
    // aplicar rotación del carrito al vector
    forwardDirection.applyQuaternion(vehicle.quaternion);
    
    // actualización de la posición usando la dirección correcta
    vehicle.position.x += player.speed * forwardDirection.x;
    vehicle.position.z += player.speed * forwardDirection.z;
}



// actalización de la rotación de las ruedas

export function updateWheelRotation(vehicle) {
    const wheelRotationSpeed = player.speed * 0.1;
    vehicle.children.forEach(wheel => {
        if (wheel.isMesh && wheel.material.color.equals(new THREE.Color(0x000000))) {
           
            // rotación para movimiento alrededor del eje X
            wheel.rotation.x = wheelRotationSpeed;
            
            // rotación para dirección para ruedas delanteras
            const isFrontWheel = Math.abs(wheel.position.z) > 1.5;
            wheel.rotation.y = isFrontWheel ? player.steering : 0;
        }
    });
}