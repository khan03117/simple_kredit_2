/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        'primary': '#004D6E',
        'secondary': '#0d1820',
        'danger' : "#FF5733"
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #004D6E 0%, #00ACCC 100%)',
      },
    },
  },
  plugins: [],
})

