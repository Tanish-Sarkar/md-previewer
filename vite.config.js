import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Markdown Previewer",
        short_name: "MD Preview",
        description: "Offline-first Markdown previewer by Tanish",
        start_url: "/",
        display: "standalone",
        background_color: "#020617",
        theme_color: "#020617",
        icons: [
          {
            src: "/pwa_logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa_logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
