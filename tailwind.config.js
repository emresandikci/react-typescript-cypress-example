const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: '300px',
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px',
        desktopL: '1440px',
        desktopXL: '1980px',
        '4k': '2560px',
      },
      zIndex: {
        scroller: '100',
        dropdown: '200',
        modal: '1000',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.shadow-bb': {
          'box-shadow': '0px 4px 12px rgba(29, 29, 32, 0.08)',
        },
        '.shadow-bb-l': {
          'box-shadow': '-4px 0px 5px 0px rgba(29, 29, 32, 0.08)',
        },
        '.shadow-bb-r': {
          'box-shadow': '4px 0px 5px 0px rgba(29, 29, 32, 0.08)',
        },
        '.shadow-bb-t': {
          'box-shadow': '1px -2px 4px 0px rgba(29, 29, 32, 0.08)',
        },
        '.shadow-bb-b': {
          'box-shadow': '2px 4px 5px 0px  rgba(29, 29, 32, 0.08)',
        },
      });
    }),
  ],
};
