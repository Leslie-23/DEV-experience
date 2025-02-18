import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TailwindCSSVitePlugin } from "tailwindcss-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //  TailwindCSSVitePlugin(),
  ],
  base: "/",
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
});
