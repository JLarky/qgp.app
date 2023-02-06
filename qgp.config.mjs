// @ts-check
import react from '@vitejs/plugin-react';
import { defineCommon, defineVite } from 'qgp';
import checker from 'vite-plugin-checker';

export const common = defineCommon({
	vite: {
		build: {},
	},
});

export default defineVite(common, {
	plugins: [
		react(),
		checker({
			typescript: true,
			overlay: { initialIsOpen: false },
		}),
	],
	server: { port: 5173 },
});
