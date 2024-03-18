/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'origin': ['originTech']
    }
  },
  plugins: [require("daisyui")],
}

