import { Container } from "@mui/material";

import { useGetEventScheduleQuery } from "../../store/gdakon.service";

import { EventScheduleList } from "./EventScheduleList";
import { EventFilterProvider } from "./EventFilter.Provider";
import { EventFilters } from "./EventFilters";

export const EventScheduleRoute = () => {
    const { data = [] } = useGetEventScheduleQuery({});
    return (
        <EventFilterProvider events={data}>
            <Container>
                <EventFilters />
                <EventScheduleList />
            </Container>
        </EventFilterProvider>
    );
};
