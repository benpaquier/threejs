import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

// variables
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const baseHouseDimensions = {
    width: 8,
    depth: 10,
    height: 4
}

const aspectRatio = sizes.width / sizes.height
const canvas = document.querySelector('.webgl')


// scene
const scene = new THREE.Scene()

// Grid helper
const size = 12
const divisions = 12

const gridHelper = new THREE.GridHelper(size, divisions)
scene.add(gridHelper)

// camera
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 100)
camera.position.set(7, 10, 10)
// camera.position.set(33, 7, 0)
scene.add(camera)

// debugger
const gui = new dat.GUI()

const guiFolders = {
    camera: gui.addFolder('Camera'),
    roof: gui.addFolder('Roof')
}

guiFolders.camera
    .add(camera.position, 'x')
    .min(0)
    .max(100)
    .name('Camera X')

guiFolders.camera
    .add(camera.position, 'y')
    .min(0)
    .max(100)
    .name('Camera Y')

guiFolders.camera
    .add(camera.position, 'z')
    .min(0)
    .max(100)
    .name('Camera Z')

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const controls = new OrbitControls(camera, canvas)
controls.update()

// house
const house = new THREE.Group()
house.position.y = 2

const baseGeometry = new THREE.BoxGeometry(baseHouseDimensions.width, baseHouseDimensions.height, baseHouseDimensions.depth)
const baseMaterial = new THREE.MeshBasicMaterial({
    color: 0xbb6d4a
})
const base = new THREE.Mesh(baseGeometry, baseMaterial)
house.add(base)
scene.add(house)

gui
    .add(base.geometry.parameters, 'width')

const roof = new THREE.Group()
const panel1Geometry = new THREE.PlaneGeometry(10, 10)
const panel1Material = new THREE.MeshBasicMaterial({
    color: 'brown',
    side: THREE.DoubleSide
})

const panel1 = new THREE.Mesh(panel1Geometry, panel1Material)
panel1.position.y = 2
roof.add(panel1)
house.add(roof)

const panel1Folder = guiFolders.roof.addFolder('panel1')
panel1Folder
    .add(panel1.geometry.parameters, 'width')
    .min(0)
    .max(baseHouseDimensions.depth)
    .name('panel1')

panel1Folder
    .add(panel1.geometry.parameters, 'height')
    .min(0)
    .max(10)
    .name('panel1')

panel1Folder
    .add(panel1.rotation, 'x')
    .min(0)
    .max(10)
    .name('panel1X')

panel1Folder
    .add(panel1.rotation, 'y')
    .min(0)
    .max(10)
    .name('panel1Y')


camera.lookAt(base.position)

// animate
const gameLoop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(gameLoop)
}

gameLoop()