import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';


class Box extends Mesh {
	constructor() {
		const geometry = new BoxGeometry(2, 2, 2);
		const material = new MeshStandardMaterial({
			color: 0x0022cc,
			roughness: 0.7,
			metalness: 0.5,

		});
		super(geometry, material); // invokes the original THREE.mesh constructor

	}
	tick(delta) {
		const radiansPerSecond = (2 * Math.PI) / 8 // one eighth of one full rotation
		// delta is how many fractions of a second the last frame took
		// so if we multiply that by the number of radians per second
		// we get how much to rotate the cube by each frame to hit that rotation rate
		let degreeTick = radiansPerSecond * delta;
		this.rotation.y += degreeTick;

	}
};


export { Box };