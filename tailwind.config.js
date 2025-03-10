/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'colorNavLink': '#4461F2',
        'colorBorderNavLinkActive': '#E0E0E9',
        'colorTitle': '#122D9C',
        'colorInput': '#F9F9F9',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
