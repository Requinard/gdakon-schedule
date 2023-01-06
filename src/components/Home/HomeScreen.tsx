import { useMediaQuery, useTheme } from "@mui/material";

import { HomeParallax } from "./Home.Parallax";
import { HomeHorizontal } from "./Home.Horizontal";

export const HomeScreen = () => {
    const theme = useTheme();
    const wide = useMediaQuery(theme.breakpoints.up("md"));

    if (wide) {
        return <HomeParallax />;
    }

    return <HomeHorizontal />;
};
