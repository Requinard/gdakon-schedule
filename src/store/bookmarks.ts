import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type BookmarkState = {
    events: string[];
};
export const bookmarkSlice = createSlice({
    name: "bookmarks",
    initialState: {
        events: [],
    } as BookmarkState,
    reducers: {
        toggleEventBookmark: (state, action: PayloadAction<string>) => {
            if (state.events.includes(action.payload)) {
                state.events = state.events.filter(
                    (it) => it !== action.payload
                );
            } else {
                state.events.push(action.payload);
            }
        },
    },
});

export const { toggleEventBookmark } = bookmarkSlice.actions;
