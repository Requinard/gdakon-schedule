import {MainNavBar} from "../MainNavBar";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";

export const Dashboard = () => {
    return <Box height={'100vh'} maxHeight={'100vh'}  display={'flex'} flexDirection={'column'}>
        <Box display={'flex'} flex={1} flexDirection={'column'} overflow={'auto'}>
            <Outlet/>
        </Box>
        <Divider />
        <MainNavBar/>
    </Box>
}