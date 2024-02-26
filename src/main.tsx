import "@fontsource/roboto/latin.css";
import "./utilities/dayjs";

import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { LocaleProvider } from "./i18n";
import { App } from "./App";
import { persistor, store } from "./store";

import { AppQueryClientProvider, AppThemeProvider } from "~providers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AppQueryClientProvider>
            <StoreProvider store={store}>
                <AppThemeProvider>
                    <LocaleProvider>
                        <CssBaseline />
                        <BrowserRouter>
                            <PersistGate persistor={persistor}>
                                <App />
                            </PersistGate>
                        </BrowserRouter>
                    </LocaleProvider>
                </AppThemeProvider>
            </StoreProvider>
        </AppQueryClientProvider>
    </React.StrictMode>
);
