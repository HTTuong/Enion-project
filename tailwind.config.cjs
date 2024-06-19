/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      },
      textColor: {
        "default": "#303030",

      },
      backgroundColor: {
        "light-green": "#24CF94"
      },
      borderColor: {

      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
