import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		sourcemap: true,
		rollupOptions: {
			// https://rollupjs.org/configuration-options/
		},
	},
	css: {
		devSourcemap: true,
	},

})