import { Scene, PerspectiveCamera, WebGLRenderer, Clock } from 'three';
import { Box } from './box';
import { createCamera } from './camera';
import { createLight } from './light';
import { cameraMove } from './cameraMove';
import { cameraTrack } from './cameraTrack';

const canvas = document.querySelector(".canvas");
// need a scene
const scene = new Scene();

const cameraOrbitRadius = 5;
// a camera
let camera = createCamera(cameraOrbitRadius);
// and a renderer
const renderer = new WebGLRenderer({ antialias: true, canvas: canvas, alpha: true });
renderer.physicallyCorrectLights = true;

let light = createLight();
scene.add(light);

let cube = new Box();
scene.add(cube);

cameraTrack(camera, cameraOrbitRadius);

const clock = new Clock();

function animate() {
	// get the time the previous frame took
	const delta = clock.getDelta();

	// Ideally we would update this on resize, but as this is an experiment let's just do it every frame
	// calculate new camera aspect ratio
	camera.aspectUpdate(canvas.offsetWidth / canvas.offsetHeight);
	// now let's update the renderer size too,
	// "false" prevents THREE from setting the canvas size in inline css
	renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);

	// only animate if there's a reasonable time between frames
	// if the user switches tab, then delta just keeps rising!
	if (delta < 0.5) {
		cube.tick(delta);
		//cameraMove(camera, delta);
	}

	// renderer needs to be told the scene and the camera to render
	renderer.render(scene, camera);
	// now we've rendered let's request another frame
	requestAnimationFrame(animate);
}

animate();