import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import Icons from "unplugin-icons/vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
    plugins: [
        react(),
        imagetools(),
        Icons({
            compiler: "jsx",
            jsx: "react",
            defaultClass: "iconified",
        }),
    ],
    test: {
        globals: true,
        passWithNoTests: true,
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"],
    },
});
