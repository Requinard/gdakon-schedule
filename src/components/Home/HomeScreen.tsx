import { Container, Grid, Stack, styled, Typography } from "@mui/material";
import { animated, to, useSpring } from "@react-spring/web";
import { useGesture } from "react-use-gesture";
import { useEffect, useRef } from "react";

import { UpcomingEventsCard } from "../EventSchedule/UpcomingEvents";
import { CurrentEventCard } from "../EventSchedule/CurrentEvents";

const HomeGrid = styled(Grid)({
    flex: 1,
    flexGrow: 1,
});

const calcX = (y: number, ly: number) =>
    -(y - ly - window.innerHeight / 2) / 750;
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 750;

export const HomeScreen = () => {
    const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
        () => ({
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1.01,
            zoom: 0,
            x: 0,
            y: 0,
            config: { mass: 5, tension: 350, friction: 40 },
        })
    );

    const domTarget = useRef(null);

    useGesture(
        {
            onMove: ({ xy: [px, py], dragging }) =>
                !dragging &&
                api({
                    rotateX: calcX(py, y.get()),
                    rotateY: calcY(px, x.get()),
                }),
            onHover: ({ hovering }) =>
                !hovering && api({ rotateX: 0, rotateY: 0 }),
        },
        { domTarget, eventOptions: { passive: false } }
    );

    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();
        document.addEventListener("gesturestart", preventDefault);
        document.addEventListener("gesturechange", preventDefault);

        return () => {
            document.removeEventListener("gesturestart", preventDefault);
            document.removeEventListener("gesturechange", preventDefault);
        };
    }, []);

    return (
        <animated.div
            ref={domTarget}
            style={{
                transform: "perspective(600px)",
                x,
                y,
                scale: to([scale, zoom], (s, z) => s + z),
                rotateX,
                rotateY,
                rotateZ,
                flexDirection: "column",
                justifyContent: "center",
                height: "95vh",
                marginTop: "-32px",
                display: "flex",
                overflowX: "hidden",
                overflowY: "hidden",
            }}
        >
            <img
                src={"https://gdakon.org/Images/Convention/bg.webp"}
                height={"100%"}
                width={"100%`"}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    zIndex: -1,
                    width: "100%",
                    height: "100%",
                    filter: "blur(6px)",
                }}
            />
            <Container maxWidth={"xl"}>
                <HomeGrid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Typography variant={"h1"} sx={{ p: 2 }}>
                            Gdakon 2023
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Stack spacing={2}>
                            <UpcomingEventsCard />
                            <CurrentEventCard />
                        </Stack>
                    </Grid>
                </HomeGrid>
            </Container>
        </animated.div>
    );
};
