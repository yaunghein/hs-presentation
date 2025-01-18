import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Satoshi', 'sans-serif']
		},
		extend: {}
	},

	plugins: [typography]
};
