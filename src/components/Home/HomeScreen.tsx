import { Box, Container, Grid, Stack, styled } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "react-use-gesture";
import { CSSProperties, useEffect, useRef } from "react";

import { UpcomingEventsCard } from "../EventSchedule/UpcomingEvents";
import { CurrentEventCard } from "../EventSchedule/CurrentEvents";

import logoUrl from "./gdakon-20230-logo.png";

const HomeGrid = styled(Grid)({
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    overflow: "hidden",
});

const calcX = (factor: number) => (y: number, ly: number) =>
    -(y - ly - window.innerHeight / 2) / factor;

const calcY = (factor: number) => (x: number, lx: number) =>
    (x - lx - window.innerWidth / 2) / factor;

const calcOuterX = calcX(1000);
const calcOuterY = calcY(1000);

const imageStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
    objectFit: "cover",
    width: "100%",
    height: "100%",
    filter: "blur(6px)",
};
export const HomeScreen = () => {
    const [{ x, y, outerX, outerY }, api] = useSpring(() => ({
        x: 0,
        y: 0,
        outerX: 0,
        outerY: 0,
        config: { mass: 3, tension: 350, friction: 80 },
    }));

    const domTarget = useRef(null);

    useGesture(
        {
            onMove: ({ xy: [px, py] }) =>
                api({
                    outerX: calcOuterX(py, y.get()),
                    outerY: calcOuterY(px, x.get()),
                }),
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
        <Box
            display={"flex"}
            height={"100%"}
            flexDirection={"column"}
            flex={1}
            overflow={"hidden"}
            alignItems={"stretch"}
        >
            <animated.div
                ref={domTarget}
                style={{
                    transform: "perspective(600px)",
                    rotateX: outerX,
                    rotateY: outerY,
                    scale: 1.05,
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: 1,
                    height: "100%",
                    display: "flex",
                }}
            >
                <img
                    src={"https://gdakon.org/Images/Convention/bg.webp"}
                    height={"100%"}
                    width={"100%"}
                    style={imageStyle}
                />
                <Container maxWidth={"xl"}>
                    <HomeGrid container spacing={2}>
                        <Grid item xs={12} md={7}>
                            <img src={logoUrl} width={"100%"} height={"auto"} />
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
        </Box>
    );
};
