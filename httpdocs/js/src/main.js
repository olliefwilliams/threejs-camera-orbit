import { Scene, PerspectiveCamera, WebGLRenderer, Clock } from 'three';
import { Box } from './box';
import { createCamera } from './camera';
import { cameraMove } from './cameraMove';

const canvas = document.querySelector(".canvas");
// need a scene
const scene = new Scene();
// a camera
let camera = createCamera();
// and a renderer
const renderer = new WebGLRenderer({ antialias: true, canvas: canvas });
// have to set size, in this case to match the canvas element

let cube = new Box();
scene.add(cube);

const clock = new Clock();

function animate() {
	// get the time the previous frame took
	const delta = clock.getDelta();

	//instead of updating this on resize, let's just do it every frame
	// calculate new camera aspect ratio
	camera.aspectUpdate(canvas.offsetWidth / canvas.offsetHeight);
	// now let's update the renderer size too,
	// "false" prevents THREE from setting the canvas size in inline css
	renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);

	cube.tick(delta);

	// renderer needs to be told the scene and the camera to render
	renderer.render(scene, camera);
	// now we've rendered let's request another frame
	requestAnimationFrame(animate);
}

animate();