import { Box } from "@mui/material";

import { AppRouter } from "./App.routes";
import { MainNavigation } from "./components/Navigation/MainNavigation";

export const App = () => {
    return (
        <Box height={"100vh"} width={"100vw"} overflow={"hidden"}>
            <Box
                sx={{ paddingBottom: 8, paddingTop: 4 }}
                height={"100%"}
                overflow={"auto"}
            >
                <AppRouter />
            </Box>
            <MainNavigation />
        </Box>
    );
};
