// @ts-check
import solid from 'vite-plugin-solid';
import { defineCommon, defineVite } from 'qgp';
import checker from 'vite-plugin-checker';

export const common = defineCommon({
	vite: {
		build: {
			sourcemap: true,
		},
	},
});

export default defineVite(common, {
	plugins: [
		solid(),
		checker({
			typescript: true,
			overlay: { initialIsOpen: false },
		}),
	],
	server: { port: 5173 },
});
