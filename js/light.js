import { DirectionalLight } from 'three';


function createLight() {
	const light = new DirectionalLight('white', 10);
	// move the light right, up, and towards us
	light.position.set(5, 30, 50);

	return light;
};


export { createLight };