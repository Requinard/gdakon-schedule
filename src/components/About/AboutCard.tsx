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

import GitIcon from "~icons/mdi/git";

export const AboutCard = () => {
    return (
        <Card>
            <CardHeader title={"About"} />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <GitIcon />
                    </ListItemIcon>
                    <ListItemText primary={APP_NAME} secondary={APP_VERSION} />
                </ListItem>

                <LanguageSettings />
                <TimeTravelSettings />
            </List>
        </Card>
    );
};
