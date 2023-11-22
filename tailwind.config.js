/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkblue: '#2b3445'
      },
      boxShadow: {
        '3xl': '0 5px 15px 1px rgba(0, 0, 0, 0.3)'
      },
      textUnderlineOffset: {
        12: '12px'
      },
      backgroundImage: {
        link: "url('/assets/link.png')",
        mario: "url('/assets/mario.png')"
      }
    }
  },
  plugins: []
};
