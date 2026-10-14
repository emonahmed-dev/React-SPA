/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#faf8ff",
        "surface-low": "#f2f3ff",
        "surface-container": "#eaedff",
        "surface-high": "#e2e7ff",
        ink: "#131b2e",
        muted: "#64716e",
        outline: "#bcc9c6",
        primary: "#00685f",
        "primary-container": "#008378",
        "primary-soft": "#e0f5f1",
        secondary: "#0051d5",
        "secondary-soft": "#e8edff",
        tertiary: "#006947",
        "tertiary-soft": "#dcfce7",
        danger: "#ba1a1a",
        "danger-soft": "#ffdad6"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 8px 30px rgba(19, 27, 46, 0.045)"
      }
    }
  },
  plugins: [],
};