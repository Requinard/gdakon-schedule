import { PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material";

import { darkTheme } from "./themes";

export const AppThemeProvider = ({ children }: PropsWithChildren) => (
    <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
);
