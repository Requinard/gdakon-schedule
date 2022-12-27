import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { checker } from "vite-plugin-checker";
import Icons from "unplugin-icons/vite";

// https://vitejs.dev/config/
export default defineConfig((env) => ({
    optimizeDeps: {
        exclude: process.env.NODE_ENV === "production" ? ["lodash"] : [],
    },
    plugins: [
        react(),
        Icons({
            compiler: "jsx",
            jsx: "react",
        }),
        checker({
            typescript: true,
            eslint: {
                lintCommand: "eslint ./src",
            },
        }),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
            },
        }),
    ],
}));
