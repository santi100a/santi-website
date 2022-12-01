import './index.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas: HTMLCanvasElement = document.querySelector('canvas#bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00
});
const torus = new THREE.Mesh(geometry, material);
const ambientLight = new THREE.AmbientLight(0xffffff);
const gridHelper = new THREE.GridHelper(200, 200);
const controls = new OrbitControls(camera, renderer.domElement);
const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpg');
const santi = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/santi.jpg') })
);
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('./assets/moon.jpg'),
        normalMap: new THREE.TextureLoader().load('./assets/normal.jpg')
    })
);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);
scene.add(torus, ambientLight, gridHelper);
scene.background = spaceTexture;
Array<void>(200).fill(null).forEach(addStar);
scene.add(santi, moon);
moon.position.setZ( 30);
moon.position.setX(-10);
document.body.onscroll = moveCamera;

function addStar() {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = new Array(3).fill(null).map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
function moveCamera() {
    const { top } = document.body.getBoundingClientRect();
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
    santi.rotation.y += 0.01;
    santi.rotation.z += 0.01;
    camera.position.x = top * -0.0002;
    camera.position.y = top * -0.0002;
    camera.position.z = top * -0.01;
    
}
function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x +=  0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z +=  0.01;
    controls.update();
    renderer.render(scene, camera);
}

animate();