/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Brand tokens exposed as Tailwind utilities (bg-primary, text-ink, …).
      // They map onto the CSS variables defined in src/index.css.
      colors: {
        primary: "var(--wt-primary)",
        "primary-strong": "var(--wt-primary-strong)",
        "primary-bg": "var(--wt-primary-bg)",
        ink: "var(--wt-text)",
        "ink-alt": "var(--wt-text-alt)",
        "ink-assistive": "var(--wt-text-assistive)",
        surface: "var(--wt-bg)",
        "surface-alt": "var(--wt-bg-alt)",
        hairline: "var(--wt-border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      maxWidth: {
        site: "1180px",
      },
    },
  },
  plugins: [],
};
