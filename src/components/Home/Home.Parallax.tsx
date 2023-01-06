import { animated, useSpring } from "@react-spring/web";
import { Box, Grid, styled } from "@mui/material";
import { useWindowSize } from "usehooks-ts";
import { useMemo } from "react";

import { Logo } from "../images/Logo";
import { BackgroundBanner } from "../images/BackgroundBanner";
import { OverviewCard } from "../EventSchedule/OverviewCard";

const AnimatedPage = styled(animated.div)({
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
});

export const HomeParallax = () => {
    const { width, height } = useWindowSize();
    const [{ xy }, set] = useSpring(() => ({
        xy: [0, 0],
        config: { mass: 10, tension: 550, friction: 140 },
    }));

    const { calc, background, foreground } = useMemo(
        () => ({
            calc: (x: number, y: number) => [x - width / 2, y - height / 2],
            background: (x: number, y: number) =>
                `translate3d(${x / 20}px,${y / 120}px,0)`,
            foreground: (x: number, y: number) =>
                `translate3d(${x / 16}px,${y / 70}px,0)`,
        }),
        [width, height]
    );

    return (
        <Box
            width={"100%"}
            height={"100%"}
            position={"relative"}
            overflow={"hidden"}
            onMouseMove={({ clientX: x, clientY: y }) =>
                set({ xy: calc(x, y) })
            }
        >
            <AnimatedPage
                style={{
                    transform: xy.to(background),
                    scale: 1.05,
                }}
            >
                <Box height={"100%"}>
                    <BackgroundBanner />
                </Box>
            </AnimatedPage>
            <AnimatedPage style={{ transform: xy.to(foreground) }}>
                <Grid
                    container
                    spacing={2}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    height={"100%"}
                >
                    <Grid item md={4}>
                        <Logo />
                    </Grid>
                    <Grid item md={4}>
                        <OverviewCard />
                    </Grid>
                </Grid>
            </AnimatedPage>
        </Box>
    );
};
