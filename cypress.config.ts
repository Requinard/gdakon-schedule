import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:5173",
        setupNodeEvents(on) {
            on("file:preprocessor", vitePreprocessor());
        },
    },
});
