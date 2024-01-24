import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {enableMapSet} from 'immer'
import {createJSONStorage, persist} from "zustand/middleware/persist";

export type EventBookmarkState = {
    bookmarks: Set<string>;
    toggleBookmark: (id: string) => void
}

enableMapSet()
export const useEventBookmarks = create<EventBookmarkState, [ ['zustand/immer', EventBookmarkState]]>(
        immer(
            (setState) => ({
                bookmarks: new Set(),
                toggleBookmark: id => setState(draft => {
                    if (draft.bookmarks.has(id)) {
                        console.debug("removing")
                        draft.bookmarks.delete(id)
                    } else {
                        console.debug("adding")
                        draft.bookmarks.add(id)
                    }
                })
            })
        ),

)
