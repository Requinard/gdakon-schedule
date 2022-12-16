import { Box } from "@mui/material";

import { AppRouter } from "./App.routes";
import { MainNavigation } from "./components/Navigation/MainNavigation";

export const App = () => {
    return (
        <>
            <Box sx={{ paddingBottom: 8, paddingTop: 4 }}>
                <AppRouter />
            </Box>
            <MainNavigation />
        </>
    );
};
