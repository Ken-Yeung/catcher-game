/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'watermark': `url('${process.env.REACT_APP_API_ORIGIN}/assets/bg2.png')`,
        'game': `url('${process.env.REACT_APP_API_ORIGIN}/assets/bg1.png')`,
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

