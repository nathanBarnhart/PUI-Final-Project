
//declaring global variables
let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;

function init() {

    container = document.querySelector('#scene-container');

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8FBCD4);

    createCamera();
    createControls();
    createLights();
    createMeshes();
    createRenderer();

    renderer.setAnimationLoop(() => {

        update();
        render();

    });

}

function createCamera() {

    camera = new THREE.PerspectiveCamera(
        35, // FOV
        container.clientWidth / container.clientHeight, // aspect
        0.1, // near clipping plane
        100, // far clipping plane
    );
    camera.position.set(-5, 5, 7);

}

function createControls() {

    controls = new THREE.OrbitControls(camera, container);

}

function createLights() {

    const ambientLight = new THREE.HemisphereLight(
        0xddeeff, // sky color
        0x202020, // ground color
        5, // intensity
    );

    const mainLight = new THREE.DirectionalLight(0xffffff, 5);
    mainLight.position.set(10, 10, 10);

    scene.add(ambientLight, mainLight);

}

function createMeshes() {

    const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/3/3a/Missing_square_edit.gif');

    // specify renderer color space for textures
    texture.encoding = THREE.sRGBEncoding;
    // enable anisotropic filtering; valid settings: -1, 2, 4, 8, 16
    texture.anisotropy = 16;

    const material = new THREE.MeshStandardMaterial({
        map: texture,
    });

    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

}

function createRenderer() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;

    renderer.physicallyCorrectLights = true;

    container.appendChild(renderer.domElement);

}

//performing any updates to scene
function update() {



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

