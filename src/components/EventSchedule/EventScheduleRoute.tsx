import { Container } from "@mui/material";

import { useGetEventScheduleQuery } from "../../store/gdakon.service";

import { EventFilterProvider } from "./EventFilter.Provider";
import { EventListVirtualized } from "./EventListVirtualized";

export const EventScheduleRoute = () => {
    const { data = [] } = useGetEventScheduleQuery({});
    return (
        <EventFilterProvider events={data}>
            <Container maxWidth={"xl"} sx={{ pb: 4 }}>
                <EventListVirtualized />
            </Container>
        </EventFilterProvider>
    );
};
