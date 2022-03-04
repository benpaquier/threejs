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
camera.position.set(8, 12, 25)
// camera.position.set(33, 7, 0)
scene.add(camera)

// debugger
const gui = new dat.GUI({
    width: 400
})

const guiFolders = {
    camera: gui.addFolder('Camera'),
    roof: gui.addFolder('Roof'),
    door: gui.addFolder('Door')
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
const panelLenght = Math.sqrt(Math.pow(baseHouseDimensions.width / 2, 2) + Math.pow(baseHouseDimensions.width / 2, 2))
const panel1Geometry = new THREE.PlaneGeometry(panelLenght, baseHouseDimensions.depth)
const panel1Material = new THREE.MeshBasicMaterial({
    color: 'brown',
    side: THREE.DoubleSide
})

const panel1 = new THREE.Mesh(panel1Geometry, panel1Material)
const panel2 = new THREE.Mesh(panel1Geometry, panel1Material)
panel1.position.set(-2, 4, 0)
panel1.rotation.set(Math.PI / 2, Math.PI / 4, 0)
roof.add(panel1)

panel2.position.set(2, 4, 0)
panel2.rotation.set(Math.PI / 2, -(Math.PI / 4), 0)
roof.add(panel2)


const frontPanelPositions = new Float32Array([
    -4, 2, 5,
    4, 2, 5,
    0, 6, 5
])

const frontPanelAttribute = new THREE.BufferAttribute(frontPanelPositions, 3)
const frontPanelPosition = new THREE.BufferGeometry()
frontPanelPosition.setAttribute('position', frontPanelAttribute)
const material = new THREE.MeshBasicMaterial({
    color: "green",
    side: THREE.DoubleSide
})
const frontPanel = new THREE.Mesh(frontPanelPosition, material)
roof.add(frontPanel)

const backPanelPositions = new Float32Array([
    -4, 2, -5,
    4, 2, -5,
    0, 6, -5
])

const backPanelAttribute = new THREE.BufferAttribute(backPanelPositions, 3)
const backPanelPosition = new THREE.BufferGeometry()
backPanelPosition.setAttribute('position', backPanelAttribute)
const backPanel = new THREE.Mesh(backPanelPosition, material)
roof.add(backPanel)
house.add(roof)

const doorGeometry = new THREE.PlaneGeometry(1.2, 2)
const doorMaterial = new THREE.MeshBasicMaterial({
    color: 'red'
})
const door = new THREE.Mesh(doorGeometry, doorMaterial)
door.position.set(0, -1, 5.01)
house.add(door)

guiFolders.door
    .add(door.scale, 'x')
    .min(0.5)
    .max(3)
    .step(0.1)
    .name("Door width")

guiFolders.door
    .add(door.scale, 'y')
    .min(0.5)
    .max(3)
    .step(0.1)
    .name("Door height")


const cylindreGeometry = new THREE.CylinderGeometry(0.1, 0.1, baseHouseDimensions.depth, 32)
const cylindreMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' })
const cylindre = new THREE.Mesh(cylindreGeometry, cylindreMaterial)
cylindre.position.set(0, 6, 0)
cylindre.rotation.x = Math.PI / 2
house.add(cylindre)

const chemneyGeometry = new THREE.BoxGeometry(0.5, 2.5, 0.5) 
const chemneyMaterial = new THREE.MeshBasicMaterial({ color: 'blue' })
const chemney = new THREE.Mesh(chemneyGeometry, chemneyMaterial)
chemney.position.set(2, 4, 4)
house.add(chemney)


guiFolders.roof
    .add(panel1.scale, 'x')
    .min(0)
    .max(baseHouseDimensions.depth)
    .step(0.1)
    .name('panel1 width')

guiFolders.roof
    .add(panel1.scale, 'y')
    .min(0)
    .max(baseHouseDimensions.depth)
    .step(0.1)
    .name('panel1 height')

guiFolders.roof
    .add(panel1.rotation, 'x')
    .min(0)
    .max(baseHouseDimensions.depth)
    .step(0.1)
    .name('panel1 rotation x')

guiFolders.roof
    .add(panel1.rotation, 'y')
    .min(0)
    .max(baseHouseDimensions.depth)
    .step(0.1)
    .name('panel1 rotation y')

guiFolders.roof
    .add(panel1.rotation, 'z')
    .min(0)
    .max(baseHouseDimensions.depth)
    .step(0.1)
    .name('panel1 rotation z')

guiFolders.roof
    .add(panel1.position, 'x')
    .min(-baseHouseDimensions.depth)
    .max(baseHouseDimensions.depth)
    .step(0.1)
    .name('panel1 position x')

guiFolders.roof
    .add(panel1.position, 'y')
    .min(-baseHouseDimensions.depth)
    .max(baseHouseDimensions.depth)
    .step(0.1)
    .name('panel1 position y')

guiFolders.roof
    .add(panel1.position, 'z')
    .min(-baseHouseDimensions.depth)
    .max(baseHouseDimensions.depth)
    .step(0.1)
    .name('panel1 position z')

// const helper = new THREE.PlaneHelper( panel1Geometry, 1, 0xffff00 );
// scene.add(helper)

camera.lookAt(base.position)

// animate
const gameLoop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(gameLoop)
}

gameLoop()