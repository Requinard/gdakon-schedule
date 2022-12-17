import {
    BottomNavigation,
    BottomNavigationAction,
    Divider,
    Paper,
    styled,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Today from "@mui/icons-material/Today";
import { useTranslation } from "react-i18next";

import { SettingsNavigationAction } from "./SettingsNavigationAction";

const MainNavigationContainer = styled(Paper)({});
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
                    to={"/home"}
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
