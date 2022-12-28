import { Container } from "@mui/material";

import { useGetEventScheduleQuery } from "../../store/gdakon.service";

import { EventScheduleList } from "./EventScheduleList";
import { EventFilterProvider } from "./EventFilter.Provider";

export const EventScheduleRoute = () => {
    const { data = [] } = useGetEventScheduleQuery({});
    return (
        <EventFilterProvider events={data}>
            <Container maxWidth={"xl"} sx={{ pt: 4 }}>
                <EventScheduleList />
            </Container>
        </EventFilterProvider>
    );
};
