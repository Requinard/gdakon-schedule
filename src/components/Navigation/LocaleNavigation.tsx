import { MouseEvent, useCallback, useState } from "react";
import {
    BottomNavigationAction,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTranslation } from "react-i18next";
import { match } from "ts-pattern";

export const LocaleNavigation = () => {
    const { t, i18n } = useTranslation("MainNavigation");

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const handleClick = useCallback(
        (e: MouseEvent<HTMLElement>) => {
            setAnchor(e.currentTarget);
        },
        [setAnchor]
    );
    const handleClose = useCallback(() => setAnchor(null), [setAnchor]);

    const setLanguage = useCallback(
        (locale: string) =>
            match(locale)
                .with("pl", () => {
                    i18n.changeLanguage(locale);
                })
                .otherwise(() => {
                    i18n.changeLanguage("en");
                }),
        [i18n]
    );
    return (
        <>
            <BottomNavigationAction
                label={t("language")}
                onClick={handleClick}
                icon={<TranslateIcon />}
            />
            <Menu
                anchorEl={anchor}
                open={anchor !== null}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <MenuItem disabled>
                    <ListItemIcon> </ListItemIcon>
                    <ListItemText>{t("language")}</ListItemText>
                </MenuItem>
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
            </Menu>
        </>
    );
};
