// declaring global variables
let container; // HTML element to hold scene
let camera; // view into the scene
let controls; // essential Threejs
let renderer; // takes camera and scene; outputs rendering to <canvas>
let scene; // holds all elements

const mixers = []; // updates the model as the animation progresses / looping over an array
const clock = new THREE.Clock(); // to accurately control the timing of animations

// primary function setting up calls on all other functions
function init() {

    container = document.querySelector('#scene-container');

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8FBCD4);

    createCamera();
    createControls();
    createLights();
    createMeshes();
    // loadModels();
    createRenderer();

    renderer.setAnimationLoop(() => {

        update();
        render();

    });

}

function createCamera() {

    camera = new THREE.PerspectiveCamera(
        35, // field of view
        container.clientWidth / container.clientHeight, // aspect ratio
        1, // near clipping plane
        100, // far clipping plane
    );
    camera.position.set(-5, 5, 7);

}

function createControls() {

    controls = new THREE.OrbitControls(camera, container); // allows vistor to orbit scene

}

function createLights() {

    const ambientLight = new THREE.HemisphereLight( // global illumination
        0xddeeff, // sky color
        0x0f0e0d, // ground color
        5, // intensity
    );

    const mainLight = new THREE.DirectionalLight(0xffffff, 5); // accent lighting
    mainLight.position.set(10, 10, 10);

    scene.add(ambientLight, mainLight);

}

function createMeshes() {

    const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

    const textureLoader = new THREE.TextureLoader();

    // add texture map
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

// function loadModels() { // loads an external model

//     const loader = new THREE.GLTFLoader();

//     // sets up models; positions
//     const onLoad = (gltf, position) => {

//         const model = gltf.scene.children[0];
//         model.position.copy(position);

//         const animation = gltf.animations[0];

//         const mixer = new THREE.AnimationMixer(model);
//         mixers.push(mixer);

//         const action = mixer.clipAction(animation);
//         action.play();

//         scene.add(model);

//     }

//     // loader reports loading progress
//     const onProgress = () => { };

//     // loader sends any error messages here; logged to console
//     const onError = (errorMessage) => { console.log(errorMessage); };

//     // load an external model (asynchronous)
//     const modelPosition = new THREE.Vector3(0, 0, 2);
//     loader.load(/* 'location of .glb' ,*/ gltf => onLoad(gltf, modelPosition), onProgress, onError);

// }

function createRenderer() {

    // creates a WebGLRenderer and set its width and height
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setPixelRatio(window.devicePixelRatio);

    // sets the gamma correction
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;

    renderer.physicallyCorrectLights = true;

    container.appendChild(renderer.domElement);

}

function update() {

    const delta = clock.getDelta();

    for (const mixer of mixers) {

        mixer.update(delta);

    }

}

function render() {

    renderer.render(scene, camera);

}

function onWindowResize() {

    //setting aspect ratio to match new browser window aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    //updating the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener('resize', onWindowResize);

init();
