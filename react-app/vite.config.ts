import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];
  if (mode === "development") {
    // cast to any to avoid type mismatch when the plugin uses a different vite type copy
    plugins.push(screenGraphPlugin() as unknown as any);
  }

  return {
    plugins,
    publicDir: "./static",
    base: "./",
    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },
  };
});
