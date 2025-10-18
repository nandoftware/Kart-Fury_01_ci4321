import * as THREE from "three";

const roadWidth = 35;        
const totalWidth = 200;      
const totalHeight = 150;     


const borderWidth = 5;       
const stripeWidth = 1.5;
const stripeLength = 5;
const stripeGap = 10;


const halfW = totalWidth / 2;      
const halfH = totalHeight / 2;     
const halfRoad = roadWidth / 2;    

// para los bordes amarillos
const OUTER_HALF_X = halfW + halfRoad; 
const OUTER_HALF_Z = halfH + halfRoad; 
const INNER_HALF_X = halfW - halfRoad; 
const INNER_HALF_Z = halfH - halfRoad; 

// segmentos largos en el eje x y SIN bordes amarillos 
function createLongSegment(length) {
    const road = new THREE.Mesh(
        new THREE.PlaneGeometry(length, roadWidth),
        new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    road.rotation.x = -Math.PI / 2;

    // líneas  blancas
    const stripes = new THREE.Group();
    const count = Math.floor(length / (stripeLength + stripeGap));
    for (let i = 0; i < count; i++) {
        const x = -length / 2 + i * (stripeLength + stripeGap) + stripeLength / 2;
        const stripe = new THREE.Mesh(
            new THREE.PlaneGeometry(stripeLength, stripeWidth),
            new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
        );
        stripe.position.set(x, 0.1, 0);
        stripe.rotation.x = -Math.PI / 2;
        stripes.add(stripe);
    }

    const segment = new THREE.Group();
    segment.add(road);
    segment.add(stripes);
    return segment;
}

// segmentos cortos en el eje Z y SIN bordes amarillos 
function createShortSegment(length) {
    const road = new THREE.Mesh(
        new THREE.PlaneGeometry(roadWidth, length),
        new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    road.rotation.x = -Math.PI / 2;

    // Líneas divisorias blancas
    const stripes = new THREE.Group();
    const count = Math.floor(length / (stripeLength + stripeGap));
    for (let i = 0; i < count; i++) {
        const z = -length / 2 + i * (stripeLength + stripeGap) + stripeLength / 2;
        const stripe = new THREE.Mesh(
            new THREE.PlaneGeometry(stripeWidth, stripeLength),
            new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
        );
        stripe.position.set(0, 0.1, z);
        stripe.rotation.x = -Math.PI / 2;
        stripes.add(stripe);
    }

    const segment = new THREE.Group();
    segment.add(road);
    segment.add(stripes);
    return segment;
}

//  crear bordes amarillos para q se extienden hasta las esquinas
function crearBordesConGrosor(grosorVertical = 60) {
    const grupo = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
    // borde exterior
    const topExt = new THREE.Mesh(
        new THREE.BoxGeometry(2 * OUTER_HALF_X, grosorVertical, borderWidth),
        material
    );
    topExt.position.set(0, grosorVertical / 2, OUTER_HALF_Z);
    const bottomExt = new THREE.Mesh(
        new THREE.BoxGeometry(2 * OUTER_HALF_X, grosorVertical, borderWidth),
        material
    );
    bottomExt.position.set(0, grosorVertical / 2, -OUTER_HALF_Z);
    const leftExt = new THREE.Mesh(
        new THREE.BoxGeometry(borderWidth, grosorVertical, 2 * OUTER_HALF_Z),
        material
    );
    leftExt.position.set(-OUTER_HALF_X, grosorVertical / 2, 0);
    const rightExt = new THREE.Mesh(
        new THREE.BoxGeometry(borderWidth, grosorVertical, 2 * OUTER_HALF_Z),
        material
    );
    rightExt.position.set(OUTER_HALF_X, grosorVertical / 2, 0);


    // borde interno
    const topInt = new THREE.Mesh(
        new THREE.BoxGeometry(2 * INNER_HALF_X, grosorVertical, borderWidth),
        material
    );
    topInt.position.set(0, grosorVertical / 2, INNER_HALF_Z);
    const bottomInt = new THREE.Mesh(
        new THREE.BoxGeometry(2 * INNER_HALF_X, grosorVertical, borderWidth),
        material
    );
    bottomInt.position.set(0, grosorVertical / 2, -INNER_HALF_Z);
    const leftInt = new THREE.Mesh(
        new THREE.BoxGeometry(borderWidth, grosorVertical, 2 * INNER_HALF_Z),
        material
    );
    leftInt.position.set(-INNER_HALF_X, grosorVertical / 2, 0);
    const rightInt = new THREE.Mesh(
        new THREE.BoxGeometry(borderWidth, grosorVertical, 2 * INNER_HALF_Z),
        material
    );
    rightInt.position.set(INNER_HALF_X, grosorVertical / 2, 0);

    // agregamos 
    grupo.add(topExt, bottomExt, leftExt, rightExt);
    grupo.add(topInt, bottomInt, leftInt, rightInt);

    return grupo;
}



// ponemos y creamos los segmentos de la pista
const shortsegmentlength = 170;   
const longsegmentlength = 190; 
const bottomSegment = createLongSegment(shortsegmentlength);
bottomSegment.position.set(0, 0, -halfH);
const topSegment = createLongSegment(shortsegmentlength);
topSegment.position.set(0, 0, halfH);
const leftSegment = createShortSegment(longsegmentlength);
leftSegment.position.set(-halfW, 0, 0);
const rightSegment = createShortSegment(longsegmentlength);
rightSegment.position.set(halfW, 0, 0);


// creamos bordes amarillos 
const bordesAmarillos = crearBordesConGrosor(0.8);


// afrupamos todo 
const pista = new THREE.Group();
pista.add(bottomSegment, topSegment, leftSegment, rightSegment, bordesAmarillos);

export { pista as plane };
