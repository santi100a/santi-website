import THREE from '/lib/threejs/three.js';
import OrbitControls from '/lib/threejs/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00
});
const torus1 = new THREE.Mesh(geometry, material);
const torus2 = new THREE.Mesh(
    new THREE.TorusGeometry(20, 3, 16, 100),
    new THREE.MeshStandardMaterial({
        color: 0x0000ff
    })
);
const torus3 = new THREE.Mesh(
    new THREE.TorusGeometry(20, 3, 16, 100),
    new THREE.MeshStandardMaterial({
        color: 0xff0000
    })
);
scene.add(torus1);
scene.add(torus2);
scene.add(torus3);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const gridHelper = new THREE.GridHelper(200, 200);
scene.add(gridHelper);
const controls = new OrbitControls(camera, renderer.domElement);
function addStar() {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = new Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);
scene.background = new THREE.TextureLoader().load('assets\\space.jpg');
const santi = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets\\santi.jpg') })
);
scene.add(santi);
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('assets\\moon.jpg'),
        normalMap: new THREE.TextureLoader().load('assets\\normal.jpg')
    })
);
scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
    santi.rotation.y += 0.01;
    santi.rotation.z += 0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
    camera.position.z = t * -0.01;
    
}
document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);
    torus1.rotation.x += 0.01;
    torus1.rotation.y += 0.005;
    torus1.rotation.z += 0.01;
    torus2.rotation.x -= 0.01;
    torus2.rotation.y -= 0.005;
    torus2.rotation.z -= 0.01;
    controls.update();
    renderer.render(scene, camera);
}
animate();
