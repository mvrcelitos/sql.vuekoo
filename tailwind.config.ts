import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
   darkMode: ["class"],
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      container: {
         center: true,
         padding: "2rem",
         screens: {
            "2xl": "1400px",
         },
      },
      extend: {
         boxShadow: {
            // "vercel-sm": "0px 1px 1px rgb(0,0,0,.02)",
            // "vercel-md": "0px 4px 8px -4px rgba(0,0,0,.04)",
            // "vercel-lg": "0px 16px 24px -8px rgba(0,0,0,.06)",
            vercel: "0px 1px 1px rgb(0,0,0,.02), 0px 4px 8px -4px rgba(0,0,0,.04), 0px 16px 24px -8px rgba(0,0,0,.06)",
         },
         height: {
            content: "calc(100dvh - var(--header-height))",
         },
         maxHeight: {
            content: "calc(100lvh - var(--header-height)))",
         },
         colors: {
            background: "rgb(var(--background) / <alpha-value>)",
            foreground: "rgb(var(--foreground) / <alpha-value>)",

            accent: "var(--accent)",
            muted: "var(--muted)",
            border: "var(--border)",

            primary: "rgb(var(--primary) / <alpha-value>)",
            primaryActive: "rgb(var(--primaryActive) / <alpha-value>)",
         },
         keyframes: {
            "accordion-down": {
               from: { height: "0" },
               to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
               from: { height: "var(--radix-accordion-content-height)" },
               to: { height: "0" },
            },
         },
         animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
         },
      },
   },
   plugins: [
      require("tailwindcss-animate"),
      plugin(({ addVariant }) => {
         addVariant("group-hocus", [".group:hover > &", ".group:focus-visible > &"]);
         addVariant("hocus", ["&:hover", "&:focus-visible"]);
      }),
      plugin(({ matchUtilities, theme }) => {
         matchUtilities(
            { highlight: (value) => ({ boxShadow: `inset 0 1px 0 0 rgb(255 255 255 / ${value})` }) },
            { values: theme("opacity") },
         );
      }),
   ],
};
export default config;
