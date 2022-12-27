import {
    BottomNavigation,
    BottomNavigationAction,
    Divider,
    Paper,
    styled,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SettingsNavigationAction } from "./SettingsNavigationAction";

import Today from "~icons/ic/outline-today";
import HomeOutlined from "~icons/ic/outline-home";

const MainNavigationContainer = styled(Paper)({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
});
export const MainNavigation = () => {
    const location = useLocation();
    const { t } = useTranslation("MainNavigation");
    return (
        <MainNavigationContainer elevation={3}>
            <Divider />
            <BottomNavigation value={location.pathname} showLabels={true}>
                <BottomNavigationAction
                    label={t("home")}
                    value={"/"}
                    to={"/"}
                    component={Link}
                    icon={<HomeOutlined />}
                />
                <BottomNavigationAction
                    label={t("schedule")}
                    value={"/schedule"}
                    to={"/schedule"}
                    component={Link}
                    icon={<Today />}
                />
                <SettingsNavigationAction />
            </BottomNavigation>
        </MainNavigationContainer>
    );
};
