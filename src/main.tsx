import "@fontsource/roboto/latin.css";

import "./i18n";

import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { HashRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { App } from "./App";
import { persistor, store } from "./store";

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
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HashRouter>
                    <PersistGate persistor={persistor}>
                        <App />
                    </PersistGate>
                </HashRouter>
            </ThemeProvider>
        </StoreProvider>
    </React.StrictMode>
);
