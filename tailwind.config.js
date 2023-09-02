/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        primary: '#5542F6',
        highligth:'#eae8fb',
        bgGray:'#e2e2e2'
      }, 
    },
  },
  plugins: [],
}
