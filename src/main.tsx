import "@fontsource/roboto/latin.css";

import "./i18n";
import "./utilities/dayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "./App";
import { persistor, store } from "./store";
import { LocaleProvider } from "./i18n/LocalizationProvider";

import { AppThemeProvider } from "~providers";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 5 * 60 * 1000 /* 5 minutes */ },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    </React.StrictMode>
);
