import { Container } from "@mui/material";

import { useGetEventScheduleQuery } from "../../store/gdakon.service";

import { EventFilterProvider } from "./EventFilter.Provider";
import { EventListVirtualized } from "./EventListVirtualized";

export const EventScheduleRoute = () => {
    const { data = [] } = useGetEventScheduleQuery({});
    return (
        <EventFilterProvider events={data}>
            <Container maxWidth={"xl"} sx={{ pt: 4, pb: 4 }}>
                <EventListVirtualized />
            </Container>
        </EventFilterProvider>
    );
};
