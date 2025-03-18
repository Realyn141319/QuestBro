/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 主要品牌色系
        primary: {
          50: "#eef9ff",
          100: "#dcf2ff",
          200: "#b3e5ff",
          300: "#5ccaff",
          400: "#36b4ff",
          500: "#0099ff", // 主色調
          600: "#007acc",
          700: "#0062a3",
          800: "#004d80",
          900: "#003a66",
        },
        // 輔助色系 - 遊戲化元素
        quest: {
          50: "#f0f9ff",
          100: "#e0f1fe",
          200: "#bae3fd",
          300: "#7dcffc",
          400: "#36b9f8",
          500: "#0ca2eb", // 任務
          600: "#0288d1",
          700: "#016aa3",
          800: "#065986",
          900: "#0a4a70",
        },
        achievement: {
          50: "#f9f7ff",
          100: "#f1eefe",
          200: "#e4ddfe",
          300: "#d0c2fc",
          400: "#b49ef8",
          500: "#9d7af3", // 成就
          600: "#7c52e6",
          700: "#6a40cf",
          800: "#5935a9",
          900: "#472b89",
        },
        reward: {
          50: "#fef8ee",
          100: "#fdedd3",
          200: "#fad7a5",
          300: "#f7be6d",
          400: "#f5a742",
          500: "#f18c20", // 獎勵
          600: "#e06912",
          700: "#ba4a11",
          800: "#983b15",
          900: "#7c3214",
        },
        danger: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444", // 危險、刪除
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        // 介面色系
        surface: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Noto Sans TC", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        game: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(66, 153, 225, 0.5)",
        achievement:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(157, 122, 243, 0.5)",
        reward:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(241, 140, 32, 0.5)",
      },
    },
  },
  plugins: [],
};
