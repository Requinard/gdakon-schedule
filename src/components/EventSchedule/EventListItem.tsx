import { ListItem, ListItemText } from "@mui/material";

import { EventScheduleItem } from "../../store/gdakon.types";

type EventListItemProps = {
    event: EventScheduleItem;
};

export const EventListItem = ({ event }: EventListItemProps) => (
    <ListItem>
        <ListItemText primary={event.name} />
    </ListItem>
);
