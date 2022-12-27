import { ListItem, ListItemText } from "@mui/material";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";
import { useLocalizedEvent } from "../../hooks/useLocalizedEvent";
import { useEventSubtitle } from "../../hooks/useEventSubtitle";

type EventListItemProps = {
    event: NormalizedEventScheduleItem;
};

export const EventListItem = ({ event }: EventListItemProps) => {
    const { name, room } = useLocalizedEvent(event);

    const subtitle = useEventSubtitle(event, room);

    return (
        <ListItem>
            <ListItemText primary={name} secondary={subtitle} />
        </ListItem>
    );
};
