import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { checker } from "vite-plugin-checker";
import Icons from "unplugin-icons/vite";
import html from "vite-plugin-html-config";
import { imagetools } from "vite-imagetools";

//@ts-expect-error but its on?
import PackageJSON from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        exclude: process.env.NODE_ENV === "production" ? ["lodash-es"] : [],
    },
    define: {
        APP_NAME: JSON.stringify(PackageJSON.name),
        APP_VERSION: JSON.stringify(PackageJSON.version),
    },
    plugins: [
        react(),
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
        Icons({
            compiler: "jsx",
            jsx: "react",
            defaultStyle: "width=24px;height=24px;",
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
});
