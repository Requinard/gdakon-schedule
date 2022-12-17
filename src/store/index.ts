import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { createLogger } from "redux-logger";

import { gdakonService } from "./gdakon.service";
import { settingsSlice } from "./settings.slice";

const logger = createLogger({});
export const store = configureStore({
    reducer: {
        [settingsSlice.name]: settingsSlice.reducer,
        [gdakonService.reducerPath]: gdakonService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gdakonService.middleware, logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
