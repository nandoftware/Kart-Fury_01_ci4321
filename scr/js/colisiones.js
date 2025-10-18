import * as THREE from "three";

import { body } from "./carritorosa";
import { PW1 } from "./powerUps";


let bodyCollider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
bodyCollider.setFromObject(body)





export function UpdateCollidersPos(){
    bodyCollider.copy(body.geometry.boundingBox).applyMatrix4(body.matrixWorld)
}

export function Checkcollisions(){
    if (bodyCollider.intersectsBox(PW1._cajaCollider)){
        console.log("hola")
    }
}