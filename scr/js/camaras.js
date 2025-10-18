import * as THREE from "three";

var indice = 0;
var once= true;

export function UpdateCamra(rend, sce, cams){
    rend.render(sce, cams[indice]);
}

window.addEventListener('keyup', (e) => {
    
    if (e.key == 't'||e.key == 't'){
        indice = indice + 1;
    }
    if (indice > 1){
        indice = 0;
    }
    
}, false);

