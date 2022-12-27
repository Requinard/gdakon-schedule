import {
    Alert,
    Box,
    Card,
    CardContent,
    List,
    ListSubheader,
    Typography,
} from "@mui/material";
import React from "react";

import { useCurrentEvents } from "../../hooks/useCurrentEvents";
import { useUpcomingEvents } from "../../hooks/useUpcomingEvents";

import { EventListItem } from "./EventListItem";
import { EventList } from "./EventList";

import ScheduleIcon from "~icons/ic/sharp-schedule?width=1.9em&height=1.9em";

export const OverviewCard = () => {
    const current = useCurrentEvents();
    const upcoming = useUpcomingEvents();
    return (
        <Card>
            <CardContent>
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                >
                    <Box
                        display={"flex"}
                        width={50}
                        height={50}
                        mr={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <ScheduleIcon />
                    </Box>
                    <Box display={"flex"} flex={1}>
                        <Typography variant={"h4"}>Up Next</Typography>
                    </Box>
                </Box>
            </CardContent>
            <List>
                <ListSubheader>Current Events</ListSubheader>
                <EventList
                    events={current}
                    emptyComponent={
                        <Alert severity={"info"}>
                            There are no events taking place right now
                        </Alert>
                    }
                />
                <ListSubheader>Up next</ListSubheader>
                <EventList
                    events={upcoming}
                    emptyComponent={
                        <Alert severity={"info"}>
                            There are no events starting soon
                        </Alert>
                    }
                />
            </List>
        </Card>
    );
};
