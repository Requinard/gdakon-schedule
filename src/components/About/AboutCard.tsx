import {
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import { LanguageSettings } from "../Settings/LanguageSettings";
import { TimeTravelSettings } from "../Settings/TimeTravelSettings";
import { OnlineCheck } from "../Home/OnlineCheck";

import GitIcon from "~icons/mdi/git";

export const AboutCard = () => {
    return (
        <Card>
            <CardHeader title={"About"} />
            <OnlineCheck showIfOnline />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <GitIcon fontSize={"1.8rem"} />
                    </ListItemIcon>
                    <ListItemText primary={APP_NAME} secondary={APP_VERSION} />
                </ListItem>
                <LanguageSettings />
                <TimeTravelSettings />
            </List>
        </Card>
    );
};
