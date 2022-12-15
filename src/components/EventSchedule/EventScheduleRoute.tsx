import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const EventScheduleRoute = () => {
    const { t } = useTranslation("EventSchedule");
    return (
        <Container>
            <Typography variant={"h1"}>{t("title")}</Typography>
        </Container>
    );
};
