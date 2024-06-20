/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors: {},
      fontSize: {
        "36size": "36px",
        "34size": "34px",
        "32size": "32px",
        "30size": "30px",
        "28size": "28px",
        "26size": "26px",
        "24size": "24px",
        "22size": "22px",
        "20size": "20px",
        "18size": "18px",
        "16size": "16px",
        "14size": "14px",
        "12size": "12px",
        "10size": "10px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
