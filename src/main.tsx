import "@fontsource/roboto/latin.css";

import "./i18n";
import "./utilities/dayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "./App";
import { persistor, store } from "./store";
import { LocaleProvider } from "./i18n/LocalizationProvider";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3a3d80",
            dark: "#22244b",
        },
        secondary: {
            light: "#51ff53",
            main: "#1cde1e",
            dark: "#0e6f0f",
        },
    },
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: "xl",
            },
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: "h5",
                },
                subheaderTypographyProps: {
                    variant: "subtitle1",
                },
            },
        },
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 5 * 60 * 1000 /* 5 minutes */ },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <StoreProvider store={store}>
                <ThemeProvider theme={theme}>
                    <LocaleProvider>
                        <CssBaseline />
                        <BrowserRouter>
                            <PersistGate persistor={persistor}>
                                <App />
                            </PersistGate>
                        </BrowserRouter>
                    </LocaleProvider>
                </ThemeProvider>
            </StoreProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
