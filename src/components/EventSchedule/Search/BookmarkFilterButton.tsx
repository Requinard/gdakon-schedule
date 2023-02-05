import { Button, useTheme } from "@mui/material";

import { useEventFilter } from "../EventFilter.Provider";

import AddBookmarkIcon from "~icons/mdi/bookmark-outline";
import BookmarkIcon from "~icons/mdi/bookmark";

export const BookmarkFilterButton = () => {
    const theme = useTheme();
    const { filters, toggleBookmarked } = useEventFilter();
    return (
        <Button
            onClick={toggleBookmarked}
            sx={{
                color: filters.bookmarked
                    ? theme.palette.warning.main
                    : undefined,
            }}
        >
            {filters.bookmarked ? (
                <BookmarkIcon fontSize={"1.4rem"} />
            ) : (
                <AddBookmarkIcon fontSize={"1.4rem"} />
            )}
        </Button>
    );
};
