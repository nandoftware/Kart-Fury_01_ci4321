import * as THREE from "three";

const cajaGeo = new THREE.BoxGeometry(3,3,3)
const cajaMat = new THREE.MeshStandardMaterial({ 
    color: 0x00FF00,
});

export const caja = new THREE.Mesh(cajaGeo, cajaMat)
caja.position.set(-30, 3, -75);

export function PowerUpAnimation(){
    caja.rotation.x += 0.01
    caja.rotation.y += 0.01
}

export function PowerUpInteraction(){

}