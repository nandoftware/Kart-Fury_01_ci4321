import * as THREE from "three";

const carrito = new THREE.Group();

const pinkColor = 0xFF69B4;
const lightPink = 0xFFB6C1;



// Cuerpo
const bodyGeometry = new THREE.BoxGeometry(3.5, 1.2, 6);
const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: pinkColor,
    roughness: 0.4,
    metalness: 0.6
});
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 1.5;
body.castShadow = true;
carrito.add(body);



// Cabina
const cabinGeometry = new THREE.BoxGeometry(2.2, 1, 2.5);
const cabinMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x88CCFF,
    transparent: true,
    // opacity: 0.7,
    // roughness: 0.2,
    // metalness: 0.8
});
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.position.set(0, 2.3, 1.5);
cabin.castShadow = true;
carrito.add(cabin);



// Ruedas
const wheelGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.5, 16);
const wheelMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x222222,
    roughness: 0.9,
    metalness: 0.1
});

const wheelRimGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.42, 12);
const wheelRimMaterial = new THREE.MeshStandardMaterial({ 
    color: lightPink,
    roughness: 0.3,
    metalness: 0.8
});

const wheelPositions = [
    { x: -2.0, y: 0.9, z: 1.8 },
    { x: 2.0, y: 0.9, z: 1.8 },
    { x: -2.0, y: 0.9, z: -1.8 },
    { x: 2.0, y: 0.9, z: -1.8 }
];

wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.position.set(pos.x, pos.y, pos.z);
    wheel.rotation.z = Math.PI / 2;
    wheel.castShadow = true;
    carrito.add(wheel);

    const wheelRim = new THREE.Mesh(wheelRimGeometry, wheelRimMaterial);
    wheelRim.position.set(pos.x, pos.y, pos.z);
    wheelRim.rotation.z = Math.PI / 2;
    wheelRim.castShadow = true;
    carrito.add(wheelRim);
});



// luces delanteras
const lightGeometry = new THREE.CircleGeometry(0.25, 16);
const lightMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});

const leftLight = new THREE.Mesh(lightGeometry, lightMaterial);
leftLight.position.set(-0.8, 1, -2.95);
leftLight.rotation.x = Math.PI / 2;
carrito.add(leftLight);

const rightLight = new THREE.Mesh(lightGeometry, lightMaterial);
rightLight.position.set(0.8, 1, -2.95);
rightLight.rotation.x = Math.PI / 2;
carrito.add(rightLight);



// puertas
const doorWidth = 1.8;
const doorHeight = 0.9;
const doorThickness = 0.02;

const doorGeometry = new THREE.BoxGeometry(doorThickness, doorHeight, doorWidth);
const doorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xF9C2CD,
    roughness: 0.3,
    metalness: 0.7
});


// puerta izq
const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
leftDoor.position.set(-(3.5 / 2 + doorThickness / 2), 1.5, 0);
leftDoor.castShadow = true;
leftDoor.receiveShadow = true;
carrito.add(leftDoor);


// puerta der
const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);
rightDoor.position.set(3.5 / 2 + doorThickness / 2, 1.5, 0);
rightDoor.castShadow = true;
rightDoor.receiveShadow = true;
carrito.add(rightDoor);



export { carrito };
