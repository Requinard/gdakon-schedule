import {
    Avatar,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useLocale } from "../../i18n";

export const LanguageSettings = () => {
    const { t } = useTranslation("Settings");
    const { locale, setLocale } = useLocale();

    return (
        <>
            <ListSubheader>{t("LanguageSettings.title")}</ListSubheader>

            <MenuItem
                selected={locale === "en"}
                onClick={() => setLocale("en")}
            >
                <ListItemIcon sx={{ pr: 2 }}>
                    <Avatar>🇬🇧</Avatar>
                </ListItemIcon>
                <ListItemText primary="English"></ListItemText>
            </MenuItem>
            <MenuItem
                selected={locale === "pl"}
                onClick={() => setLocale("pl")}
            >
                <ListItemIcon sx={{ pr: 2 }}>
                    <Avatar>🇵🇱</Avatar>
                </ListItemIcon>
                <ListItemText primary="Polski"></ListItemText>
            </MenuItem>

            <MenuItem
                selected={locale === "nl"}
                onClick={() => setLocale("nl")}
            >
                <ListItemIcon sx={{ pr: 2 }}>
                    <Avatar>🇳🇱</Avatar>
                </ListItemIcon>
                <ListItemText primary="Nederlands"></ListItemText>
            </MenuItem>
        </>
    );
};
