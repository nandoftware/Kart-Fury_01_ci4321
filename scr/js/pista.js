import * as THREE from "three"

// carretera negra 
const roadWidth = 26;
const roadLength = 500;
const borderWidth = 1;
const stripeWidth = 1.5;
const stripeLength = 5;
const stripeGap = 10


const roadGeometry = new THREE.PlaneGeometry(roadWidth, roadLength);
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); 
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.set(-0.5 * Math.PI, 0, 0);
road.receiveShadow = true;



// borde blanco izquierdo
const borderGeometry = new THREE.PlaneGeometry(borderWidth, roadLength);
const borderMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 }); 

const leftBorder = new THREE.Mesh(borderGeometry, borderMaterial);
leftBorder.position.x = -(roadWidth / 2 + borderWidth / 2); 
leftBorder.rotation.set(-0.5 * Math.PI, 0, 0);
leftBorder.receiveShadow = true;



// borde blanco derecho
const rightBorder = new THREE.Mesh(borderGeometry, borderMaterial);
rightBorder.position.x = roadWidth / 2 + borderWidth / 2; 
rightBorder.rotation.set(-0.5 * Math.PI, 0, 0);
rightBorder.receiveShadow = true



// franjas blancas en el centro
const stripeGroup = new THREE.Group();

const totalStripes = Math.floor(roadLength / (stripeLength + stripeGap));
for (let i = 0; i < totalStripes; i++) {
    const zPosition = -roadLength / 2 + (i * (stripeLength + stripeGap)) + stripeLength / 2;
    
    const stripeGeometry = new THREE.PlaneGeometry(stripeWidth, stripeLength);
    const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);

    stripe.position.set(0, 0, zPosition); 
    stripe.rotation.set(-0.5 * Math.PI, 0, 0); 
    stripe.receiveShadow = true;

    stripeGroup.add(stripe);
}


const pista = new THREE.Group();
pista.add(road);
pista.add(leftBorder);
pista.add(rightBorder);
pista.add(stripeGroup)

export { pista as plane };
