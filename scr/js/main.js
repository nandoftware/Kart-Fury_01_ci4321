import * as THREE from "three";
import * as PS from "./pista"

import { carrito } from "./carritorosa";

// import * as THREE from "../../node_modules/three/build/three.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


import { 
    player,
    keys,
    updatePlayer,
    updateVehiclePosition,
    updateWheelRotation
} from './mecánicas';


//hola

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = true
orbit.enablePan = true
orbit.enableRotate = true

camera.position.set(0,2,5);
orbit.target.copy(carrito.position)
orbit.update();


scene.add(PS.plane)

// posicionamos el carrito en la pista
carrito.position.set(0, 1, 0);
scene.add(carrito);


// cosas de la escena
const gird = new THREE.GridHelper(100, 10)
scene.add(gird)

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
directionalLight.position.set(-30,50,0)
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
scene.add(directionalLight)
scene.add(dLightHelper)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

let lastFrameTime = 0;

function animate(time) {
    const deltaTime = (time - lastFrameTime) / 1000;
    lastFrameTime = time;

    updatePlayer(deltaTime);
    updateVehiclePosition(carrito, deltaTime); 
    updateWheelRotation(carrito, deltaTime);   

    orbit.target.copy(carrito.position);
    orbit.update(); 

    renderer.render(scene, camera);
}


renderer.setAnimationLoop(animate);
