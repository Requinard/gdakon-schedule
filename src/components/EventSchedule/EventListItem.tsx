import {
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from "@mui/material";

import { useLocalizedEvent } from "../../hooks/useLocalizedEvent";
import { useEventSubtitle } from "../../hooks/useEventSubtitle";
import { useAppSelector } from "../../store";

import BookmarkIcon from "~icons/mdi/bookmark";
import { EventScheduleItemModel } from "~modules/Schedule";

type EventListItemProps = {
    event: EventScheduleItemModel;
};

export const EventListItem = ({ event }: EventListItemProps) => {
    const { name, room } = useLocalizedEvent(event);

    const isBookmarked = useAppSelector((state) =>
        state.bookmarks.events.includes(event.id)
    );

    const subtitle = useEventSubtitle(event, room);

    return (
        <ListItem>
            <ListItemText primary={name} secondary={subtitle} />
            {isBookmarked && (
                <ListItemSecondaryAction>
                    <IconButton color={"warning"}>
                        <BookmarkIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
};
