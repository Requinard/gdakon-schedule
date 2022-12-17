import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/gdakon-schedule/",
    optimizeDeps: {
        exclude: ["lodash"],
    },
    plugins: [
        react(),
        eslintPlugin({}),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
            },
        }),
    ],
});
