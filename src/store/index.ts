import {combineReducers, configureStore} from "@reduxjs/toolkit";
import type {TypedUseSelectorHook} from "react-redux";
import {useDispatch, useSelector} from "react-redux";
import {createLogger} from "redux-logger";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore,} from "redux-persist";

import {settingsSlice} from "./settings.slice";
import {bookmarkSlice} from "./bookmarks";

const reducer = combineReducers({
    [settingsSlice.name]: settingsSlice.reducer, [bookmarkSlice.name]: bookmarkSlice.reducer,
});

const persistedReducer = persistReducer({
    key: "gdakon-scheduled", storage, whitelist: [bookmarkSlice.name, settingsSlice.name], version: 1,
}, reducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
