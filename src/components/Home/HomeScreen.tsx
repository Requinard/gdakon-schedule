import { Box, Container, Grid, styled } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { useMove } from "@use-gesture/react";
import { CSSProperties } from "react";

import { OverviewCard } from "../EventSchedule/OverviewCard";

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

const calcOuterX = calcX(150);
const calcOuterY = calcY(100);

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
    const [{ x, y, outerX, outerY, scale }, api] = useSpring(() => ({
        x: 0,
        y: 0,
        scale: 1,
        outerX: 0,
        outerY: 0,
        config: { mass: 3, tension: 350, friction: 80 },
    }));

    const bind = useMove(
        (params) =>
            api.start({
                outerX: calcOuterX(params.xy[1], y.get()),
                outerY: calcOuterY(params.xy[0], x.get()),
                scale: 1.1,
            }),
        { mouseOnly: true }
    );

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
                {...bind()}
                style={{
                    rotateX: outerX,
                    rotateY: outerY,
                    transform: "perspective(600px)",
                    scale: scale,
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: 1,
                    height: "100%",
                    display: "flex",
                    touchAction: "none",
                }}
            >
                <img
                    src={"https://gdakon.org/Images/Convention/bg.webp"}
                    alt={"A spooky scary background image"}
                    height={"100%"}
                    width={"100%"}
                    style={imageStyle}
                />
                <Container maxWidth={"xl"}>
                    <HomeGrid container spacing={2}>
                        <Grid item xs={12} md={7}>
                            <img
                                alt={"A spooky version of the Gdakon logo"}
                                src={logoUrl}
                                width={"100%"}
                                height={"auto"}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <OverviewCard />
                        </Grid>
                    </HomeGrid>
                </Container>
            </animated.div>
        </Box>
    );
};
