
//declaring global variables
let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {

    container = document.querySelector('#scene-container');

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8FBCD4);

    createCamera();
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

    camera.position.set(0, 0, 10);

}

function createLights() {

    // Create a directional light
    const light = new THREE.DirectionalLight(0xffffff, 3.0);

    // move the light back and up a bit
    light.position.set(10, 10, 10);

    // remember to add the light to the scene
    scene.add(light);

}

function createMeshes() {

    const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/3/3a/Missing_square_edit.gif');

    texture.encoding = THREE.sRGBEncoding;
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

    container.appendChild(renderer.domElement);

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

