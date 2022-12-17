import { Container } from "@mui/material";

import { EventScheduleList } from "./EventScheduleList";

export const EventScheduleRoute = () => {
    return (
        <Container sx={{ pt: 4 }}>
            <EventScheduleList />
        </Container>
    );
};
