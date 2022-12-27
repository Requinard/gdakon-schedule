import { Card, CardContent, CardHeader, Typography } from "@mui/material";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";
import { useLocalizedEvent } from "../../hooks/useLocalizedEvent";
import { useEventSubtitle } from "../../hooks/useEventSubtitle";

type EventScheduleItemCardProps = {
    event: NormalizedEventScheduleItem;
};

export const EventScheduleItemCard = ({
    event,
}: EventScheduleItemCardProps) => {
    const { name, description, room } = useLocalizedEvent(event);

    const subheader = useEventSubtitle(event, room);

    return (
        <Card>
            <CardHeader title={name} subheader={subheader} />
            <CardContent>
                <Typography>{description}</Typography>
            </CardContent>
        </Card>
    );
};
