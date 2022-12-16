import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { EventSchedulePerDay } from "./EventSchedulePerDay";

export const EventScheduleRoute = () => {
    const { t } = useTranslation("EventSchedule");
    return (
        <Container>
            <EventSchedulePerDay />
        </Container>
    );
};
