import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 1, 2 y 3. ESCENA, CÁMARA Y RENDERIZADOR
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffd9df);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 7. ORBITCONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 6. ILUMINACIÓN
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 8, 5);
dirLight.castShadow = true;
scene.add(dirLight);

// Rejilla de suelo
const gridHelper = new THREE.GridHelper(12, 24, 0x444444, 0x222222);
gridHelper.position.y = -0.5;
scene.add(gridHelper);

const selectableObjects = [];

// 4 y 5. GEOMETRÍAS BÁSICAS Y MATERIALES

// Esfera Rosa
const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.3 });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.set(-2.5, 0.5, 0);
sphere.name = "Esfera Seleccionada";
sphere.castShadow = true;
scene.add(sphere);
selectableObjects.push(sphere);

// Cubo Azul
const boxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
const boxMat = new THREE.MeshStandardMaterial({ color: 0x4ed3ff, roughness: 0.2 });
const box = new THREE.Mesh(boxGeo, boxMat);
box.position.set(0, 0.7, 0);
box.name = "Cubo Seleccionado";
box.castShadow = true;
scene.add(box);
selectableObjects.push(box);

// Plano Marrón (Figura independiente como solicitaste)
const planeGeo = new THREE.PlaneGeometry(2, 2);
const planeMat = new THREE.MeshStandardMaterial({ color: 0xc29b7f, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.position.set(2.5, 0.5, 0);
plane.rotation.x = -Math.PI / 4;
plane.name = "Plano Seleccionado";
plane.castShadow = true;
scene.add(plane);
selectableObjects.push(plane);

// 9. CARGAR MODELO 3D DESDE LA CARPETA local 'models/'
const loader = new GLTFLoader();
loader.load(
    'models/objeto.glb', 
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -0.5, 2);
        model.scale.set(0.5, 0.5, 0.5);
        
        model.traverse((child) => {
            if (child.isMesh) {
                child.name = "Modelo 3D Cargado";
                selectableObjects.push(child);
            }
        });
        
        scene.add(model);
        console.log('Modelo de carpeta models/ cargado correctamente');
    },
    undefined,
    (error) => {
        console.warn('No se encontró un archivo en models/objeto.glb. Asegúrate de colocar tu archivo allí.');
    }
);

// 10 y 11. RAYCASTING E INTERACCIÓN
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');
let selectedObject = null;
let originalColor = new THREE.Color();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(selectableObjects, true);

    if (selectedObject && selectedObject.material && selectedObject.material.color) {
        selectedObject.material.color.copy(originalColor);
    }

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;

        if (selectedObject.material && selectedObject.material.color) {
            originalColor.copy(selectedObject.material.color);
            selectedObject.material.color.setHex(0x55ff55); // Resaltar en verde
        }

        tooltip.style.display = 'block';
        tooltip.style.left = `${event.clientX}px`;
        tooltip.style.top = `${event.clientY}px`;
        tooltip.innerText = selectedObject.name || "Objeto Seleccionado";

        console.log(`Seleccionado: ${selectedObject.name}`);
    } else {
        selectedObject = null;
        tooltip.style.display = 'none';
    }
});

// 8. ANIMACIÓN CON requestAnimationFrame
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.y += 0.005;
    box.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});