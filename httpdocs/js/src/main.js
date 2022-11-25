import * as THREE from 'three';
import { Box } from './box';

const canvas = document.querySelector(".canvas");
// need a scene
const scene = new THREE.Scene();
// a camera
const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
// and a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
// have to set size, in this case to match the canvas element

let cube = new Box();
scene.add(cube);

// move camera back
camera.position.z = 5;

const clock = new THREE.Clock();

function animate() {
	// get the time the previous frame took
	const delta = clock.getDelta();

	//instead of updating this on resize, let's just do it every frame
	// calculate new camera aspect ratio
	camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
	// gotta manually update the projection matrix now
	camera.updateProjectionMatrix();
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