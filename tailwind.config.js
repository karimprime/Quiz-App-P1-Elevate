/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require("@iconify/tailwind");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flyonui/dist/js/*.js",
  ],
  theme: {
    extend: {
      colors: {
        colorNavLink: "#4461F2",
        colorBorderNavLinkActive: "#E0E0E9",
        colorTitle: "#122D9C",
        colorInput: "#F9F9F9",
        colorBorderInput: "#3364FD",
        colorErrorBorderInput: "#F04438",
        colorContinue: "#6C737F",
        colorBorderContinue: "#E7E7E7",
      },
    },
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin"),
    addDynamicIconSelectors(),
  ],
  flyonui: {
    themes: true, // Enable all themes
    base: true, // Apply base styles
    styled: true, // Include FlyonUI colors and design decisions
    utils: true, // Add utility classes
    vendors: true, // Enable vendor-specific CSS (e.g., for Notyf, ApexCharts, etc.)
    logs: true, // Show FlyonUI logs in the console
    themeRoot: ":root", // Apply theme variables to the root element
  },
};
