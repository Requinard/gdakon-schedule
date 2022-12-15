import {
    BottomNavigation,
    BottomNavigationAction,
    Paper,
    styled,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { BugReport, HomeOutlined, Today } from "@mui/icons-material";

const MainNavigationContainer = styled(Paper)({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 3,
});
export const MainNavigation = () => {
    const location = useLocation();
    return (
        <MainNavigationContainer>
            <BottomNavigation
                showLabels
                value={location.pathname}
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "stretch",
                }}
            >
                <BottomNavigationAction label={"test"} icon={<BugReport />} />
                <BottomNavigationAction
                    label={"Home"}
                    value={"/"}
                    icon={<HomeOutlined />}
                />
                <BottomNavigationAction label={"Events"} icon={<Today />} />
            </BottomNavigation>
        </MainNavigationContainer>
    );
};
