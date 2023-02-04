/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DARK: '#0c1e11',
					NOTSODARK: '#14321e',
					MEDIUM: '#22c55e',
					NOTSOLIGHT: '#E5F9E8',
					LIGHT: '#C3EFCE',
				},
				secondary: {
					DARK: '#1e0c0c',
					NOTSODARK: '#3e1e1e',
					MEDIUM: '#ff3f34',
					NOTSOLIGHT: '#F9E5E5',
					LIGHT: '#FCE3E3',
				},
			},
		},
	},
	plugins: [],
};
