import { animated, useSpring } from "@react-spring/web";
import { Box, Grid, styled, useTheme } from "@mui/material";
import { useWindowSize } from "usehooks-ts";
import { useMemo } from "react";

import { BackgroundBanner } from "../images/BackgroundBanner";
import { OverviewCard } from "../EventSchedule/OverviewCard";

import { OnlineCheck } from "./OnlineCheck";
import { Logo } from "../images/Logo";

const AnimatedPage = styled(animated.div)({
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
});

export const HomeScreen = () => {
    const theme = useTheme();
    const { width, height } = useWindowSize();
    const [{ xy }, set] = useSpring(() => ({
        xy: [0, 0],
        config: { mass: 10, tension: 550, friction: 140 },
    }));

    const { calc, background, foreground } = useMemo(
        () => ({
            calc: (x: number, y: number) => [x - width / 2, y - height / 2],
            background: (x: number, y: number) =>
                `translate3d(${x / 60}px,${y / 40}px,0)`,
            foreground: (x: number, y: number) =>
                `translate3d(${x / 30}px,${y / 20}px,0)`,
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
                set.start({ xy: calc(x, y) })
            }
        >
            <AnimatedPage
                style={{
                    [theme.breakpoints.up("md")]: {
                        transform: xy.to(background),
                        scale: 1.05,
                    },
                }}
            >
                <Box height={"100%"}>
                    <BackgroundBanner />
                </Box>
            </AnimatedPage>
            <AnimatedPage style={{ transform: xy.to(foreground) }}>
                <Grid
                    container
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    sx={{
                        [theme.breakpoints.down("sm")]: {
                            flex: 0,
                        },
                        [theme.breakpoints.up("md")]: {
                            flex: 1,
                        },
                    }}
                >
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                [theme.breakpoints.down("sm")]: { pt: 8, p: 4 },
                            }}
                        >
                            <Logo />
                        </Box>

                        <OnlineCheck />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <OverviewCard />
                    </Grid>
                </Grid>
            </AnimatedPage>
        </Box>
    );
};
