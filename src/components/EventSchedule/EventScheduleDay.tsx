import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import { Masonry } from "@mui/lab";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";

import { EventScheduleItemCard } from "./EventScheduleItemCard";

type EventScheduleDayProps = {
    day: string;
    events: NormalizedEventScheduleItem[];
};

export const EventScheduleDay = ({ day, events }: EventScheduleDayProps) => {
    const large = useMediaQuery((theme) => theme.breakpoints.up("md"));
    return (
        <>
            <Typography variant={"h4"} paragraph>
                {day}
            </Typography>
            <Box pb={2}>
                <Divider />
            </Box>
            <Masonry columns={large ? 3 : 1} spacing={2}>
                {events.map((event) => (
                    <EventScheduleItemCard event={event} key={event.id} />
                ))}
            </Masonry>
        </>
    );
};
