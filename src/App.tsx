import { Box } from "@mui/material";

import { AppRouter } from "./App.routes";
import { MainNavigation } from "./components/Navigation/MainNavigation";

export const App = () => {
    return (
        <Box
            height={"100vh"}
            width={"100vw"}
            display={"flex"}
            flexDirection={"column"}
        >
            <Box
                overflow={window.location.pathname === "/" ? "hidden" : "auto"}
                flexGrow={1}
            >
                <AppRouter />
            </Box>
            <MainNavigation />
        </Box>
    );
};
