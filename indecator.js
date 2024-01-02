import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new Three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls)
// Scroll Progress Indicator
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
    progressText.innerText = `${Math.round(scrollPercentage)}%`;

    if (scrollPercentage < 30) {
        progressBar.classList.add('red');
    } else {
        progressBar.classList.remove('red');
    }
});

// Camera Position
camera.position.z = 5;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Render Scene
    renderer.render(scene, camera);
}

animate();