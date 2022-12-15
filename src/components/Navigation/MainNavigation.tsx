import {
    BottomNavigation,
    BottomNavigationAction,
    Container,
    Paper,
    styled,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { BugReport, HomeOutlined, Today } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const MainNavigationContainer = styled(Paper)({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 3,
});
export const MainNavigation = () => {
    const location = useLocation();
    const { t } = useTranslation("MainNavigation");
    return (
        <MainNavigationContainer>
            <Container>
                <BottomNavigation showLabels value={location.pathname}>
                    <BottomNavigationAction
                        label={"test"}
                        icon={<BugReport />}
                        component={Link}
                        to={"/dev"}
                        value={"/dev"}
                    />
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
                </BottomNavigation>
            </Container>
        </MainNavigationContainer>
    );
};
