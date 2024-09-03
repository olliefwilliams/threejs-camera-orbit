import { PerspectiveCamera } from 'three';


function createCamera(distFromOrigin) {
	const camera = new PerspectiveCamera(75, 1, 0.1, 1000); // 1 the aspect ratio, we'll update this later
	// move camera back
	camera.position.z = distFromOrigin;

	camera.aspectUpdate = (ratio) => {
		camera.aspect = ratio;
		camera.updateProjectionMatrix(); // have to manually update after adjustment
	}

	return camera;
};


export { createCamera };