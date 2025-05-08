const canvas = document.getElementById("render-view");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.set(0, 10, 30);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0xdddddd })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Menelaion-like structure (simple temple style)
function createMenelaion() {
  const group = new THREE.Group();

  // Base
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(20, 1, 10),
    new THREE.MeshStandardMaterial({ color: 0xc2b280 })
  );
  base.position.y = 0.5;
  group.add(base);

  // Pillars
  const pillarGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 16);
  const pillarMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const positions = [-8, -4, 0, 4, 8];
  positions.forEach((x) => {
    const frontPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    frontPillar.position.set(x, 3.5, -4.5);
    group.add(frontPillar);

    const backPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    backPillar.position.set(x, 3.5, 4.5);
    group.add(backPillar);
  });

  // Roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(11, 4, 4),
    new THREE.MeshStandardMaterial({ color: 0x999999 })
  );
  roof.rotation.y = Math.PI / 4;
  roof.position.y = 8;
  group.add(roof);

  return group;
}

const menelaion = createMenelaion();
scene.add(menelaion);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  menelaion.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
