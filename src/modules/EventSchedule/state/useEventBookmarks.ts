import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {enableMapSet} from 'immer'

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
                        draft.bookmarks.delete(id)
                    } else {
                        draft.bookmarks.add(id)
                    }
                })
            })
        ),

)
