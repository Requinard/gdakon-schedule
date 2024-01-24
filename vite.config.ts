import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { checker } from "vite-plugin-checker";
import Icons from "unplugin-icons/vite";
import html from "vite-plugin-html-config";
import { imagetools } from "vite-imagetools";
import AutoImport from "unplugin-auto-import/vite";
import * as path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
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
    plugins: [
        AutoImport({
            imports: ["react", { imports: ["z"], from: "zod" }, "ahooks", {
                imports: ['Box', 'Stack', 'Container', 'Typography', 'Card', 'CardHeader', 'CardContent', 'Collapse', "List", "ListItem", "ListItemText", 'ListItemButton', "Button", "IconButton", "ButtonGroup", "Divider"], from: '@mui/material'
            }],
            dts: "./src/auto-import.d.ts",
        }),
        react(),
        tsconfigPaths(),
        Icons({
            compiler: "jsx",
            jsx: "react",
            defaultClass: "iconified",
        }),
        checker({
            typescript: true,
        }),
        imagetools(),
    ],
    resolve: {
        alias: [
            {find: "@/utilities", replacement: path.resolve(__dirname, "src/utilities")},
            {find: "@/modules", replacement: path.resolve(__dirname, "src/modules")}
        ]
    }
});
