// Scene
const scene = new THREE.Scene()

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'red' })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Sizes
const sizes = {
  width: 800,
  height: 600
}

// Camera
const ratio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, ratio)
camera.position.z = 3
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)