
import * as THREE from "three";

// import * as THREE from "../../node_modules/three/build/three.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0,2,5);
orbit.update();

const axesHelper = new THREE.AxesHelper(5);
const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xF8F850})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

const gird = new THREE.GridHelper(100, 10)
scene.add(gird)

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
scene.add(directionalLight)

plane.rotation.set(-0.5 * Math.PI,0,0)
scene.add(plane)

scene.add(axesHelper);

function animate(time){
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate)
