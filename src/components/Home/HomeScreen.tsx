import { Box, Container, Grid, Paper, styled, Typography } from "@mui/material";

import { UpcomingEventsCard } from "../EventSchedule/UpcomingEvents";
import { CurrentEventCard } from "../EventSchedule/CurrentEvents";

const HomeContainer = styled(Box)({
    backgroundImage: "url(https://gdakon.org/Images/Convention/bg.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "95vh",
    marginTop: "-32px",
    display: "flex",
});

const HomeGrid = styled(Grid)({
    flex: 1,
    flexGrow: 1,
});

export const HomeScreen = () => (
    <HomeContainer>
        <Container>
            <HomeGrid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        variant={"h3"}
                        sx={{ p: 2, bgcolor: "background.default" }}
                    >
                        Gdakon 2023
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <UpcomingEventsCard />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CurrentEventCard />
                </Grid>
            </HomeGrid>
        </Container>
    </HomeContainer>
);
