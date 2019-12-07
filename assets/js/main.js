//initial setup
const container = document.querySelector('#scene-container');

//the scene
const scene = new THREE.Scene();

scene.background = new THREE.Color('skyblue');

//the camera (1 unit = 1 meter)
const fov = 35; //range: 1-79; 40-60 for TV; ~90 for computer screen
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; //near clipping plane
const far = 100; //far clipping plane; keep as low as possible for high FPS

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.set(0, 0, 10); //origin: 0,0,0; x (-side to +side), y (-down/+up), z (-far/+near)

//visible objects
const geometry = new THREE.BoxBufferGeometry(2, 2, 2); //'buffer geometry' is loads faster than 'geometry'
const material = new THREE.MeshBasicMaterial();
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


//the renderer
const renderer = new THREE.WebGLRenderer();

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

//render the scene
renderer.render(scene, camera);

