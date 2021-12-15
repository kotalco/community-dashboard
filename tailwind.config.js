module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['nunito', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
