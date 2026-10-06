import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { fileURLToPath } from "node:url";

export default defineConfig({
  // Относительная база работает и на GitHub Pages /vershina40/, и на собственном домене.
  base: "./",
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: fileURLToPath(new URL("./src/prerender.tsx", import.meta.url)),
    }),
  ],
});
