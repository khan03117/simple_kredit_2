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
        'primary': '#e73c3e',
        'secondary': '#0d1820',
        'danger' : "#FF5733"
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #e73c3e 0%, #e73c3e 100%)',
      },
    },
  },
  plugins: [],
})

