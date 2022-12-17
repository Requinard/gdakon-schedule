import { Box } from "@mui/material";
import { useReducedMotion } from "@react-spring/web";

import { AppRouter } from "./App.routes";
import { MainNavigation } from "./components/Navigation/MainNavigation";

export const App = () => {
    useReducedMotion();
    return (
        <Box
            height={"100vh"}
            width={"100vw"}
            display={"flex"}
            flexDirection={"column"}
        >
            <Box
                overflow={"auto"}
                flexGrow={1}
                display={"flex"}
                marginBottom={"56px"}
                component={"main"}
            >
                <AppRouter />
            </Box>
            <MainNavigation />
        </Box>
    );
};
