import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { EventScheduleList } from "./EventScheduleList";

export const EventScheduleRoute = () => {
    const { t } = useTranslation("EventSchedule");
    return (
        <Container>
            <EventScheduleList />
        </Container>
    );
};
