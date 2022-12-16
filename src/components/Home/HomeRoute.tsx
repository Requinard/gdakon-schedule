import { useTranslation } from "react-i18next";
import { Container, Grid, Typography } from "@mui/material";

import { CurrentEventCard } from "../EventSchedule/CurrentEvents";
import { UpcomingEventsCard } from "../EventSchedule/UpcomingEvents";

import { BannerHero } from "./BannerHero";

export const HomeRoute = () => {
    const { t } = useTranslation("Home");
    return (
        <>
            <BannerHero>
                <Typography variant={"h3"}>{t("title")}</Typography>
            </BannerHero>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <UpcomingEventsCard />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CurrentEventCard />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
