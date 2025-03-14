/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/flyonui/dist/js/*.js'
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'colorNavLink': '#4461F2',
        'colorBorderNavLinkActive': '#E0E0E9',
        'colorTitle': '#122D9C',
        'colorInput': '#F9F9F9',
        'colorContinue': '#6C737F',
        'colorBorderContinue': '#E7E7E7',
      },
    },
  },
  plugins: [
    require('flyonui'),
    require('flyonui/plugin')
  ],

  flyonui: {
    themes: true, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "soft"]
    darkTheme: "corporate", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include FlyonUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    vendors: false, // default is false when true add customize css for apexChart, editor.js, flatpickr, fullcalendar, notyf, raty-js
    logs: true, // Shows info about FlyonUI version and used config in the console when building your CSS
    themeRoot: ":root" // The element that receives theme color CSS variables
  }
}

