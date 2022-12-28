import { Box, Stack } from "@mui/material";

import { Logo } from "../images/Logo";
import { OverviewCard } from "../EventSchedule/OverviewCard";
import { BackgroundBanner } from "../images/BackgroundBanner";

export const HomeHorizontal = () => {
    return (
        <>
            <Box
                position={"absolute"}
                top={0}
                bottom={0}
                left={0}
                right={0}
                sx={{
                    filter: "blur(6px)",
                }}
            >
                <BackgroundBanner />
            </Box>
            <Stack p={1} spacing={2} sx={{ pt: 4, position: "relative" }}>
                <Box pt={4}>
                    <Logo />
                </Box>

                <OverviewCard />
            </Stack>
        </>
    );
};
