import {
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { LanguageSettings } from "../Settings/LanguageSettings";
import { TimeTravelSettings } from "../Settings/TimeTravelSettings";
import { OnlineCheck } from "../Home/OnlineCheck";

import GitIcon from "~icons/mdi/git";

export const AboutCard = () => {
    const { t } = useTranslation("About");
    return (
        <Card>
            <CardHeader title={t("AboutCard.title")} />

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
