import { Vector3 } from 'three';

function cameraTrack(camera, radius) {

	// set point for camera to look at every time it moves
	const origin = new Vector3(0, 0, 0);
	// keep track of where we initially placed camera
	const originalPosition = camera.position;


	function orbit(e) {
		// get mouse coordinates
		let mouseX = e.clientX;
		let mouseY = e.clientY;

		// get canvas width and height
		let winX = window.innerWidth;
		let winY = window.innerHeight;

		// convert X and Y mouse coordinates 0,0 is in the center
		// to match three.js coordinates
		mouseX -= (window.innerWidth / 2)
		mouseY -= (window.innerHeight / 2)

		// now divide both by that by the highest it can be
		// to convert it into a decimal percentage equivalent
		// Range is now +-1 for X & Y
		mouseX /= (window.innerWidth / 2)
		mouseY /= (window.innerHeight / 2)

		// const radius = camera.position.z; 	
		const angleRad = 0.8; // max angle either side of origin

		// Parametric equation of a sphere taken from https://dynref.engr.illinois.edu/rvs.html
		// x = r cos(θ) sin(ϕ), y = r sin(θ) sin (ϕ), z = r cos(ϕ)
		// Where θ is angle in XZ plane (horz), and ϕ is angle in YZ plane (vert)
		// but the co-ordinates system needed to be converted to match Three's system
		// so X becomes Z, Y becomes X, and Z becomes Y

		// Rotation on XZ plane, happy with negative numbers
		let theta = mouseX * angleRad;
		// Rotation on YZ plane, not happy with negative numbers
		// 1/4 circle added at the end to bring camera down from 0deg,
		// which would be pointing down at top of subject
		let phi = (mouseY * angleRad) + (Math.PI / 2);

		camera.position.z = radius * Math.cos(theta) * Math.sin(phi);
		camera.position.x = radius * Math.sin(theta) * Math.sin(phi);
		camera.position.y = radius * Math.cos(phi);

		// make camera look at cube
		camera.lookAt(origin);

	}
	// only need to update this if the mouse moves, not on every animation frame
	document.addEventListener('mousemove', orbit);

};


export { cameraTrack };