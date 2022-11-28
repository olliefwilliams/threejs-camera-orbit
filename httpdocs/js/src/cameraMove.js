
// pass the camera object you want to mess with
// and the frame delta

let direction = "right";
let logEl = document.getElementById("log");

function cameraMove(camera, delta) {

	let trackSpeed = 1; //metres per second
	let moveTick = trackSpeed * delta;

	if (direction == "right") {
		camera.position.x += moveTick;
		if (camera.position.x >= 2) direction = "left";

	} else if (direction == "left") {
		camera.position.x -= moveTick;
		if (camera.position.x <= -2) direction = "right";
	}

	//logEl.innerText = camera.position.x + direction;

};


export { cameraMove };