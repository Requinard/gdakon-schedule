import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {Link, useMatch} from "react-router-dom";
import TodayIcon from "~icons/ic/outline-today";
import HomeOutlinedIcon from "~icons/ic/outline-home";
import SettingsIconIcon from "~icons/mdi/settings";
import SearchIcon from "~icons/mdi/search"
export const MainNavBar = () => {
    const match = useMatch("/:part")
    return <BottomNavigation showLabels value={match?.params.part}>
        <BottomNavigationAction label={'Home'} value={'home'} component={Link} to={'home'} icon={<HomeOutlinedIcon />}/>
        <BottomNavigationAction label={'Schedule'} value={'schedule'} component={Link} to={'schedule'} icon={<TodayIcon />}/>
        <BottomNavigationAction label={'Search'} value={'search'} component={Link} to={'search'} icon={<SearchIcon />}/>
        <BottomNavigationAction label={'Settings'} value={'settings'} component={Link} to={'settings'} icon={<SettingsIconIcon />}/>
    </BottomNavigation>;
}
