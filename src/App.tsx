import { Box } from "@mui/material";
import { useReducedMotion } from "@react-spring/web";

import { AppRouter } from "./App.routes";
import { MainNavigation } from "./components/Navigation/MainNavigation";

export const App = () => {
    useReducedMotion();
    return (

                <AppRouter />
    );
};
