import { Vector3 } from 'three';

function cameraTrack(camera, delta) {

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

		// remember we just moved the camera back from the origin, so
		// const radius = camera.position.z; 	
		// but instead of redeclaring this variable, let's just hard code it for now
		const radius = 5;
		const angleRad = 1.2; // max angle either side of origin

		// followed from https://andreasrohner.at/posts/Web%20Development/JavaScript/Simple-orbital-camera-controls-for-THREE-js/
		// with further help from 
		// but the co-ordinates system needed to be converted to match Three's system

		// Rotation on XZ plane, happy with negative numbers
		let phi = mouseX * angleRad;
		// Rotation on YZ plane, not happy with negative numbers
		// 1/4 circle added at the end to bring camera down from 0deg,
		// which would be pointing down at top of subject, see https://dynref.engr.illinois.edu/rvs.html
		let theta = (mouseY * (angleRad)) + (Math.PI / 2);

		console.log(`X: ${mouseX}, Y: ${mouseY}, Theta: ${theta}, Phi: ${phi}`);

		camera.position.z = radius * Math.sin(theta) * Math.cos(phi);
		camera.position.x = radius * Math.sin(theta) * Math.sin(phi);
		camera.position.y = radius * Math.cos(theta);
		//console.log(camera.position);

		// make camera look at cube
		camera.lookAt(origin);

	}


	document.addEventListener('mousemove', orbit);



};


export { cameraTrack };