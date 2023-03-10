import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { checker } from "vite-plugin-checker";
import Icons from "unplugin-icons/vite";
import html from "vite-plugin-html-config";
import { imagetools } from "vite-imagetools";
import { visualizer } from "rollup-plugin-visualizer";

//@ts-expect-error but it's on?
import PackageJSON from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        exclude: process.env.NODE_ENV === "production" ? ["lodash"] : [],
    },
    define: {
        APP_NAME: JSON.stringify(PackageJSON.name),
        APP_VERSION: JSON.stringify(PackageJSON.version),
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    mui: ["@mui/material", "@mui/lab", "@mui/x-date-pickers"],
                    react: ["react", "react-dom", "react-router-dom"],
                    lodash: ["lodash"],
                },
            },
        },
    },
    plugins: [
        react(),
        visualizer({
            filename: "./dist/size.html",
        }),
        Icons({
            compiler: "jsx",
            jsx: "react",
            defaultClass: "iconified",
        }),
        checker({
            typescript: true,
            eslint: {
                lintCommand: "eslint ./src",
            },
        }),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Gdakon Pocket Schedule",
                short_name: "Gdakon",
                description: "Check the Gdakon schedule from your phone!",
                lang: "en",
                theme_color: "#3a3d80",
                icons: [
                    {
                        src: "https://gdakon.org/favicon.ico",
                        sizes: "16x16",
                        type: "image/icon",
                    },
                ],
            },
            workbox: {
                globPatterns: [
                    "**/*.{js,css,html,ico,png,svg,json,webp,woff,woff2,ico}",
                ],
                cleanupOutdatedCaches: true,
                sourcemap: true,
            },
        }),
        imagetools(),
        html({
            title: "Gdakon Pocket Schedule",
            metas: [
                {
                    name: "theme-color",
                    value: "#3a3d80",
                },
                {
                    name: "color-scheme",
                    value: "dark",
                },
                { name: "author", value: "Gdakon, Requinard" },
                {
                    name: "description",
                    value: "A nice and dandy pocket schedule",
                },
            ],
        }),
    ],
});
