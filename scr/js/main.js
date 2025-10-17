import * as THREE from "three";
// import * as PS from "./pista"

import { carrito } from "./carritorosa";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { 
    updatePlayer,
    updateVehiclePosition,
    updateWheelRotation,
    aplicarLimitesPista
} from './mecánicas';

import { plane } from "./pista";

import { crearAmbiente } from "./ambiente";


//hola

const scene = new THREE.Scene();
const mainCamera = new THREE.PerspectivemainCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// ambiente
crearAmbiente(scene);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// la camara fija (temporal)
const orbit = new OrbitControls(mainCamera, renderer.domElement);
orbit.enableZoom = true
orbit.enablePan = true
orbit.enableRotate = true

mainCamera.position.set(0,2,5);
orbit.target.copy(carrito.position)
orbit.update();

// metemos la pista
scene.add(plane);

// posicionamos el carrito en la pista
carrito.position.set(0, 0, 0);
scene.add(carrito);


const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
directionalLight.position.set(-30,50,0)
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
scene.add(directionalLight)
scene.add(dLightHelper)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

let lastFrameTime = 0;

function animate(time) {
    // el delta tain de toda la vida
    const deltaTime = (time - lastFrameTime) / 1000;
    lastFrameTime = time;

    updatePlayer(deltaTime);
    updateVehiclePosition(carrito, deltaTime); 
    
    updateWheelRotation(carrito.children[1], deltaTime);   

    aplicarLimitesPista(carrito);

    orbit.target.copy(carrito.position);
    orbit.update(); 

    renderer.render(scene, mainCamera);
}


renderer.setAnimationLoop(animate);
