import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { darkTheme } from "../src/providers";
import { CssBaseline, ThemeProvider } from "@mui/material";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        expanded: true,
        layout: "fullscreen",

        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        withThemeFromJSXProvider({
            themes: {
                dark: darkTheme,
            },
            defaultTheme: "light",
            Provider: ThemeProvider,
            GlobalStyles: CssBaseline,
        }),
    ],
};

export default preview;
