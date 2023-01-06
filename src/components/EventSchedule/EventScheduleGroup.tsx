import {
    Box,
    Breadcrumbs,
    Divider,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Masonry } from "@mui/lab";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";

import { EventScheduleItemCard } from "./EventScheduleItemCard";

type EventScheduleDayProps = {
    day: string;
    events: NormalizedEventScheduleItem[];
};

export const EventScheduleGroup = ({ day, events }: EventScheduleDayProps) => {
    const theme = useTheme();
    const large = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <>
            <Breadcrumbs
                separator={<Typography variant={"h4"}>{">"}</Typography>}
            >
                <Typography variant={"h4"}>Event Schedule</Typography>
                <Typography variant={"h4"}>{day}</Typography>
            </Breadcrumbs>
            <Box pb={2} pt={1}>
                <Divider />
            </Box>
            <Masonry
                columns={large ? 3 : 1}
                sx={{ width: "100%", margin: 0 }}
                spacing={1}
            >
                {events.map((event) => (
                    <EventScheduleItemCard event={event} key={event.id} />
                ))}
            </Masonry>
        </>
    );
};
