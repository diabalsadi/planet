import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// container for holding all the objects
const scene = new Three.Scene()
// angle, aspect ratio
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new Three.WebGLRenderer({
  canvas: document.getElementById('bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

const geometry = new Three.TorusGeometry(13, 0.1, 2, 30)
const material = new Three.MeshBasicMaterial({
  color: 0xffdea7,
  wireframe: false
})
const torus = new Three.Mesh(geometry, material)
scene.add(torus)

// const gridHelper = new Three.GridHelper(window.innerWidth, 50)
// gridHelper.material.color.set(0x444444);
// scene.add(gridHelper)

function addStar() {
  const geometry = new Three.SphereGeometry(0.25, 10, 24)
  const material = new Three.MeshBasicMaterial({
    color: 0xffffff
  })
  const star = new Three.Mesh(geometry, material)
  const [x, y, z] = Array(3)
    .fill()
    .map(() => Three.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)
}

Array(1000).fill().forEach(addStar)


// for background
const spaceTexture = new Three.TextureLoader().load('space.jpeg')
scene.background = spaceTexture

// this callback is for loading images
const moonTexture = new Three.TextureLoader().load(
  'moon.jpg',
  loadingData => loadingImage(loadingData),
  progressData => progressingImage(progressData),
  errorData => onErrorImage(errorData)
)
const abnormalSurface = new Three.TextureLoader().load('normal.jpg')

const moon = new Three.Mesh(
  new Three.SphereGeometry(2, 32, 32),
  new Three.MeshStandardMaterial({
    map: moonTexture,
    normalMap: abnormalSurface
  })
)

moonTexture.repeat.set(1, 1)
moon.scale.set(2, 2, 2)
scene.add(moon)
const directionalLight = new Three.DirectionalLight(0xffffff, 5)
const ambientLight = new Three.AmbientLight(0xffffff, 0.5)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight, ambientLight)

function animate() {
  requestAnimationFrame(animate)
  controls.zoomSpeed = 20
  renderer.render(scene, camera)
  torus.rotation.x += 0.05
  torus.rotation.y += 0.07
  torus.rotation.z += 0.03
  moon.rotateX(90 * 0.005)
}

function moveCamera() {
  const positionUser = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.05
  moon.rotation.z += 0.075

  camera.position.z = positionUser * -0.05
  if (!positionUser) camera.position.z = 30
}

function loadingImage(loadedTexture) {
  console.log('Moon texture loaded successfully!')
  moon.material.map = loadedTexture
  moon.material.needsUpdate = true
}

function progressingImage(data) {
  console.log('In progress ...', data)
}

function onErrorImage(data) {
  console.log('Error !!', data)
}

// Update camera and renderer size on window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

document.addEventListener('touchmove', moveCamera);


document.body.onscroll = moveCamera

const controls = new OrbitControls(camera, renderer.domElement)
scene.add(controls)

animate()
