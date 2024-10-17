/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 4s infinite linear",
        menu_show: "slide_in 0.1s",
        opaque_show: `opaque 0.2s`,
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slide_in: {
          "100%": { transform: "translateY(0%)" },
          "0%": { transform: "translateY(-100%)" },
        },
        opaque: {
          "100%": { opacity: "1" },
          "0%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
