import * as THREE from "three";


const PISTA_ANCHO = 30;
const LIMITE_IZQUIERDO = -PISTA_ANCHO / 2 + 0.5; 
const LIMITE_DERECHO = PISTA_ANCHO / 2 - 0.5;     

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
    maxSpeed: 15,
    acceleration: 20,
    deceleration: 15,
    currentSteering: 0,
    maxSteering: Math.PI / 6,
    steeringDamping: 5,
    rotationSpeed: 4
};




// actualizaciones
export function updatePlayer(deltaTime) {

    // aceleración
    if (keys['w'] || keys['W']) { // lees adelante
        player.speed += player.acceleration * deltaTime;
    } else if (keys['s'] || keys['S']) { // lees atras
        player.speed -= player.acceleration * deltaTime;
    } else {
        // basicamente simulamos la friccion cuando deja de moverse para desacelerar hasta llegar a 0
        const friction = player.deceleration * deltaTime;
        if (player.speed > 0) {
            player.speed = Math.max(0, player.speed - friction);
        } else if (player.speed < 0) {
            player.speed = Math.min(0, player.speed + friction);
        }
    }

    // y aqui le aplicamos limites de velicidad
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



// posicion del carrito, vichle = carrito
export function updateVehiclePosition(vehicle, deltaTime) {
    
    if (player.speed > 0) {
        vehicle.rotation.y += player.currentSteering * player.rotationSpeed * deltaTime;
    }
    else if(player.speed < 0){
        vehicle.rotation.y += -player.currentSteering * player.rotationSpeed * deltaTime;
    }

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(vehicle.quaternion);
    vehicle.position.add(forward.multiplyScalar(player.speed * deltaTime));
}



// ruedas
export function updateWheelRotation(wheels, deltaTime) {
    const wheelRotation = player.speed * deltaTime * 4;
    //que se muevan para adelante o para atras las ruedas y que roten en y los rines
    wheels.children.forEach(child => {
        child.children[0].rotation.y += wheelRotation;
    });
    for (let index = 0; index < 2; index++) {
        wheels.children[index].rotation.y = player.currentSteering;
    }
}


// limites para que solo transite sobre la pista

const ancho = 200;    // total
const alto = 150;    // total
const anchoCarretera = 35;      

const mitadExteriorX = ancho / 2 + anchoCarretera / 2;   
const mitadExteriorZ = alto / 2 + anchoCarretera / 2;  

const mitadInteriorX = ancho / 2 - anchoCarretera / 2;   
const mitadInteriorZ = alto / 2 - anchoCarretera / 2;  

export function aplicarLimitesPista(vehicle) {
    const x = vehicle.position.x;
    const z = vehicle.position.z;

   
    if (x < -mitadExteriorX) vehicle.position.x = -mitadExteriorX;
    else if (x > mitadExteriorX) vehicle.position.x = mitadExteriorX;

    if (z < -mitadExteriorZ) vehicle.position.z = -mitadExteriorZ;
    else if (z > mitadExteriorZ) vehicle.position.z = mitadExteriorZ;

    
    if (Math.abs(x) < mitadInteriorX && Math.abs(z) < mitadInteriorZ) {
        
        const distX = mitadInteriorX - Math.abs(x);
        const distZ = mitadInteriorZ - Math.abs(z);

        if (distX < distZ) {
            
            vehicle.position.x = x > 0 ? mitadInteriorX : -mitadInteriorX;
        } else {
            
            vehicle.position.z = z > 0 ? mitadInteriorZ : -mitadInteriorZ;
        }
    }

}
