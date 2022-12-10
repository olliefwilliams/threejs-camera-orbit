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

		// convert X mouse coordinates 0,0 is in the center
		// to match three.js coordinates
		mouseX -= (window.innerWidth / 2)
		//mouseY -= (window.innerHeight / 2)

		// now divide both by that by the highest it can be
		// to convert it into a decimal percentage equivalent
		// Range is now +-1 for X & 0–1 for Y
		mouseX /= (window.innerWidth / 2)
		mouseY /= (window.innerHeight)

		// remember we just moved the camera back from the origin, so
		// const radius = camera.position.z; 	
		// but instead of redeclaring this variable, let's just hard code it for now
		const radius = 5;
		const angleRad = 1.2; // max angle either side of origin

		// followed from https://andreasrohner.at/posts/Web%20Development/JavaScript/Simple-orbital-camera-controls-for-THREE-js/
		// with further help from https://dynref.engr.illinois.edu/rvs.html
		// but the co-ordinates system needed to be converted to work as they do not match Three's system
		// Z will always be 5, as that's how far away from the origin we moved the camera
		let z = radius;
		let theta = mouseY * (angleRad + (Math.PI / 2)); // +1/4 circle as 0deg is looking at the top of the cube
		let phi = mouseX * angleRad;

		//console.log(`X: ${mouseX}, Y: ${mouseY}, Theta: ${theta}, Phi: ${phi}`);

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