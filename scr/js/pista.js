import * as THREE from "three"

const planeGeometry = new THREE.PlaneGeometry(30, 500)
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xA5A5A5})
export const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.set(-0.5 * Math.PI,0,0)
