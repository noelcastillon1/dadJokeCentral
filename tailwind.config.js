/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro"],
  },
}
