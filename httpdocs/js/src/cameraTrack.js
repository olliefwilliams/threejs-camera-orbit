import { Vector3 } from 'three';

function cameraTrack(camera, delta) {

	// set point for camera to look at every time it moves
	const origin = new Vector3(0, 0, 0);
	// keep track of where we initially placed camera
	const originalPosition = camera.position;

	document.addEventListener('mousemove', (e) => {
		// get mouse coordinates
		let mouseX = e.clientX;
		let mouseY = e.clientY;

		// get canvas width and height
		let winX = window.innerWidth;
		let winY = window.innerHeight;

		// convert mouse coordinates 0,0 is in the center
		// to match three.js coordinates
		mouseX -= (window.innerWidth / 2)
		mouseY -= (window.innerHeight / 2)

		// now divide that by the highest it can be
		// to convert it into a decimal percentage equivalent
		// Range is now +-1 for X & Y
		mouseX /= (window.innerWidth / 2)
		mouseY /= (window.innerHeight / 2)

		/*
		// moves the camera up and down

		// set factor to move the camera by
		let cameraFactor = 2;
		camera.position.x = cameraFactor * mouseX;
		camera.position.y = (cameraFactor * mouseY) * -1; // invert movement
		*/


		// Let's move the camera left to right AROUND the cube
		// instead of just panning in a straight line

		/*
		Parametric equation of a circle is
		x = r * cos(a)
		y = r * sin(a)
		Where r is the radius, and a the angle in radians
		*/

		// remember we just moved the camera back from the origin, so
		// const radius = camera.position.z; 	
		// but instead of redeclaring this variable, let's just hard code it for now
		const radius = 5;
		const angleRad = 1.2; // max angle either side of origin

		//camera.position.x = (radius * Math.sin(angleRad * mouseX));
		//camera.position.z = (radius * Math.cos(angleRad * mouseX));

		// diffrent attempt:
		// followed from https://andreasrohner.at/posts/Web%20Development/JavaScript/Simple-orbital-camera-controls-for-THREE-js/
		// but the co-ordinates system needed to be converted to work as they do not match Three's sytem
		// Convert the X and Y coordinates into angles in the XZ and YZ plane
		// theta = atan2(z, x), where x and z are the coordinates of the point in the XZ plane
		// phi = atan2(z, y), where y and z are the coordinates of the point in the YZ plane
		// Z will always be 5, as that's how far away from the origin we moved the camera
		let z = radius;
		// multiply the mouse value by 5 to give a reasonable range
		let theta = Math.atan2(radius, (mouseY * 5));
		let phi = Math.atan2(radius, (mouseX * 5));
		phi -= 33; // no idea why this is the correct number

		console.log(`Angle theta: ${theta}, Phi: ${phi}`);

		camera.position.z = radius * Math.sin(theta) * Math.cos(phi);
		camera.position.x = radius * Math.sin(theta) * Math.sin(phi);
		camera.position.y = radius * Math.cos(theta);


		// make camera look at cube
		camera.lookAt(origin);

	})



};


export { cameraTrack };