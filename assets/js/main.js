
//declaring global variables
let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {

    //reference to the DOM container element for scene
    container = document.querySelector('#scene-container');

    //creating scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8FBCD4);

    //options for perspective camera
    const fov = 35; //range: 1-79; 40-60 for TV; ~90 for computer screen
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 100; //keep as low as possible for high FPS

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 10); //origin: 0,0,0; x (-side to +side), y (-down/+up), z (-far/+near)

    //creating geometry
    const geometry = new THREE.BoxBufferGeometry(2, 2, 2); //'buffer geometry' is loads faster than 'geometry'

    //creating material with a given color
    const material = new THREE.MeshStandardMaterial({ color: 0x800080 });

    //creating mesh
    mesh = new THREE.Mesh(geometry, material);

    //adding mesh to scene
    scene.add(mesh);

    //creating a directional light
    const light = new THREE.DirectionalLight(0xffffff, 5.0);

    //positioning light
    light.position.set(10, 10, 10);

    //adding light to scene
    scene.add(light);

    //creating renderer (WebGLRenderer); set width/height
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    //automatically creates <canvas> element on webpage when loaded by browser
    container.appendChild(renderer.domElement);

    //starting animation loop
    renderer.setAnimationLoop(() => {

        update();
        render();

    });

}

//performing any updates to scene
function update() {

    //increasing rotation of mesh on each frame
    mesh.rotation.z += 0.03;
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

}

//rendering scene
function render() {

    renderer.render(scene, camera);

}

function onWindowResize() {

    //setting aspect ratio to match new browser window aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;

    //updating the camera's frustum
    camera.updateProjectionMatrix();

    //updating the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener('resize', onWindowResize);

//set everything up
init();

