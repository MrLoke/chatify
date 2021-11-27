module.exports = {
  enabled: true,
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
        blue: {
          500: '#5865f2',
          800: '#4752c4',
        },
        green: {
          500: '#10B981',
        },
        red: {
          500: '#EF4444',
        },
      },
    },
  },
  variants: {
    extend: {
      borderStyle: ['hover', 'focus'],
    },
  },
  plugins: [],
}
