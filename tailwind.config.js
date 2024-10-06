/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // 'custom-dark-blue': '#324264',
      },
      // fontFamily: {
      //   inter: ['inter', 'sans-serif'],
      // },
      fontSize: {
        lg:'18px',
        base:'16px', 
        sm: '14px',
      },
    },
  },
  plugins: [],
}
