/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,mjs,ts}", "./tests/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
      },
      borderRadius: {
        DEFAULT: "var(--radius-md)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
    },
  },
  plugins: [],
};
