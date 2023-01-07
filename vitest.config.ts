import { defineConfig } from "vitest/config";
import { mergeConfig } from "vite";

import ViteConfig from "./vite.config";

export default mergeConfig(
    ViteConfig,
    defineConfig({
        test: {
            passWithNoTests: true,
            environment: "jsdom",
        },
    })
);
