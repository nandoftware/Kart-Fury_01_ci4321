import * as THREE from "three";

export function crearAmbiente(scene) {
    // luz direccional representada con un sol en la escena
    const sol = new THREE.DirectionalLight(0xFFFFFF, 1.2);
    sol.position.set(50, 80, 50); 
    sol.castShadow = true; // castea sombras

    sol.shadow.mapSize.width = 1024;
    sol.shadow.mapSize.height = 1024;
    sol.shadow.camera.near = 0.5;
    sol.shadow.camera.far = 300;
    sol.shadow.camera.left = -100;
    sol.shadow.camera.right = 100;
    sol.shadow.camera.top = 100;
    sol.shadow.camera.bottom = -100;

    scene.add(sol);
    scene.add(new THREE.DirectionalLightHelper(sol, 5)); // solo para desarrollo

    
    const luzAmbiental = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(luzAmbiental);

    // cielo azul
    scene.background = new THREE.Color(0x87CEEB); 


    // sol solecito calientame un poquito
    // directamente en la escena
    const solVisual = new THREE.Mesh(
        new THREE.SphereGeometry(10, 30, 30),
        new THREE.MeshBasicMaterial({ color: 0xFFFF00 })
    );
    
    solVisual.position.copy(sol.position);
    scene.add(solVisual);

    return { sol, solVisual };
}