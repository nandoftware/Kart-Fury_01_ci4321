import * as THREE from "three";

import { body } from "./carritorosa";
import { caja } from "./powerUps";


let bodyCollider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
bodyCollider.setFromObject(body)

let cajaCollider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
cajaCollider.setFromObject(caja)



export function UpdateCollidersPos(){
    bodyCollider.copy(body.geometry.boundingBox).applyMatrix4(body.matrixWorld)
}

export function Checkcollisions(){
    if (bodyCollider.intersectsBox(cajaCollider)){
        console.log("hola")
    }
}