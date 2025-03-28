/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Pretendard', 'system-ui', 'sans-serif'],
    },
    extend: {
        colors: {
            primary: 'text-sky-400',
            secondary: 'text-gray-100',
        },
    },
  },
  plugins: [],
}
