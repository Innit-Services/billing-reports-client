/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        lg:'18px',
        base:'16px', 
        sm: '14px',
      },
    },
  },
  plugins: [],
}
