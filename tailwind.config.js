/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      primary: {
        200: "#A8A4FF",
        400: "#635FC7",
      },
      secondary: {
        200: "#FF9898",
        400: "#EA5555",
      },
      neutral: {
        950: "#000112",
        900: "#20212C",
        800: "#2B2C37",
        700: "#3E3F4E",
        400: "#828FA3",
        200: "#E4EBFA",
        150: "#F4F7FD",
        100: "#FFFFFF",
      },
    },
    fontSize: {
      xl: "1.5rem",
      l: "1.125rem",
      m: "0.9375rem",
      s: "0.75rem",
    },
    fontWeight: {
      bold: "700",
      medium: "500",
    },
    lineHeight: {
      xl: "1.875rem",
      l: "1.4375rem",
      m: "1.1875rem",
      s: "0.9375rem",
    },
    extend: {},
  },
  plugins: [],
};
