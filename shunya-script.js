// Real 3D Logo using Three.js
let scene, camera, renderer, textMesh, textMesh2;
let mouseX = 0, mouseY = 0;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000080);

    // Create camera with better positioning
    const canvas = document.getElementById('threejs-canvas');
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
    camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000080, 1.0);

    // Add elegant lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(2, 3, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-1, 1, -1);
    scene.add(fillLight);

    // Create 3D text
    createText();

    // Add mouse interaction
    document.addEventListener('mousemove', onMouseMove);

    // Add window resize handling
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

function onWindowResize() {
    const canvas = document.getElementById('threejs-canvas');
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the doughnut
    if (textMesh) {
        textMesh.rotation.x += 0.005;
        textMesh.rotation.y += 0.01;

        // Add subtle mouse interaction
        textMesh.rotation.x += mouseY * 0.001;
        textMesh.rotation.y += mouseX * 0.001;
    }

    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    init();
});

function loadCustomTorus() {
    console.log('Starting to load custom torus...');
    // Create procedural torus geometry
    createTorus();
}

function createTorus() {
    console.log('Creating procedural torus...');

    // Create Torus geometry with good resolution
    const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);

    // Create materials with better visual properties
    const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x111111,
        shininess: 100,
        transparent: false,
        wireframe: false
    });

    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.castShadow = true;
    torusMesh.receiveShadow = true;

    // Scale and position properly
    torusMesh.scale.set(2, 2, 2);
    torusMesh.position.set(0, 0, 0);

    scene.add(torusMesh);

    // Store references for animation
    textMesh = torusMesh;

    console.log('Procedural torus created successfully!');
    return torusMesh;
}

// Torus parametric function (not used with THREE.TorusGeometry, but kept for reference)
function torusFunction(u, v, target) {
    u = u * Math.PI * 2; // 0 to 2π
    v = v * Math.PI * 2; // 0 to 2π

    // Standard torus parametric equations
    const R = 1; // major radius
    const r = 0.4; // minor radius
    const x = (R + r * Math.cos(v)) * Math.cos(u);
    const y = (R + r * Math.cos(v)) * Math.sin(u);
    const z = r * Math.sin(v);

    target.set(x, y, z);
}

function createText() {
    loadCustomTorus();
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}


function createAsciiTorus() {
    const asciiContainer = document.createElement('div');
    asciiContainer.id = 'ascii-torus';
    asciiContainer.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Courier New', monospace;
        font-size: 16px;
        line-height: 1;
        color: #ffffff;
        text-align: center;
        z-index: 1000;
        pointer-events: none;
        white-space: pre;
    `;

    document.body.appendChild(asciiContainer);

    // ASCII art patterns that change over time
    const patterns = [
        [
            "        ╭─────────╮",
            "       ╱           ╲",
            "      ╱             ╲",
            "     ╱               ╲",
            "    ╱                 ╲",
            "   ╱                   ╲",
            "  ╱                     ╲",
            " ╱                       ╲",
            "╱                         ╲",
            "╲                         ╱",
            " ╲                       ╱",
            "  ╲                     ╱",
            "   ╲                   ╱",
            "    ╲                 ╱",
            "     ╲               ╱",
            "      ╲             ╱",
            "       ╲           ╱",
            "        ╰─────────╯"
        ],
        [
            "        ╭─────────╮",
            "       ╱           ╲",
            "      ╱             ╲",
            "     ╱               ╲",
            "    ╱                 ╲",
            "   ╱                   ╲",
            "  ╱                     ╲",
            " ╱                       ╲",
            "╱                         ╲",
            "╲                         ╱",
            " ╲                       ╱",
            "  ╲                     ╱",
            "   ╲                   ╱",
            "    ╲                 ╱",
            "     ╲               ╱",
            "      ╲             ╱",
            "       ╲           ╱",
            "        ╰─────────╯"
        ]
    ];
    let currentPattern = 0;

    function updateAscii() {
        asciiContainer.textContent = patterns[currentPattern].join('\n');
        currentPattern = (currentPattern + 1) % patterns.length;
    }

    // Update every 500ms
    updateAscii();
    setInterval(updateAscii, 500);
}

// ASCII overlay disabled
// document.addEventListener('DOMContentLoaded', createAsciiTorus);
