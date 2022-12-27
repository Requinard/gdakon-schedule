import { Stack } from "@mui/material";

import { Logo } from "../images/Logo";
import { OverviewCard } from "../EventSchedule/OverviewCard";

export const HomeHorizontal = () => {
    return (
        <Stack spacing={2}>
            <Logo />

            <OverviewCard />
        </Stack>
    );
};
