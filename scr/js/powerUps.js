import * as THREE from "three";


class PowerUp{
    constructor(){
        this._cajaGeometry = new THREE.BoxGeometry(3,3,3);
        this._cajaMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00FF00,
        });

        this._caja = new THREE.Mesh(this._cajaGeometry, this._cajaMaterial);
        this._caja.position.set(-30, 3, -75);

        this._cajaCollider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this._cajaCollider.setFromObject(this._caja);
    }


    Anim() {
        this._caja.rotation.x += 0.01;
        this._caja.rotation.y += 0.01;
    }
}


export function AddAllBoxes(scena){
    scena.add(PW1._caja);
}
export const PW1 = new PowerUp();

export function PowerUpAnimation(){
    PW1.Anim()
}

export function PowerUpInteraction(){

}