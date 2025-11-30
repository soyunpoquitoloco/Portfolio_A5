import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from '@tweenjs/tween.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import projects from '../../../public/Projects/projects.json';
import NavBar from './NavBar';
const Scene = forwardRef((props, ref) => {
    const mountRef = useRef(null);
    let navBar;
    const router = useRouter();

  useEffect(() => {
    if (!ref.current) {
      console.error("Canvas ref not available yet");
      return;
    }
const tweenGroup = new TWEEN.Group();
let ico1, ico2, ico3;
    // Les coordonnées sont étranges le y = z
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(10,5,0);

const renderer = new THREE.WebGLRenderer({
    canvas: ref.current,
    antialias: false,
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;



const geometry = new THREE.IcosahedronGeometry(5)
const material = new THREE.MeshLambertMaterial( {color: 0x564787, wireframe: false});
ico1 = new THREE.Mesh(geometry, material);
ico1.castShadow = true;
ico1.receiveShadow = true;
ico1.position.set(0,10,0)
//scene.add(ico1)

ico2 = ico1.clone();
ico2.position.set(-75,10,-75);
//scene.add(ico2);

ico3 = ico1.clone();
ico3.position.set(-75,10,50)
//scene.add(ico3)

// Create navigation bar at the top
const navBar = document.createElement('div');
navBar.style.position = 'fixed';
navBar.style.top = '0';
navBar.style.left = '0';
navBar.style.width = '100%';
navBar.style.height = '50px';
navBar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
navBar.style.zIndex = '1000';
navBar.style.display = 'flex';
navBar.style.justifyContent = 'center';
navBar.style.alignItems = 'center';
navBar.style.color = 'white';
document.body.appendChild(navBar);

let currentTween = null; // Ajoute ça en global si pas déjà (après const scene)

function zoomToIco(ico, cameraTargetPos) {
    if (currentTween) {
        currentTween.stop();
    }
        if (!ico) {
      console.error('Erreur : ico est undefined !');
      return;
    }
    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const endPos = cameraTargetPos;
    const endTarget = ico.position.clone();  // Toujours l'ico comme base, mais on offset la visée
    
    // Debug clé : Vérifie si start == end
    const isSamePos = startPos.distanceTo(endPos) < 0.1;
    const isSameTarget = startTarget.distanceTo(endTarget) < 0.1;
    if (isSamePos && isSameTarget) {
        controls.enabled = true;
        return;
    }

    const tweenObj = {
        posX: startPos.x,
        posY: startPos.y,
        posZ: startPos.z,
        targetX: startTarget.x,  // On va offset ça dans onUpdate
        targetY: startTarget.y,
        targetZ: startTarget.z
    };

    controls.enabled = false;

    currentTween = new TWEEN.Tween(tweenObj, tweenGroup)
        .to({
            posX: endPos.x,
            posY: endPos.y,
            posZ: endPos.z,
            targetX: endTarget.x,  // Offset X négatif pour décaler la visée (ajuste -10 si besoin)
            targetY: endTarget.y,
            targetZ: endTarget.z - 15
        }, 1500)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onStart(() => {
        })
        .onUpdate(() => {
            controls.target.set(tweenObj.targetX, tweenObj.targetY, tweenObj.targetZ);  // Utilise le target offseté
            camera.position.set(tweenObj.posX, tweenObj.posY, tweenObj.posZ);
            camera.lookAt(controls.target);  // Regarde vers le target offseté
        })
        .onComplete(() => {
            controls.enabled = true;
            controls.update();
            currentTween = null;
        })
        .start();
    const startTime = performance.now();

}


// Buttons for each ico (positions adjusted for a good view from the side)
const btn1 = document.createElement('button');
btn1.textContent = 'AquaMind';
btn1.style.margin = '0 10px';
btn1.style.padding = '10px 15px';
btn1.style.backgroundColor = '#9AD4D6';
btn1.style.borderRadius = '10px';
btn1.style.color = 'white';
btn1.style.border = 'none';
btn1.style.cursor = 'pointer';
btn1.onclick = () => {
    zoomToIco(ico1, new THREE.Vector3(-20, 5, 0));
    document.getElementById('project-video2').style.display = 'none';
    document.getElementById('project-video2').pause();  // Arrête la vidéo
    const data = projects.AquaMind;
    document.getElementById('title').textContent = data.title;
    document.getElementById('desc').textContent = data.description;
    
    // Gestion de l'image
    const img = document.getElementById('project-image');
    if (data.image) {
        img.src = data.image;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }
    
    // Gestion de la vidéo
    const video = document.getElementById('project-video');
    if (data.video) {
        video.src = data.video;
        video.style.display = 'block';
        video.load();  // Recharge la vidéo pour éviter les conflits
    } else {
        video.style.display = 'none';
    }
    
    // Affichage de l'overlay
    document.getElementById('description-overlay').style.display = 'block';
    const overlay = document.getElementById('description-overlay');
    overlay.style.left = '0px';
    overlay.style.right = '0px';
    overlay.style.top = '100px';
};

// Répétez pour btn2 et btn3 en changeant projects.ico2, etc.
navBar.appendChild(btn1);
const btn2 = document.createElement('button');
btn2.textContent = 'Sealy';
btn2.style.margin = '0 10px';
btn2.style.padding = '10px 15px';
btn2.style.backgroundColor = '#9AD4D6';
btn2.style.borderRadius = '10px';
btn2.style.color = 'white';
btn2.style.border = 'none';
btn2.style.cursor = 'pointer';
btn2.onclick = () => {
    zoomToIco(ico2, new THREE.Vector3(-55, 5, -75)); // View from positive X
    document.getElementById('project-video2').style.display = 'none';
    document.getElementById('project-video2').pause();  // Arrête la vidéo
    const data = projects.sealy;
    document.getElementById('title').textContent = data.title;
    document.getElementById('desc').textContent = data.description;
    
    // Gestion de l'image
    const img = document.getElementById('project-image');
    if (data.image) {
        img.src = data.image;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }
    
    // Gestion de la vidéo
    const video = document.getElementById('project-video');
    if (data.video) {
        video.src = data.video;
        video.style.display = 'block';
        video.load(); // Recharge la vidéo pour éviter les conflits
    } else {
        video.style.display = 'none';
    }
    
    document.getElementById('description-overlay').style.display = 'block';  // Affiche
    const overlay = document.getElementById('description-overlay');
    overlay.style.left = '50%'; // Réinitialise left
    overlay.style.right = '0px'; // Position à droite
    overlay.style.top = "100px";
    overlay.style.display = 'block'; // Affiche
}
navBar.appendChild(btn2);

const btn3 = document.createElement('button');
btn3.textContent = 'Inflatable Torus';
btn3.style.margin = '0 10px';
btn3.style.padding = '10px 15px';
btn3.style.backgroundColor = '#9AD4D6';
btn3.style.borderRadius = '10px';
btn3.style.color = 'white';
btn3.style.border = 'none';
btn3.style.cursor = 'pointer';
btn3.onclick = () => {
    zoomToIco(ico3, new THREE.Vector3(-55, 5, 50)); // View from positive X
    const data = projects.torus;
    document.getElementById('title').textContent = data.title;
    document.getElementById('desc').textContent = data.description;
    
    // Gestion de l'image
    const img = document.getElementById('project-image');
    if (data.image) {
        img.src = data.image;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }
    
    // Gestion de la vidéo
    const video = document.getElementById('project-video');
    if (data.video) {
        video.src = data.video;
        video.style.display = 'block';
        video.load(); // Recharge la vidéo pour éviter les conflits
    } else {
        video.style.display = 'none';
    }
    const video2 = document.getElementById('project-video2');
    if (data.video2) {
        video2.src = data.video;
        video2.style.display = 'block';
        video2.load(); // Recharge la vidéo pour éviter les conflits
    } else {
        video2.style.display = 'none';
    }
    document.getElementById('description-overlay').style.display = 'block';  // Affiche
    const overlay = document.getElementById('description-overlay');
    overlay.style.left = '50%'; // Réinitialise left
    overlay.style.right = '0px'; // Position à droite
    overlay.style.top = "100px";
    overlay.style.display = 'block'; // Affiche
}
navBar.appendChild(btn3);

const exit = document.createElement('exit');
exit.textContent = 'EXIT';
exit.style.margin = '0 10px';
exit.style.padding = '10px 15px';
exit.style.borderRadius = '10px';
exit.style.backgroundColor = '#564787';
exit.style.color = 'white';
exit.style.border = 'none';
exit.style.cursor = 'pointer';
exit.onclick = () => {
    router.push('/');
}
navBar.appendChild(exit);

document.getElementById('close-desc').onclick = () => {
    const overlay = document.getElementById('description-overlay');
    overlay.style.display = 'none';
    overlay.style.left = 'auto'; // Réinitialise
    overlay.style.right = 'auto'; // Réinitialise
    overlay.style.removeProperty('left');
    overlay.style.removeProperty('right');
    overlay.style.removeProperty('top');

    document.getElementById('project-image').style.display = 'none';
    document.getElementById('project-video').style.display = 'none';
    document.getElementById('project-video').pause();  // Arrête la vidéo
    document.getElementById('project-video2').style.display = 'none';
    document.getElementById('project-video2').pause();  // Arrête la vidéo
    document.getElementById('project-link').style.display = 'none';
};
//const icoTexture = new THREE.TextureLoader().load('images/Bato.png');
//const geometry = new THREE.IcosahedronGeometry(10)
//const material = new THREE.MeshBasicMaterial( {map: icoTexture});
//const ico = new THREE.Mesh(geometry, material);
//scene.add(ico)


//0xa02697
const pointLight1 = new THREE.PointLight(0x564787, 5000)
pointLight1.castShadow = false;
pointLight1.shadow.mapSize.width = 1024;  // Résolution (plus élevé = meilleure qualité, mais plus lent)
pointLight1.shadow.mapSize.height = 1024;
pointLight1.shadow.camera.near = 0.5;  // Distance minimale
pointLight1.shadow.camera.far = 500;   // Distance maximale
pointLight1.position.set(-65,30,-65)
scene.add(pointLight1)
//0x1e8da3
const pointLight2 = new THREE.PointLight(0x564787, 5000)
pointLight2.castShadow = false;
pointLight2.shadow.mapSize.width = 1024;  // Résolution (plus élevé = meilleure qualité, mais plus lent)
pointLight2.shadow.mapSize.height = 1024;
pointLight2.shadow.camera.near = 0.5;  // Distance minimale
pointLight2.shadow.camera.far = 500;   // Distance maximale
pointLight2.position.set(-65,30,40)
scene.add(pointLight2)
//0x86ba3a
const pointLight3 = new THREE.PointLight(0x564787, 5000)
pointLight3.castShadow = false;
pointLight3.shadow.mapSize.width = 4096;  // Résolution (plus élevé = meilleure qualité, mais plus lent)
pointLight3.shadow.mapSize.height = 4096;
pointLight3.shadow.camera.near = 0.5;  // Distance minimale
pointLight3.shadow.camera.far = 500;   // Distance maximale
pointLight3.position.set(10,30,10)
scene.add(pointLight3)
let angle = 0;
const centreX = 0;
const centreZ = 0;
const rayon = 20;
const speed = 0.01;


//const ambientLight = new THREE.AmbientLight(0xffffff, 100);
//scene.add(ambientLight)


//const lightHelper = new THREE.PointLightHelper(pointLight3)
//scene.add(lightHelper)

//const lightHelper1 = new THREE.PointLightHelper(pointLight1)
//scene.add(lightHelper1)

//const lightHelper2 = new THREE.PointLightHelper(pointLight2)
//scene.add(lightHelper2)
/* const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper) */




const controls = new OrbitControls(camera, ref.current);

const ground_geo = new THREE.PlaneGeometry(200, 200);
const ground_material = new THREE.MeshPhongMaterial({ color: 0x101935, side: THREE.DoubleSide });
const ground = new THREE.Mesh(ground_geo, ground_material);
ground.receiveShadow = false;
ground.rotation.x = -Math.PI / 2; 
ground.position.y = 0;
ground.scale.set(4,4,4);
scene.add(ground);
/*
const wall_texture = new THREE.TextureLoader().load('../../../images/Concrete.png');
const wall_material = new THREE.MeshPhongMaterial({ color: 0x9AD4D6, side: THREE.DoubleSide });
const wall1_geo = new THREE.PlaneGeometry(200, 20);
const wall1 = new THREE.Mesh(wall1_geo, wall_material);
wall1.position.y = 5;
wall1.position.x = 50;
wall1.position.z = 0;
wall1.rotation.y = Math.PI / 2;
scene.add(wall1);

const wall2_geo = new THREE.PlaneGeometry(150, 20);
const wall2 = new THREE.Mesh(wall2_geo, wall_material);
wall2.position.y = 5;
wall2.position.x = -25;
wall2.position.z = 100;
scene.add(wall2);

let wall3 = wall1.clone();
wall3.position.set(-100,5,0);
scene.add(wall3);

let wall4 = wall2.clone();
wall4.position.set(-25,5,-100);
scene.add(wall4);
*/
let socle
let socle1
let socle2
const loaderSocle = new STLLoader();
loaderSocle.load('../../../images/Museum.stl', function ( geometry ) {

    const material = new THREE.MeshStandardMaterial({color: 0x564787, wireframe: false, roughness: 0.5, metalness: 1.0});
    const mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.set( -Math.PI/2, 0, 0 );
    socle = mesh;
    socle.position.set(0, 1, 0);
    socle.castShadow = false;
    socle.receiveShadow = false;
    socle.scale.set(5, 5, 5);
    scene.add(socle);

    socle1 = socle.clone();
    socle1.castShadow = false;
    socle1.receiveShadow = false;
    socle1.position.set(-75,2,-75);
    scene.add(socle1)

    socle2 = socle.clone();
    socle2.castShadow = false;
    socle2.receiveShadow = false;
    socle2.position.set(-75,2,50);
    scene.add(socle2)
} ); 

// Variables pour stocker les tétraminos
let Tetrimino1, Tetrimino2, Tetrimino3, Tetrimino4, Tetrimino5;

// Fonction pour charger un tétramino (réutilisable)
function loadTetrimino(filePath, position, tetriminoVar) {
    const loader = new STLLoader();
    loader.load(filePath, function (geometry) {
        const material = new THREE.MeshStandardMaterial({ color: 0x9AD4D6, wireframe: false, metalness: 1.0, roughness: 0.5});
        const mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.set(-Math.PI / 2, 0, Math.PI / 2); // Rotation commune
        mesh.scale.set(0.2, 0.2, 0.2); // Échelle commune
        mesh.receiveShadow = false;
        mesh.castShadow = false;

        mesh.position.copy(position); // Position spécifique

        tetriminoVar = mesh; // Assigne à la variable globale
        scene.add(mesh); // Ajoute à la scène
    }, undefined, function (error) {
        console.error(`Erreur lors du chargement de ${filePath}:`, error);
    });
}

// Charger les 5 tétraminos avec des positions différentes
loadTetrimino('../../../images/tetris_01.stl', new THREE.Vector3(0, 5, 0), Tetrimino1);
loadTetrimino('../../../images/tetris_02.stl', new THREE.Vector3(1, 7, 2), Tetrimino2); // Décalé sur X
loadTetrimino('../../../images/tetris_03.stl', new THREE.Vector3(-1, 9, 13), Tetrimino3); // Décalé sur X
loadTetrimino('../../../images/tetris_04.stl', new THREE.Vector3(-2, 9, 15), Tetrimino4); // Décalé sur X
loadTetrimino('../../../images/tetris_05.stl', new THREE.Vector3(0, 15, 18), Tetrimino5); // Décalé sur X

let goldFish
const loaderGF = new STLLoader();
loaderGF.load('../../../images/Goldfish.stl', function ( geometry ) {

    const material = new THREE.MeshStandardMaterial({color: 0x564787, wireframe: false, metalness: 1.0, roughness: 0.5});
    const mesh = new THREE.Mesh( geometry, material );

    goldFish = mesh;
    goldFish.receiveShadow = false;
    goldFish.castShadow = false;
    scene.add(goldFish);
    goldFish.position.set(-6,8,-7);
    goldFish.rotation.set(Math.PI/2-1,0,0);
    goldFish.scale.set(0.1,0.1,0.1);
} ); 

let sealy
const loaderS = new STLLoader();
loaderS.load('../../../images/sealy_fixed.stl', function ( geometry ) { 
    const material = new THREE.MeshStandardMaterial({color: 0x9AD4D6, metalness: 1.0, roughness: 0.5, wireframe: false});
    const mesh = new THREE.Mesh( geometry, material );

    sealy = mesh;
    sealy.receiveShadow = false;
    sealy.castShadow = false;
    scene.add(sealy);
    sealy.position.set(-72,5,-88);
    sealy.rotation.set(-Math.PI/2,0,-Math.PI/2-1);
    sealy.scale.set(0.1,0.1,0.1);
} );

let torus;
const loaderTorus = new STLLoader();
loaderTorus.load('../../../images/Torus.stl',function (geometry) {
        geometry.center();
        const material = new THREE.MeshStandardMaterial({color: 0x9AD4D6, metalness: 1.0, roughness: 0.5, wireframe: false});
        const mesh = new THREE.Mesh( geometry, material );

        torus = mesh;
        torus.position.set(-75,10,50);
        torus.scale.set(4,4,4);
        scene.add(torus);
},);


/*
let spaceTexture = new THREE.TextureLoader().load('../../../images/8k_stars_milky_way.jpg');
spaceTexture.mapping = THREE.EquirectangularReflectionMapping;
spaceTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = spaceTexture;*/


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    //ico.rotation.x += 0.05;
    //ico.rotation.y += 1;

    //camera.rotation.y = t * -0.9;
    //camera.position.z = t * -0.2;
    //camera.position.x = t * -0.2;
}

//document.body.onscroll = moveCamera
const keys = {
    z: false,
    s: false,
    q: false,
    d: false
};
// Vitesse de déplacement
const vitesse = 1;
// Événements clavier
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (['z', 'q', 's', 'd'].includes(key)) {
        keys[key] = true;
        event.preventDefault();
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (['z', 'q', 's', 'd'].includes(key)) {
        keys[key] = false;
        event.preventDefault();
    }
});

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0 );
bloomPass.threshold = 0;
bloomPass.strength = 2;
bloomPass.radius = 0;
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
/*
// Réduction de la résolution des post-effects (ajustez le facteur selon vos besoins)
const reductionFactor = 1;  // 0.5 = 50% de la résolution originale
composer.setSize(window.innerWidth * reductionFactor, window.innerHeight * reductionFactor);
// Gestionnaire de redimensionnement pour maintenir le ratio et ajuster la caméra
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth * reductionFactor, window.innerHeight * reductionFactor);
    camera.aspect = window.innerWidth / window.innerHeight;  // Mise à jour de l'aspect ratio
    camera.updateProjectionMatrix();  // Recalcul de la matrice de projection
}); */

let roll = false; 
let phase = 0;

function animate() {
    requestAnimationFrame(animate);
    //console.log('Animate frame #', performance.now());
    //console.log('Animate loop - TWEEN.update appelé');
    tweenGroup.update();
    //console.log('Animate loop - TWEEN.update appelé');

    if (keys.z) {
    camera.position.z -= vitesse; // Avancer (vers -Z)
    }
    if (keys.s) {
        camera.position.z += vitesse; // Reculer (vers +Z)
    }
    if (keys.q) {
        camera.position.x -= vitesse; // Gauche (vers -X)
    }
    if (keys.d) {
        camera.position.x += vitesse; // Droite (vers +X)
    }
    /*if(bloomPass.strength > 2){
        bloomPass.strength = 0;
    }
    bloomPass.strength += 0.1;*/
    pointLight1.position.x = centreX + -65 + rayon*Math.cos(angle);
    pointLight1.position.z = centreZ + -65 + rayon*Math.sin(angle);

    pointLight2.position.x = centreX + -65 + rayon*Math.cos(angle);
    pointLight2.position.z = centreZ + 40 + rayon*Math.sin(angle);

    pointLight3.position.x = centreX + rayon*Math.cos(angle);
    pointLight3.position.z = centreZ + rayon*Math.sin(angle);
    
    angle += speed;
    
    if (torus){
    if (phase == 1){
        if (torus.position.z <= 52){
            if (roll){
            torus.position.z += 0.1;
            }
            else {
                torus.rotation.x += Math.PI/2;
                roll = true;
            }
        }
        else {
            phase = 2;
        }
    }
    if (phase == 2){
        if (torus.position.y >= 10){
            if (roll){
            torus.rotation.x = Math.PI/2;
            roll = false;
            }
            else {
                torus.position.y -= 0.1;
            }
        }
        else {
            phase = 3;
        }
    }
    if (phase == 3){
        if (torus.position.z >= 47) {
            if (roll) {
            torus.position.z -= 0.1;
            }
            else {
                torus.rotation.x += Math.PI/2;
                roll = true;
            }
        }
        else {
            phase = 0;
        }
    }
    if (phase == 0) {
        if (torus.position.y <= 15){
            if (roll) {
            torus.rotation.x += Math.PI/2;
            roll = false;
            }
            else {
                torus.position.y += 0.1;
            }
        }
        else {
            phase = 1;
        }
    }
    }


    controls.update();

    composer.render(scene, camera);
}

animate();


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

    // Nettoyage amélioré
       return () => {
         if (mountRef.current && renderer.domElement) {
           mountRef.current.removeChild(renderer.domElement);
         }
         renderer.dispose();
        if (navBar && document.body.contains(navBar)) {
          document.body.removeChild(navBar);
        }
        tweenGroup.removeAll();
       };
     }, []);

     return (
       <div ref={mountRef} />
     );
   });
   export default Scene;