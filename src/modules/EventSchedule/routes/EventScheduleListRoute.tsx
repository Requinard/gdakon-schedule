import {Tab, Tabs} from "@mui/material";
import {Outlet} from "react-router-dom";

export const EventScheduleListRoute = () => {
    return <>
        <Tabs variant={'fullWidth'}>
            <Tab label={'monday'}/>
        </Tabs>
        <Outlet/>
    </>
}
