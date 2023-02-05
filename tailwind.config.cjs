/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DARK: '#312C3D',
					NOTSODARK: '#3B4151',
					MEDIUM: '#5BDA5E',
					NOTSOLIGHT: '#C4C9DB',
					LIGHT: '#E8ECF2',
				},
				secondary: {
					DARK: '#1e0c0c',
					NOTSODARK: '#3e1e1e',
					MEDIUM: '#ff3f34',
					NOTSOLIGHT: '#F9E5E5',
					LIGHT: '#FCE3E3',
				},
			},
			// https://tailwindcss.com/docs/typography-plugin#adding-custom-color-themes
			typography: ({ theme }) => ({
				qgp: {
					css: {
						'--tw-prose-body': theme('colors.primary.LIGHT'),
						'--tw-prose-headings': theme('colors.primary.LIGHT'),
						'--tw-prose-bold': theme('colors.primary.LIGHT'),
						'--tw-prose-links': theme('colors.primary.MEDIUM'),
						'--tw-prose-counters': theme('colors.secondary.LIGHT'),
					},
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
