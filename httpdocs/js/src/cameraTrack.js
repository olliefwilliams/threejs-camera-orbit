function cameraTrack(camera, delta) {

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
		mouseX /= (window.innerWidth / 2)
		mouseY /= (window.innerHeight / 2)


		// set factor to move the camera by
		let cameraFactor = 0.5;

		camera.position.x = cameraFactor * mouseX;
		camera.position.y = (cameraFactor * mouseY) * -1; // invert movement

	})



};


export { cameraTrack };