import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";

import { gdakonService } from "./gdakon.service";
import { settingsSlice } from "./settings.slice";
import { bookmarkSlice } from "./bookmarks";

const logger = createLogger({});

const reducer = combineReducers({
    [settingsSlice.name]: settingsSlice.reducer,
    [gdakonService.reducerPath]: gdakonService.reducer,
    [bookmarkSlice.name]: bookmarkSlice.reducer,
});

const persistedReducer = persistReducer(
    {
        key: "gdakon-scheduled",
        storage,
        whitelist: [bookmarkSlice.name, settingsSlice.name],
        version: 1,
    },
    reducer
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(gdakonService.middleware, logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
