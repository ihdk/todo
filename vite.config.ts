import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginFaviconsInject("./src/assets/logo.svg"),
    react(),
    eslint(),
  ],
});
