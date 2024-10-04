/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-10deg)" },
          "75%": { transform: "rotate(10deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        scroll: {
          "0%": { opacity: "1", visibility: "visible", top: "100%" },
          "10%": { top: "0px" },
          "20%": { opacity: "0", visibility: "hidden", top: "-110%" },
          "100%": { opacity: "0", visibility: "hidden", top: "100%" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out infinite",
        scroll: "scroll 6000ms ease 0s infinite normal forwards running",
      },
    },
  },
  plugins: [],
};
