import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "camping-image": "url('/assets/camping.webp')"
      },
      colors: {
        //color
        white: '#FFFFFF',
        // Chatwards colors
        primary: {
          50: '#ecf0ff',
          100: '#dde3ff',
          200: '#c2cbff',
          300: '#9ca8ff',
          400: '#7579ff',
          500: '#635BFF',
          600: '#4d36f5',
          700: '#422ad8',
          800: '#3625ae',
          900: '#2f2689',
        },
        secondary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#7B92DF',
          500: '#60A5FA',
          600: '#3B82F6',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        neutral: {
          50: '#F4F5F7',
          100: '#E3E6EA',
          200: '#C9CED8',
          300: '#A4ACBC',
          400: '#778299',
          500: '#5C677E',
          600: '#4F576B',
          700: '#44495A',
          800: '#414552',
          900: '#363843',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },

        // Utility colors
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
        },
        warning: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
        },
        info: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        urduNastaliq: ["Noto Nastaliq Urdu", "serif"],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
