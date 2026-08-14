const config = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          soft: "var(--accent-soft)",
        },
        border: "var(--border)",
        ring: "var(--ring)",
        canvas: "var(--background)",
        ink: "var(--ink)",
        sand: "var(--sand)",
        line: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-instrument)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.125rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1.0625rem", { lineHeight: "1.7" }],
        lg: ["1.125rem", { lineHeight: "1.75" }],
        xl: ["1.25rem", { lineHeight: "1.7" }],
        "2xl": ["1.5rem", { lineHeight: "1.35" }],
        "3xl": ["1.875rem", { lineHeight: "1.25" }],
        "4xl": ["2.25rem", { lineHeight: "1.2" }],
        "5xl": ["3rem", { lineHeight: "1.12" }],
        "6xl": ["3.75rem", { lineHeight: "1.08" }],
        "7xl": ["4.5rem", { lineHeight: "1.04" }],
      },
      maxWidth: {
        content: "78rem",
      },
      borderRadius: {
        card: "0.5rem",
      },
      boxShadow: {
        warm: "0 20px 50px -24px rgb(23 20 18 / 0.22), 0 8px 16px -8px rgb(23 20 18 / 0.08)",
        "warm-sm": "0 10px 28px -18px rgb(23 20 18 / 0.14), 0 4px 12px -6px rgb(23 20 18 / 0.06)",
        "warm-lg": "0 32px 72px -32px rgb(23 20 18 / 0.28), 0 12px 24px -12px rgb(23 20 18 / 0.12)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      spacing: {
        section: "5.5rem",
        "section-md": "8rem",
        "section-lg": "10rem",
        gutter: "1.25rem",
      },
    },
  },
};

export default config;
