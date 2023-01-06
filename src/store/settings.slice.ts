import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type SettingsSliceState = {
    timetravel: {
        amount: number;
        enabled: boolean;
    };
};
export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        timetravel: {
            amount: 0,
            enabled: false,
        },
    } as SettingsSliceState,
    reducers: {
        toggleTimeTravel: (state, action: PayloadAction<boolean>) => {
            state.timetravel.enabled = action.payload;
        },
        setTimeTravelAmount: (state, action: PayloadAction<number>) => {
            state.timetravel.amount = action.payload;
        },
    },
});

export const { toggleTimeTravel, setTimeTravelAmount } = settingsSlice.actions;
