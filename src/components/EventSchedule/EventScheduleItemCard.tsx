import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
} from "@mui/material";
import { useCallback } from "react";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";
import { useLocalizedEvent } from "../../hooks/useLocalizedEvent";
import { useEventSubtitle } from "../../hooks/useEventSubtitle";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleEventBookmark } from "../../store/bookmarks";

import AddBookmarkIcon from "~icons/mdi/bookmark-outline";
import BookmarkIcon from "~icons/mdi/bookmark";

type EventScheduleItemCardProps = {
    event: NormalizedEventScheduleItem;
};

export const EventScheduleItemCard = ({
    event,
}: EventScheduleItemCardProps) => {
    const dispatch = useAppDispatch();
    const isBookmarked = useAppSelector((state) =>
        state.bookmarks.events.includes(event.id)
    );
    const { name, description, room } = useLocalizedEvent(event);

    const subheader = useEventSubtitle(event, room);

    const toggleBookmark = useCallback(() => {
        dispatch(toggleEventBookmark(event.id));
    }, [dispatch]);

    return (
        <Card>
            <CardHeader
                title={name}
                subheader={subheader}
                action={
                    <IconButton
                        onClick={toggleBookmark}
                        color={isBookmarked ? "warning" : undefined}
                    >
                        {isBookmarked ? <BookmarkIcon /> : <AddBookmarkIcon />}
                    </IconButton>
                }
            />
            <CardContent>
                <Typography>{description}</Typography>
            </CardContent>
        </Card>
    );
};
