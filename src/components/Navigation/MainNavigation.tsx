import {
    BottomNavigation,
    BottomNavigationAction,
    Divider,
    Paper,
    styled,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Today from "~icons/ic/outline-today";
import HomeOutlined from "~icons/ic/outline-home";
import SettingsIcon from "~icons/mdi/settings";

const MainNavigationContainer = styled(Paper)({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
});
export const MainNavigation = () => {
    const location = useLocation();
    const { t } = useTranslation("Navigation");
    return (
        <MainNavigationContainer elevation={3}>
            <Divider />
            <BottomNavigation value={location.pathname} showLabels={true}>
                <BottomNavigationAction
                    label={t("MainNavigation.home")}
                    value={"/"}
                    to={"/"}
                    component={Link}
                    icon={<HomeOutlined />}
                />
                <BottomNavigationAction
                    label={t("MainNavigation.schedule")}
                    value={"/schedule"}
                    to={"/schedule"}
                    component={Link}
                    icon={<Today />}
                />
                <BottomNavigationAction
                    label={t("MainNavigation.about")}
                    value={"/about"}
                    to={"/about"}
                    component={Link}
                    icon={<SettingsIcon />}
                />
            </BottomNavigation>
        </MainNavigationContainer>
    );
};
