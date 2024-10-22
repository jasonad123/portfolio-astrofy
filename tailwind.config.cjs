/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'logo-green': '#6ebb46',
				'logo-blue': '#00a3da',
				'logo-purple': '#8c41cf',
			},
		},
	},
	plugins: [require("@tailwindcss/typography"),require("daisyui")],
	daisyui: {
		themes: [
		  {
			mytheme: {
			  
	"primary": "#6ebb46",
			  
	"secondary": "#00a3da",
			  
	"accent": "#8c41cf",
			  
	"neutral": "#6ebb46",
			  
	"base-100": "#101010",
			  
	"info": "#00a3da",
			  
	"success": "#6ebb46",
			  
	"warning": "#003d54",
			  
	"error": "#ae1c13",
			  },
			},
		  ],
		},
}
