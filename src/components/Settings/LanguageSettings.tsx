import {
    ListItemIcon,
    ListItemText,
    ListSubheader,
    MenuItem,
} from "@mui/material";
import { useCallback } from "react";
import { match } from "ts-pattern";
import { useTranslation } from "react-i18next";

export const LanguageSettings = () => {
    const { t, i18n } = useTranslation("MainNavigation");
    const setLanguage = useCallback(
        (locale: string) => {
            match(locale)
                .with("pl", () => {
                    i18n.changeLanguage(locale);
                })
                .otherwise(() => {
                    i18n.changeLanguage("en");
                });
        },
        [i18n]
    );
    return (
        <>
            <ListSubheader>{t("language")}</ListSubheader>

            <MenuItem
                selected={i18n.language === "en"}
                onClick={() => setLanguage("en")}
            >
                <ListItemIcon>🇬🇧</ListItemIcon>
                <ListItemText>English</ListItemText>
            </MenuItem>
            <MenuItem
                selected={i18n.language === "pl"}
                onClick={() => setLanguage("pl")}
            >
                <ListItemIcon>🇵🇱</ListItemIcon>
                <ListItemText>Polski</ListItemText>
            </MenuItem>
        </>
    );
};
