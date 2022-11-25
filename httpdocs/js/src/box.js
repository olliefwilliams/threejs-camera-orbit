import * as THREE from 'three';


class Box extends THREE.Mesh {
	constructor() {
		const geometry = new THREE.BoxGeometry(2, 2, 2);
		const material = new THREE.MeshBasicMaterial({ color: 0x000cc });
		super(geometry, material); // invokes the original THREE.mesh constructor

	}
	tick(delta) {
		const radiansPerSecond = (2 * Math.PI) / 4 // one quarter of one full rotation
		// delta is how many fractions of a second the last frame took
		// so if we multiply that by the number of radians per second
		// we get how much to rotate the cube by each frame to hit that rotation rate
		let degreeTick = radiansPerSecond * delta;
		this.rotation.y += degreeTick;

	}
};


export { Box };