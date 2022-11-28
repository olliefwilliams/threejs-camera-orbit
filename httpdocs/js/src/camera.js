import { PerspectiveCamera } from 'three';


function createCamera() {
	const camera = new PerspectiveCamera(75, 1, 0.1, 1000); // 1 is dummy data as we set this later
	// move camera back
	camera.position.z = 4;

	camera.aspectUpdate = (ratio) => {
		camera.aspect = ratio;
		camera.updateProjectionMatrix(); // have to manually update after adjustment
	}

	return camera;
};


export { createCamera };