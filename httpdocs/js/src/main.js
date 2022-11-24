import * as THREE from 'three';


const canvas = document.querySelector(".canvas");
// need a scene
const scene = new THREE.Scene();
// a camera
const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
// and a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
// have to set size, in this case to match the canvas element



const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x000cc });
const cube = new THREE.Mesh(geometry, material);
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

	const radiansPerSecond = (2 * Math.PI) / 4 // one quarter of one full rotation

	// delta is how many fractions of a second the last frame took
	// so if we multiply that by the number of radians per second
	// we get how much to rotate the cube by each frame to hit that rotation rate
	let degreeTick = radiansPerSecond * delta;
	cube.rotation.y += degreeTick;


	// renderer needs to be told the scene and the camera to render
	renderer.render(scene, camera);
	// now we've rendered let's request another frame
	requestAnimationFrame(animate);
}

animate();