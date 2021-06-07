import './style.css';
import './realbs.css'
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 44, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('ashar.png');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

const normalTexture = new THREE.TextureLoader().load('normal.jpg');

// Moon
const moonTexture = new THREE.TextureLoader().load('planet1.png');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 27, 27),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);
moon.position.z = 25;
moon.position.setX(-10);




const moonTexture2 = new THREE.TextureLoader().load('planet3.png');
const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 57, 57),
  new THREE.MeshStandardMaterial({
    map: moonTexture2,
    normalMap: normalTexture,
  })
);
scene.add(moon2);
moon2.position.z = 55;
moon2.position.setX(-5);





const moonTexture3 = new THREE.TextureLoader().load('planet4.png');
const moon3 = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 87, 87),
  new THREE.MeshStandardMaterial({
    map: moonTexture3,
    normalMap: normalTexture,
  })
);
scene.add(moon3);
moon3.position.z = 80;
moon3.position.setX(-8);






jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  moon2.rotation.x += 0.05;
  moon2.rotation.y += 0.075;
  moon2.rotation.z += 0.05;

  moon3.rotation.x += 0.05;
  moon3.rotation.y += 0.075;
  moon3.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.02;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.02;

  moon.rotation.x += 0.005;
  moon2.rotation.x += 0.01;
  moon3.rotation.x += 0.02;
  moon3.rotation.z += 0.01;


  jeff.rotation.x += 0.0007;
  jeff.rotation.y += 0.0003;
  jeff.rotation.z += 0.0007;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
